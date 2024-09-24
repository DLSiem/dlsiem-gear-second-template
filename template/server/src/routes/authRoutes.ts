import express from "express";
import {
  signInUser,
  signUpUser,
  getUserProfile,
  signOutUser,
} from "../controllers/authController";

import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signin", signInUser);

router.post("/signup", signUpUser);

router.get("/protected", protectedRoute, getUserProfile);

router.get("/logout", signOutUser);

export default router;
