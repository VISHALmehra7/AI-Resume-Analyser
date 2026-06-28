import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config()

const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export default openAiClient;