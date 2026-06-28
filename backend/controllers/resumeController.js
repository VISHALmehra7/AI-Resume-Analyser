import { User } from "../models/userModel.js";
import { parsePdf } from "../utils/parsePdf.js";
import { Resume } from "../models/resumeModel.js";
import { Job } from "../models/jobModel.js";
import { createChunk } from "../utils/createChunk.js";
import cloudinary from "../utils/cloudinaryConfig.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "File not found" });
    if (req.file.mimetype !== "application/pdf")
      return res
        .status(400)
        .json({ success: false, message: "Only pdf file allowed" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "resumes",
    });

    // console.log(result.secure_url);

    console.log(req.file);
    const parsedData = await parsePdf();
    let formattedData = null;
    if (parsedData) {
      formattedData = parsedData.trim();
    }
    const user = await User.findById(req.userId);
    const resume = await Resume.findOne({ user: req.userId });
    if (resume !== null) {
      resume.rawText = formattedData
      resume.secureUrl = result.secure_url

      const updatedResume = resume
      await resume.save();
      createChunk(resume._id);
      return res
        .status(200)
        .json({ success: true, resumeData: updatedResume ,message:"Resume Uploaded"});
    }
    const newResume = await new Resume({
      user: req.userId,
      rawText: formattedData,
      secureUrl:result.secure_url
    });
    await newResume.save();
    createChunk(newResume._id);
    res.status(201).json({
      success: true,
      resumeData: newResume,
      message: "Resume Uploaded",
    });
  } catch (error) {
    console.log("Error in uploadResume controller :", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const extractSkillsFromDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || description.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }

    const SKILLS_DATA = [
      "javascript",
      "typescript",
      "react",
      "redux",
      "next.js",
      "node.js",
      "express",
      "mongodb",
      "mysql",
      "postgresql",
      "java",
      "spring boot",
      "python",
      "django",
      "flask",
      "c++",
      "html",
      "css",
      "tailwind",
      "bootstrap",
      "git",
      "github",
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "rest api",
      "graphql",
      "machine learning",
      "deep learning",
      "data analysis",
      "pandas",
      "numpy",
      "tensorflow",
      "scikit-learn",
      "sql",
      "nosql",
      "linux",
      "bash",
      "system design",
      "microservices",
      "testing",
      "jest",
      "cypress",
    ];

    const NORMALIZATION_MAP = {
      "react js": "react",
      reactjs: "react",
      "react-js": "react",

      "node js": "node.js",
      nodejs: "node.js",
      "node-js": "node.js",

      "mongo db": "mongodb",
      "mongo-db": "mongodb",

      "express js": "express",
      expressjs: "express",

      "rest apis": "rest api",
      "rest-api": "rest api",
      restapis: "rest api",

      "graph ql": "graphql",
      "graph-ql": "graphql",

      "aws cloud": "aws",
      "aws-cloud": "aws",

      "machine-learning": "machine learning",

      "data-analysis": "data analysis",

      "micro-services": "microservices",
      "micro services": "microservices",
      "system-design": "system design",
    };

    function formatingDescripting(description) {
      description = description.toLowerCase();
      const variants = Object.keys(NORMALIZATION_MAP);
      variants.forEach((singleVariant) => {
        if (description.includes(singleVariant)) {
          description = description.replace(
            singleVariant,
            NORMALIZATION_MAP[singleVariant],
          );
        }
      });
      const data = extractSkill(description);
      return data;
    }

    function extractSkill(description) {
      const extractedSkill = [];
      SKILLS_DATA.forEach((skill) => {
        if (description.includes(skill)) extractedSkill.push(skill);
      });
      return extractedSkill;
    }
    const result = formatingDescripting(description);

    const userId = req.userId ? req.userId : null;

    const newJob = await new Job({
      user: userId,
      description: description,
      skills: result ? result : [],
    });
    await newJob.save();

    res.status(200).json({ success: true, data: { ...newJob._doc } });
  } catch (error) {
    console.log("Error in extractSkillsFromDescription controller : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
