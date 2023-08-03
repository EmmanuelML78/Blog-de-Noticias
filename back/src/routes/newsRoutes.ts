import express from "express";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
} from "../controllers/NewsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", authMiddleware, createNews);
router.put("/:id", authMiddleware, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;
