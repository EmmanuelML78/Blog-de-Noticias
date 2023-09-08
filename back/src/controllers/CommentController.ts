import { Request, Response } from "express";
import Comment from "../models/Comment";
import User from "../models/User";
import News from "../models/News";

// obtener todos los comentarios de una noticia
export const getAllComments = async (req: Request, res: Response) => {
  const { newsId } = req.params;
  try {
    const allComments = await Comment.findAll({ where: { newsId } });
    return res.json(allComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// crear un nuevo comentario para una noticia
export const createComment = async (req: Request, res: Response) => {
  const { newsId } = req.params;
  const { content } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // First, create the new comment
    const newComment = await Comment.create({ content, newsId, userId });
    const user = await User.findByPk(userId);
    const news = await News.findByPk(newsId);

    return res.status(201).json({ newComment, user, news });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// actualizar
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Verificar si el comentario con el id especificado existe en la base de datos
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Actualizar el contenido del comentario
    await comment.update({ content });

    return res.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// eliminar un comentario
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    await comment.destroy();
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
