import mongoose from "mongoose";

const resumeModel = await mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rawText: {
      type: String,
    },
    secureUrl:{
      type:String
    }
  },
  { timestamps: true },
);

export const Resume = await mongoose.model("resume", resumeModel);
