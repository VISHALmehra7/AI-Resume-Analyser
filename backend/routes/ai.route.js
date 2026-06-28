import express from "express";

import { verifyUser } from "../middlewares/verifyUser.js";
import { askQuestion } from "../controllers/ragController.js";

const router = express.Router();

router.post("/ask-question",verifyUser,askQuestion);

export default router;
