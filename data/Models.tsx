const models = [
  {
    id: "x-ai/grok-4-fast:free",
    name: "Grok 4 Fast",
    description:
      "Latest Grok model optimized for speed and general purpose tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "deepseek/deepseek-chat-v3.1:free",
    name: "DeepSeek V3",
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
    id: "openrouter/sonoma-sky-alpha",
    name: "Sonoma Sky Alpha",
    description:
      "Sonoma Sky model, optimized for creativity and complex instructions",
    endpoint: "/api/open-router",
  },
  {
    id: "openrouter/sonoma-dusk-alpha",
    name: "Sonoma Dusk Alpha",
    description:
      "Sonoma Dusk model, balanced for general-purpose tasks with efficiency",
    endpoint: "/api/open-router",
  },
  // {
  //   id: "openai/gpt-oss-120b:free",
  //   name: "GPT-OSS 120B",
  //   description:
  //     "120B parameter open-weight model from OpenAI, high-capacity for complex language and code tasks",
  //   endpoint: "/api/open-router",
  // },
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
    id: "meta-llama/llama-4-scout:free",
    name: "Llama 4 Scout",
    description:
      "Latest Llama 4 model from Meta, fine-tuned for dialogue and interactive tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "meta-llama/llama-4-maverick:free",
    name: "Llama 4 Maverick",
    description:
      "High-performance Llama 4 variant, balanced for reasoning and language skills",
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
    name: "Qwen 3",
    description:
      "14B parameter model from Qwen, balanced for language understanding and generation",
    endpoint: "/api/open-router",
  },
  {
    id: "mistralai/mistral-nemo:free",
    name: "Mistral Nemo",
    description:
      "Specialized Mistral variant fine-tuned for dialogue and interactive tasks",
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
    id: "mistral-small-latest",
    name: "Mistral Small",
    description:
      "Latest Mistral model optimized for chat, reasoning, and coding tasks",
    endpoint: "/api/mistral",
  },
  {
    id: "mistral-medium-latest",
    name: "Mistral Medium",
    description:
      "High-performance model with balanced reasoning and language skills",
    endpoint: "/api/mistral",
  },
  {
    id: "mistral-large-latest",
    name: "Mistral Large",
    description: "Top-tier reasoning, multilingual, and coding capabilities",
    endpoint: "/api/mistral",
  },
  {
    id: "open-mistral-nemo",
    name: "Mistral Nemo",
    description:
      "Specialized Mistral variant fine-tuned for dialogue and interactive tasks",
    endpoint: "/api/mistral",
  },
  {
    id: "pixtral-12b-2409",
    name: "Pixtral 12B",
    description:
      "Pixtral 12B model, optimized for various language tasks with efficiency",
    endpoint: "/api/mistral",
  },
];

export default models;
