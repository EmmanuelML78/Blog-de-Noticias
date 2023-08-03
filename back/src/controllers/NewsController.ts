import { Request, Response } from "express";
import News from "../models/News";
import Comment from "../models/Comment";
import User from "../models/User";

//obtener todas las noticias
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const allNews = await News.findAll();
    return res.json(allNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// noticia por su ID
export const getNewsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const news = await News.findByPk(id, { include: Comment });
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la noticia por ID" });
  }
};

//crear una nueva noticia
export const createNews = async (req: Request, res: Response) => {
  const { title, content, image } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const news = await News.create({ title, content, image, userId });
    const user = await User.findByPk(userId);
    res.json({ news, user });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la noticia" });
  }
};

//actualizar una noticia existente
export const updateNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, image } = req.body;
  try {
    const news = await News.findByPk(id);
    if (news) {
      await news.update({ title, content, image });
      res.json(news);
    } else {
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la noticia" });
  }
};

//eliminar una noticia
export const deleteNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const news = await News.findByPk(id);
    if (news) {
      await news.destroy();
      res.json({ message: "Noticia eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
};
