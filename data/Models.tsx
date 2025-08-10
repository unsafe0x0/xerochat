const models = [
  {
    id: "openai/gpt-oss-20b",
    name: "GPT-OSS 20B",
    description:
      "OpenAI’s open-weight model with 20 billion parameters, optimized for performance",
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    description:
      "OpenAI’s powerful open-weight model with 120 billion parameters, ideal for complex tasks",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "High-quality reasoning model for complex tasks from Gemini",
  },
  {
    id: "gemini-2.5-flash", 
    name: "Gemini 2.5 Flash",
    description:
      "Fast, cost-efficient Gemini model for quick responses",
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout",
    description:
      "Meta’s high-performance instruction-following model with 131K context",
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Distill",
    description:
      "Open coding model tuned for completion, reasoning, and synthesis",
  },
];

export default models;
