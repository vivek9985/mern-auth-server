import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized, missing token!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await userModel.findOne({ _id: decoded?.id });
    const isAdmin = admin?.role === "admin";
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Only Admin can do it!",
      });
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

export default isAdmin;
