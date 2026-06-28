import { useOpenAi } from "./openAiCaller.js";

export async function ragPrompt(content, question) {
 
  try {
    const prompt = `
You are an expert resume analyst and career assistant.

Answer the user's question naturally and professionally using ONLY the provided resume context.

RULES:
- Do NOT copy raw resume text
- Do NOT use bullet points unless explicitly asked
- Summarize skills naturally like a recruiter would
- Keep the response concise and polished
- Mention only the most relevant information
- Respond in 3-5 professional sentences
- If information is missing, say: "The resume does not contain enough information."

Resume Context:
${content}

User Question:
${question}
`;

    const aiText = await useOpenAi(prompt);
    return aiText;
  } catch (error) {
    console.log("Error", error);
  }
}
