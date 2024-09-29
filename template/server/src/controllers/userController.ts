import { Request, Response } from "express";
import User from "../db/models/user";
import bcrypt from "bcrypt";

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const response = await User.getUserById(userId);
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// get all users

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const response = await User.deleteUserById(userId);
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// update user by id
export const updateUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { username, imageUrl, role } = req.body;
  try {
    const response = await User.updateUserById(
      userId,
      username,
      imageUrl,
      role
    );
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// create user
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split("@")[0];
    const response = await User.createUser(email, username, hashedPassword);
    if (response.rowCount === 0) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
