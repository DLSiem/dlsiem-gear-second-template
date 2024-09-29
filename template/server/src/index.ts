import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import pool from "./config/config";

dotenv.config();

const app: Express = express();

const { PORT } = process.env;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // enable set cookie
  })
);

app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
});

import User from "./db/models/user";
// User.updateUserTable();

// routes
import authRoutes from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
app.use("/auth", authRoutes);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
