import express from 'express'
import { analyticsController } from '../controllers/analyticsController.js'
import { verifyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

router.post("/resume-analytics",verifyUser,analyticsController)
export default router