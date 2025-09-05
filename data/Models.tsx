const models = [
  {
    id: "deepseek/deepseek-chat-v3.1:free",
    name: "DeepSeek Chat v3.1",
    description:
      "Latest DeepSeek model optimized for dialogue, reasoning, and coding tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek R1",
    description:
      "DeepSeek reasoning model, strong in code generation and structured problem solving",
    endpoint: "/api/open-router",
  },
  {
    id: "openai/gpt-oss-120b:free",
    name: "GPT-OSS 120B",
    description:
      "120B parameter open-weight model from OpenAI, high-capacity for complex language and code tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT-OSS 20B",
    description:
      "20B parameter open-weight model from OpenAI, general-purpose language and code tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Uncensored Model",
    description:
      "24B parameter model from Cognitive Computations, optimized for dialogue and creative tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM-4.5 Air",
    description:
      "Lightweight model from Z-AI, tuned for low-latency inference and chat",
    endpoint: "/api/open-router",
  },
  {
    id: "qwen/qwen3-14b:free",
    name: "Qwen 3 14B",
    description:
      "14B parameter model from Qwen, balanced for language understanding and generation",
    endpoint: "/api/open-router",
  },
  {
    id: "microsoft/mai-ds-r1:free",
    name: "MAI-DS R1",
    description:
      "Microsoft model for dialogue, summarization, and code completion",
    endpoint: "/api/open-router",
  },
  // {
  //   id: "google/gemini-2.5-flash-image-preview:free",
  //   name: "Gemini 2.5 Flash Image Preview",
  //   description: "Gemini 2.5 variant optimized for image preview tasks",
  //   endpoint: "/api/open-router",
  // },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "Google flagship model with advanced reasoning, multimodal support, and coding capability",
    endpoint: "/api/gemini",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description:
      "High-throughput Gemini variant optimized for efficiency and general tasks",
    endpoint: "/api/gemini",
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash-Lite",
    description:
      "Lowest-latency Gemini model, cost-efficient for large-scale usage",
    endpoint: "/api/gemini",
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT-OSS 20B",
    description:
      "20B parameter open-weight model on Groq Cloud, general-purpose for language and code",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    description:
      "120B parameter open-weight model on Groq Cloud, high-capacity for complex tasks",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama-3.3 70B Versatile",
    description:
      "70B parameter Llama model on Groq Cloud, general-purpose with high throughput",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1",
    description:
      "Groq Cloud preview – DeepSeek R1 distilled on Llama-70B for reasoning tasks",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "qwen/qwen3-32b",
    name: "Qwen-3 32B",
    description:
      "32B parameter Qwen model on Groq Cloud (preview), strong at generation and analysis",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "compound-beta",
    name: "Compound Beta",
    description:
      "Groq Cloud – compound model (beta) blending multiple architectures, high performance across tasks",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "meta-llama/llama-4-maverick-17b-128e-instruct",
    name: "Llama 4 Maverick",
    description:
      "Groq Cloud – Llama 4 Maverick 17B Instruct, tuned for reasoning and code with extended context",
    endpoint: "/api/groq-cloud",
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout",
    description:
      "Groq Cloud – Llama 4 Scout 17B Instruct, optimized for efficiency and long-context applications",
    endpoint: "/api/groq-cloud",
  },
];

export default models;
