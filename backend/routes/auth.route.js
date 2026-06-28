import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/authController.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/check-auth", verifyUser, checkAuth);
export default router;
