import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./db/models";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();

const { PORT } = process.env;

app.use(express.json());

app.use(cookieParser());

sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
import authRoutes from "./routes/authRoutes";
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
