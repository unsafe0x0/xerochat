import { OpenAI } from "openai";
import { buildSystemPrompt } from "@/utils/systemPrompt";

export async function POST(req: Request) {
  try {
    const { messages, model, accessToken, customInstructions } =
      await req.json();
    if (!accessToken)
      return new Response("API key is required", { status: 400 });

    const finalMessages = [buildSystemPrompt(customInstructions), ...messages];

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: accessToken,
    });

    const stream = await client.chat.completions.create({
      model: model || "openai/gpt-oss-20b:free",
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
          const msg =
            err?.message ||
            (typeof err === "string" ? err : "Unknown upstream error");
          controller.enqueue(
            encoder.encode(`Error from upstream provider: ${msg}`),
          );
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
    const msg =
      err?.message || (typeof err === "string" ? err : "Unknown error");
    const status =
      msg.toLowerCase().includes("api key") ||
      msg.toLowerCase().includes("authorization")
        ? 401
        : 502;
    return new Response(`Error: ${msg}`, { status });
  }
}
