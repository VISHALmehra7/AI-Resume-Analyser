import express from 'express'
import { uploadStorage } from '../multer/multer.js'
import { extractSkillsFromDescription, uploadResume } from '../controllers/resumeController.js'
import { verifyUser } from '../middlewares/verifyUser.js'
import { createChunk } from '../utils/createChunk.js'

const router = express.Router()

router.post("/upload",verifyUser,uploadStorage.single("resume"),uploadResume)
router.post("/extract-skills",verifyUser,extractSkillsFromDescription)
router.post("/create-chunk",createChunk)


export default router