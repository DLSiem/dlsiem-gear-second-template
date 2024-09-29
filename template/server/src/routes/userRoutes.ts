import express from "express";

import {
  getUserById,
  getAllUsers,
  deleteUserById,
  createUser,
  updateUserById,
} from "../controllers/userController";

const router = express.Router();

router.get("/:userId", getUserById);
router.patch("/:userId/update", updateUserById);
router.get("/", getAllUsers);
router.delete("/delete/:userId", deleteUserById);
router.post("/create", createUser);

export default router;
