import { Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const jwtKey = process.env.JWT_SECRET_KEY as string;

export const accessToken = async (
  id: string | number,
  name: string
): Promise<string> => {
  const payload = { id, name };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token");
      }
      resolve(token as string);
    });
  });
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name } = req.body as { id: number | string; name: string };
  try {
    const token = await accessToken(id, name);
    return res.status(200).send({ id, name, token });
  } catch (error) {
    return res.status(500).send({ error: "No se pudo generar el token" });
  }
};
