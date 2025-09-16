export type ProviderKeys = {
  openRouter?: string;
  gemini?: string;
  mistral?: string;
};

export async function callModelEndpoint(options: {
  endpoint: string;
  messages: any[];
  modelId: string;
  keys: ProviderKeys;
  customInstructions?: string;
  signal?: AbortSignal;
}) {
  const { endpoint, messages, modelId, keys, customInstructions, signal } =
    options;

  let accessToken = keys.openRouter || "";
  if (endpoint.includes("/gemini")) accessToken = keys.gemini || accessToken;
  if (endpoint.includes("/mistral")) accessToken = keys.mistral || accessToken;

  const body = {
    messages,
    model: modelId,
    accessToken,
    customInstructions,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  return res;
}
