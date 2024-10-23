import { Request, Response } from "express";
import { accessToken } from "./jwt";
import { User } from "../model/Users";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("Usuario incorrecto");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }
    const token = await accessToken(user.id, user.name);
    res.status(201).send({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
