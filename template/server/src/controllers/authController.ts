import { Request, response, Response } from "express";
import User from "../db/models/user";
import generateToken from "../utils/genetateToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response) => {
  let token;
  try {
    token = req.cookies.token;
    console.log("token", token);
    const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("decode", decode);
    const response = await User.getUserById(decode.id);
    if (response.rowCount > 0) {
      return res.status(200).json({
        message: "User verified",
        data: response.data,
        rowCount: response.rowCount,
      });
    } else {
      return res.status(401).json({ message: "Unauthorize" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please provide email and password");
  }
  try {
    const response = await User.getUserByEmail(email);

    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }

    const comparePassword = await bcrypt.compare(
      password,
      response.data[0].password
    );

    if (!comparePassword) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(response.data[0].user_id);

    const filterResponse = {
      message: "User signed in successfully",
      data: {
        id: response.data[0].user_id,
        email: response.data[0].email,
        username: response.data[0].username,
        imageUrl: response.data[0].imageUrl,
        role: response.data[0].role,
      },
      rowCount: response.rowCount,
    };
    res.cookie("token", token);
    return res.status(200).json(filterResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const signUpUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please provide email, username and password");
  }
  try {
    const response = await User.getUserByEmail(email);
    if (response.rowCount > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split("@")[0];
    const createUserRes = await User.createUser(
      email,
      username,
      hashedPassword
    );
    const token = generateToken(createUserRes.data[0].user_id);
    res.cookie("token", token);
    return res.status(201).json(createUserRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({ message: "User logged out" });
};

import { CustomRequest } from "../middlewares/authMiddleware";

export const getUserProfile = async (req: CustomRequest, res: Response) => {
  try {
    const response = await User.getUserById(req.user.id);

    if (response.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
