import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../db/models/user";
dotenv.config();

export interface CustomRequest extends Request {
  user?: any;
}

export const protectedRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  try {
    token = req.cookies.token;
    console.log("token", token);
    const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findByPk(decode.id);
    if (user) {
      req.user = user;
      res.status(200).json({ message: "Authorized" });
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }

  next();
};
