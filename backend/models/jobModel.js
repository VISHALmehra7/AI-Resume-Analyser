import mongoose from "mongoose";


const jobSchema = await mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    skills: [String],
  },
  { timestamps: true },
);

export const Job = await mongoose.model("job", jobSchema);
