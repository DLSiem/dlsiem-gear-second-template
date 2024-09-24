import { Request, Response } from "express";
import User from "../db/models/user";
import generateToken from "../utils/genetateToken";
import bcrypt from "bcrypt";

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).send("Please provide email and password");
  }
  try {
    const findUser = await User.findOne({ where: { email } });
    console.log("Tesgasg", findUser?.imageUrl);
    if (findUser) {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      const token = generateToken(findUser.id);
      res.cookie("token", token);
      return res.status(200).json({ message: "User Login Successsfully" });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
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
      return res.status(400).send("User already exist");
    }
    const user = await User.create({ email, password });
    console.log("user", user);
    const token = generateToken(user.dataValues.id);
    res.cookie("token", token);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  // Clear cookie
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
