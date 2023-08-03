import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

//Definición de tipos para incluir la propiedad 'user' en el objeto Request
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

//verificar la autenticación del usuario
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  // Si no hay token, el usuario no está autenticado
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Token missing" });
  }

  try {
    // Verifica y decodifica el token
    const decodedToken: any = jwt.verify(token, secretKey);

    // Busca al usuario en la base de datos por el ID del token
    const user = await User.findOne({ where: { id: decodedToken.userId } });

    // Si el usuario no existe, devuelve un error
    if (!user) {
      return res.status(401).json({ error: "Unauthorized. User not found" });
    }

    // Almacena el usuario en el objeto
    req.user = user;

    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    return res.status(401).json({ error: "Unauthorized. Invalid token" });
  }
};
