import express from "express";

import {
  getUserById,
  getAllUsers,
  deleteUserById,
} from "../controllers/userController";

const router = express.Router();

router.get("/:userId", getUserById);
router.get("/", getAllUsers);
router.delete("/delete/:userId", deleteUserById);

export default router;
