import { Job } from "../models/jobModel.js";
import { Resume } from "../models/resumeModel.js";
import {
  commonSkills,
  matchScore,
  missingSkills,
} from "../utils/resumeAnalytics.js";

export const analyticsController = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.userId });
    if (!resume)
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    const rawText = resume?.rawText || "";
    const job = await Job.findOne({ user: req.userId }).sort({ createdAt: -1 });
    if (!job)
      return res
        .status(404)
        .json({ success: false, message: "No job description found found" });
    const jobSkills = job?.skills || [];
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

    function formatingDescripting(rawText) {
      rawText = rawText.toLowerCase();
      const variants = Object.keys(NORMALIZATION_MAP);
      variants.forEach((singleVariant) => {
        if (rawText.includes(singleVariant)) {
          rawText = rawText.replace(
            singleVariant,
            NORMALIZATION_MAP[singleVariant],
          );
        }
      });
      const data = extractSkill(rawText);
      return data;
    }

    function extractSkill(rawText) {
      const extractedSkill = [];
      SKILLS_DATA.forEach((skill) => {
        if (rawText.includes(skill)) extractedSkill.push(skill);
      });
      return extractedSkill;
    }
    const resumeSkills = formatingDescripting(rawText) || [];
    const missingSkill = missingSkills(jobSkills, resumeSkills);
    const commonSkill = commonSkills(jobSkills, resumeSkills);
    const scores = matchScore(jobSkills, resumeSkills);
    console.log(resumeSkills,missingSkill,commonSkill)
    res.status(200).json({
      success: true,
      missingSkills: missingSkill,
      resumeSkill: resumeSkills,
      strongSkills: commonSkill,
      score: scores,
    }); 
  } catch (error) {
    console.log("Error in analyticsController : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
