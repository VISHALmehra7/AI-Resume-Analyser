import { Embedding } from "../models/embeddingModel.js";
import { Resume } from "../models/resumeModel.js";
import { User } from "../models/userModel.js";
import { createEmbeddings } from "../openAi/openAiCreateEmbeddings.js";
import { ragPrompt } from "../openAi/ragPrompt.js";
import { findBestMatch } from "../utils/findBestMatch.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "No Quesion Asked" });
    }
    
    const userResume  = await Resume.findOne({user:req.userId})
    const chunkList = await Embedding.find({resumeId:userResume._id});
    const questionEmbedding = await createEmbeddings(question);
    const result = await findBestMatch(chunkList, questionEmbedding);
    const answer = await ragPrompt(result.bestMatch.chunkText, question);

    res.status(200).json({ success: true, answer: answer });
  } catch (error) {
    console.log("Error in askQuestion controller : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
