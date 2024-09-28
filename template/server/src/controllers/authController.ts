import { Request, Response } from "express";
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
    const user = await User.findByPk(decode.id);
    if (user) {
      const filerUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
        role: user.role,
      };
      res.status(200).json({ message: "Authorized", user: filerUser });
    } else {
      return res.status(401).json({ message: "User not found" });
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
    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(findUser.id);

      res.cookie("token", token);
      const filerUser = {
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        imageUrl: findUser.imageUrl,
        role: findUser.role,
      };
      return res
        .status(200)
        .json({ message: "User Login Successsfully", user: filerUser });
    } else {
      res.status(401).append("errorMassage", "Invalid credentials").send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};
export const signUpUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please provide email, username and password");
  }
  try {
    const findOne = await User.findOne({ where: { email } });
    if (findOne) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password });
    const token = generateToken(user.dataValues.id);
    res.cookie("token", token);
    const filerUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      imageUrl: user.imageUrl,
      role: user.role,
    };
    return res
      .status(201)
      .json({ message: "User created successfully", user: filerUser });
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
    const user = await User.findByPk(req.user?.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
