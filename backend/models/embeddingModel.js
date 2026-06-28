import mongoose from "mongoose";

const embeddingSchema = await mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
  },
  chunkText: {
    type: String,
  },
  vector: {
    type: [Number],
  },
});

export const Embedding = await mongoose.model("embedding", embeddingSchema);
