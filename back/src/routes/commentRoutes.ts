import express from "express";
import {
  getAllComments,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/CommentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:newsId", getAllComments);
router.post("/:newsId", authMiddleware, createComment);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
