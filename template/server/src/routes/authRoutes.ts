import express from "express";
import {
  signInUser,
  signUpUser,
  signOutUser,
  verifyToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/signin", signInUser);

router.post("/signup", signUpUser);

router.get("/logout", signOutUser);

router.get("/verify", verifyToken);

export default router;
