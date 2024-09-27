import { Request, Response } from "express";
import { accessToken } from "../utils/jwt";
import { User } from "../models/Users";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (res: Response, req: Request) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(400).send("Usuario incorrecto");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "password incorrect" });
    }
    const token = await accessToken(user.id, user.name);
    res.status(201).send({ email, password, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
