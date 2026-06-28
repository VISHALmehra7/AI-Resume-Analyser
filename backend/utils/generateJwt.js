import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const generateJwt = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log("Error in generateJwt function : ", error);
  }
};
