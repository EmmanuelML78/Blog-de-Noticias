import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import { token } from "morgan";

dotenv.config();

const saltRounds = 10;

// nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
  const { name, lastName, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Encripta la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea el nuevo usuario
    const newUser = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({ token, user: newUser, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ where: { email } });

    // Si el usuario no existe, devuelve un error
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed. User not found" });
    }

    // Verifica si la contraseña coincide con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide, devuelve un error
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Invalid password" });
    }

    // Genera el token de autenticación usando jsonwebtoken
    const token: string = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    res.header("token", token).json({ token, user: user });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
