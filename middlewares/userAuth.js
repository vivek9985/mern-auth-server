import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized, missing token!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, invalid token!",
      });
    }
    const matchedUserWithId = await userModel.findById(decoded.id);
    if (!matchedUserWithId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, invalid token!",
      });
    }
    if (decoded) {
      console.log("Authorized!");
    }
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;
