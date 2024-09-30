import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../db/models/user";
dotenv.config();

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  try {
    token = req.cookies.token;
    console.log("token", token);
    const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const response = await User.getUserById(decode.id);
    if (response.rowCount === 0) {
      return res.status(401).json({ message: "Unauthorize" });
    }
    res.status(200).json({ response });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
  next();
};
