import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDb } from "./database/connectToDb.js";
import authRoutes from "./routes/auth.route.js";
import resumeRoutes from "./routes/resume.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import aiRoutes from "./routes/ai.route.js";
import cors from "cors";
import path from 'path'

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin: ["http://localhost:5173","https://ai-resume-analyser-l0cm.onrender.com"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve()

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,"/frontend/dist")))
   app.get(/(.*)/,(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
  connectToDb();
});
