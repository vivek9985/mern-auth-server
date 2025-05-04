import express from "express";
import {
  deletSingleUser,
  getAllUser,
  getSingleUser,
  loginUser,
  logoutUser,
  registerUser,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
userRouter.post("/verify-email", userAuth, verifyEmail);
// -
// -
// -
// -
userRouter.get("/all", userAuth, getAllUser);
userRouter.get("/:id", userAuth, getSingleUser);
userRouter.delete("/:id", userAuth, deletSingleUser);
