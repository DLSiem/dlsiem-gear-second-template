import express from "express";
import {
  signInUser,
  signUpUser,
  getUserProfile,
  signOutUser,
  verifyToken,
} from "../controllers/authController";

import { protectedRoute } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signin", signInUser);

router.post("/signup", signUpUser);

router.get("/protected", protectedRoute, getUserProfile);

router.get("/logout", signOutUser);

router.get("/verify", verifyToken);

export default router;
