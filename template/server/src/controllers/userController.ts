import { Request, Response } from "express";
import User from "../db/models/user";

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// get all users

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    await User.destroy({ where: { id } });
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
