import { Request, response, Response } from "express";
import User from "../db/models/user";
import generateToken from "../utils/genetateToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const { id } = decode;
    const response = await User.getUserById(id);
    const user = response.data[0];
    const filterUser = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageurl,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    if (response.rowCount > 0) {
      return res.status(200).json({
        message: "User verified",
        data: filterUser,
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
  console.log(email, password);

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
    const user = response.data[0];
    const filterUser = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageurl,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    const filterResponse = {
      message: "User signed in successfully",
      data: filterUser,
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
    const user = createUserRes.data[0];
    const filterUser = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageurl,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    if (createUserRes.rowCount === 0) {
      return res.status(400).json({ message: "User not created" });
    }
    const data = {
      message: "User created successfully",
      data: filterUser,
      rowCount: createUserRes.rowCount,
    };
    const token = generateToken(createUserRes.data[0].user_id);
    res.cookie("token", token);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  console.log("signout");
  res.clearCookie("token").status(200).json({ message: "User logged out" });
};
