import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./db/models";

dotenv.config();

const app: Express = express();

const { PORT } = process.env;

app.use(express.json());

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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
