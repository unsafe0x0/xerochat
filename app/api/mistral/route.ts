import { OpenAI } from "openai";
import { buildSystemPrompt } from "@/utils/systemPrompt";

// Sanitize error messages to prevent leaking upstream details
function sanitizeError(err: any): { message: string; status: number } {
  const raw =
    err?.message || (typeof err === "string" ? err : "Unknown error");
  const lower = raw.toLowerCase();

  if (lower.includes("api key") || lower.includes("authorization") || lower.includes("authentication")) {
    return { message: "Invalid or missing API key.", status: 401 };
  }
  if (lower.includes("rate limit") || lower.includes("quota")) {
    return { message: "Rate limit exceeded. Please try again later.", status: 429 };
  }
  if (lower.includes("model") && lower.includes("not found")) {
    return { message: "The selected model is not available.", status: 404 };
  }

  return { message: "An error occurred while processing your request.", status: 502 };
}

export async function POST(req: Request) {
  try {
    const { messages, model, accessToken, customInstructions } =
      await req.json();
    if (!accessToken)
      return new Response("API key is required", { status: 400 });

    const finalMessages = [buildSystemPrompt(customInstructions), ...messages];

    const client = new OpenAI({
      baseURL: "https://api.mistral.ai/v1",
      apiKey: accessToken,
    });

    const stream = await client.chat.completions.create({
      model: model || "mistral-small-latest",
      messages: finalMessages,
      stream: true,
      max_tokens: 4096,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content || "";
            if (content) controller.enqueue(encoder.encode(content));
          }
        } catch (err: any) {
          const { message } = sanitizeError(err);
          controller.enqueue(encoder.encode(`Error: ${message}`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    const { message, status } = sanitizeError(err);
    return new Response(`Error: ${message}`, { status });
  }
}
