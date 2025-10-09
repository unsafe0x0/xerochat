const models = [
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT-OSS 20B",
    description:
      "20B parameter open-weight model for general-purpose language and code tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Uncensored Model",
    description:
      "24B parameter model optimized for dialogue and creative tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "meta-llama/llama-4-scout:free",
    name: "Llama 4 Scout",
    description:
      "Meta Llama 4 model fine-tuned for dialogue and interactive tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "meta-llama/llama-4-maverick:free",
    name: "Llama 4 Maverick",
    description:
      "High-performance Llama 4 variant, balanced for reasoning and language",
    endpoint: "/api/open-router",
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM-4.5 Air",
    description: "Lightweight model tuned for low-latency chat and inference",
    endpoint: "/api/open-router",
  },
  {
    id: "qwen/qwen3-14b:free",
    name: "Qwen 3",
    description:
      "14B parameter model balanced for language understanding and generation",
    endpoint: "/api/open-router",
  },
  {
    id: "mistralai/mistral-nemo:free",
    name: "Mistral Nemo",
    description:
      "Specialized Mistral variant fine-tuned for dialogue and interactive tasks",
    endpoint: "/api/open-router",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "Flagship Google model with advanced reasoning, multimodal support, and coding capabilities",
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
      "Compact Mistral model optimized for chat, reasoning, and coding tasks",
    endpoint: "/api/mistral",
  },
  {
    id: "mistral-medium-latest",
    name: "Mistral Medium",
    description:
      "High-performance Mistral model with balanced reasoning and language skills",
    endpoint: "/api/mistral",
  },
  {
    id: "mistral-large-latest",
    name: "Mistral Large",
    description:
      "Top-tier Mistral model with reasoning, multilingual, and coding capabilities",
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
      "12B parameter Pixtral model optimized for efficient language tasks",
    endpoint: "/api/mistral",
  },
];

export default models;
