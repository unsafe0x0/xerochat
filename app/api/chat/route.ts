import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { messages, model, accessToken } = await req.json();

    if (!accessToken) {
      return new Response("API key is required", { status: 400 });
    }

    const client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: accessToken,
    });

    const systemPrompt = {
      role: "system",
      content:
        "You are XeroChat, an AI assistant that helps developers solve coding problems. Respond concisely, technically accurate, and straight to the point. Use Markdown for code, include only the necessary explanation, and ask clarifying questions when needed. Avoid speculation, hallucination, or off‑topic discussion. Do not mention or promote XeroChat itself.",
    };

    const finalMessages = [systemPrompt, ...messages];

    const stream = await client.chat.completions.create({
      model: model || "meta-llama/llama-4-scout-17b-16e-instruct",
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
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          console.error("Streaming error:", error);
          controller.enqueue(
            encoder.encode(
              "Sorry, an error occurred while processing your request.",
            ),
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
  } catch (error) {
    console.error("API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
