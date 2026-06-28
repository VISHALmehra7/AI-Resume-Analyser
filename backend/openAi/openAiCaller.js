import openAiClient from "./openAIConfig.js";

export async function useOpenAi(prompt) {
  const response = await openAiClient.responses.create({
    model: "gpt-5-nano",
    input: prompt,
  });
  return response.output_text.trim();
}
