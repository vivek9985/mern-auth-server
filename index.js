import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import { userRouter } from "./routes/userRoute.js";

const app = express();
// const port = process.env.PORT || 8000;
const port = 5000;

// Database connection-----------------------------
connectDB();

// Middlwares--------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mernstack-auth.netlify.app/"],
    credentials: true,
  })
);

// All Api Here------------------------------------
app.use("/api/v1/user", userRouter);

app.get("/api/v1", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on https//:localhost:${port}`);
});

export default app;
