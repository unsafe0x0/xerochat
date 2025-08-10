import { OpenAI } from "openai";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { messages, model, accessToken } = await req.json();
    if (!accessToken) return new Response("API key is required", { status: 400 });

    const systemPrompt = {
      role: "system",
      content:
        `You are XeroChat, a developer-focused AI assistant.
          - Always introduce yourself as "XeroChat" if the user asks who you are.
          - Respond concisely, with technically accurate and direct answers.
          - Use Markdown for code blocks.
          - Provide only the necessary explanation, no filler.
          - Ask clarifying questions if needed.
          - Avoid speculation, hallucination, or unrelated topics.
          - Do not describe your capabilities unless directly asked.`,
    };

    const finalMessages = [systemPrompt, ...messages];

    if (model && model.toLowerCase().includes("gemini")) {
      const gemini = createGoogleGenerativeAI({ apiKey: accessToken });
      const result = await streamText({
        model: gemini(model || "gemini-1.5-flash-latest"),
        messages: finalMessages,
      });
      return result.toTextStreamResponse();
    }

    const client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: accessToken,
    });

    const stream = await client.chat.completions.create({
      model: model || "openai/gpt-oss-20b",
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
        } catch {
          controller.enqueue(encoder.encode("Sorry, an error occurred while processing your request."));
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
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
