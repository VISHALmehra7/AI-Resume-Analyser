import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Token not found" });
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      return res.status(400).json({ success: false, message: "Invalid token" });
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log("Error in verify user function : ", error);
    res.status(500).json({success:false,message:"Internal server error"})
  }
};
