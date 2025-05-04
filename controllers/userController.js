import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailer from "../utils/sendMailer.js";
import {
  verificationOtpTamplete,
  welcomeTamplete,
} from "../tampletes/tamplete.js";
import checkEmailExistence from "../utils/emailChecker.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required!" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required!" });
    }
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address!",
      });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required!" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long!",
      });
    }

    // Email existance checking
    const exists = await checkEmailExistence(email);

    if (!exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist!" });
    }

    const isUserExists = await userModel.findOne({ email: req.body.email });
    if (isUserExists) {
      return res.send({
        success: false,
        message: "User already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = new userModel({ name, email, password: hashedPassword });
    await result.save();

    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Email send----------------
    sendMailer({
      email: email,
      subject: "Welcome to Menzo 👻",
      html: welcomeTamplete(name, email),
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
    y;
  } catch (error) {
    // console.log("Register error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Invalid email!",
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.send({
        success: false,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User is successfully logged in!",
      data: { _id: user._id, name: user.name, email: user.email },
    });
    y;
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User is successfully logged out!",
    });
    y;
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Otp send via email
    sendMailer({
      email: user?.email,
      subject: "Verification OTP",
      html: verificationOtpTamplete(user?.name, otp),
    });

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent to email.",
    });
  } catch (error) {
    console.error("OTP error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP!",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP Expired!",
      });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    const savedUser = await user.save();

    if (savedUser) {
      sendMailer({
        email: user?.email,
        subject: "💫 Verification Successful!",
        text: "Your account has verified now!",
      });
    }
    return res.json({
      success: true,
      message: "Email veified successfully!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// -
// -
// -
// -

export const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel
      .find({}, { __v: 0, password: 0 })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Get all users data successfully!",
      length: allUser.length,
      data: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userExists = await userModel.findById({ _id: req.params.id });
    if (!userExists) {
      return res.status(500).json({
        success: false,
        message: `User not found with this id:${req.params.id}`,
      });
    }
    const singleUser = await userModel.findOne(
      { _id: req.params.id },
      { __v: 0, password: 0 }
    );
    return res.status(200).json({
      success: true,
      message: "Get single user data successfully!",
      data: singleUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletSingleUser = async (req, res) => {
  try {
    const userExists = await userModel.findById({ _id: req.params.id });
    if (!userExists) {
      return res.status(500).json({
        success: false,
        message: `User not found with this id:${req.params.id}`,
      });
    }

    await userModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      message: "Delete user successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
