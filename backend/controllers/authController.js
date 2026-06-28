import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateJwt } from "../utils/generateJwt.js";

export const signup = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    const success = checkUserInputs(name, email, password);
    if (!success)
      return res.status(401).json({ success: false, message: "Invalid Input" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ success: false, message: "Password must be of 6 characters" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({ name, email, password: hashedPassword });
    await newUser.save();
    generateJwt(newUser._id, res);
    res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: undefined } });
  } catch (error) {
    console.log("Error in signup controller  : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are necessary" });
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    generateJwt(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login successfull",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login controller : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in checkAuth controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

function checkUserInputs(name, email, password) {
  if (!name || !email || !password) return false;

  return true;
}
