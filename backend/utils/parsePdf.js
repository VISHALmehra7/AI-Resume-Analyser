import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import fs from "fs/promises";

export const parsePdf = async () => {
  try {
    const fileBuffer = await fs.readFile("backend/uploads/fixed_filename.pdf");
    const { text } = await pdf(fileBuffer);
    return text;
  } catch (error) {
    console.log("Error in parse pdf function : ", error);
  }
};
