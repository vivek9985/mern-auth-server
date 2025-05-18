import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import { userRouter } from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 8000;

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

app.get("/", (req, res) => {
  res.send("Mern server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
