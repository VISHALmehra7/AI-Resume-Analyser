import { Embedding } from "../models/embeddingModel.js";
import { Resume } from "../models/resumeModel.js";
import { createEmbeddings } from "../openAi/openAiCreateEmbeddings.js";

export const createChunk = async (resumeId) => {
  try {
    const resume = await Resume.findById(resumeId);
    
    const chunks = [];

    const splitText = resume.rawText?.split(" ");
    for (let i = 0; i < splitText.length; i += 120) {
      const chunk = splitText.slice(i, i + 120).join(" ");
      chunks.push(chunk);
    }

    const existingEmbedding = await Embedding.deleteMany({
      resumeId: resumeId,
    });

    let newEmbedding = null;
    for (let chunk of chunks) {
     const chunkEmbedding =  await createEmbeddings(chunk)
      newEmbedding = await new Embedding({
        resumeId: resume._id,
        chunkText: chunk,
        vector:chunkEmbedding
      });
      await newEmbedding.save();
    }
  } catch (error) {
    console.log("Error in createChunk function : ", error);
  }
};
