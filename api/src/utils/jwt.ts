import { Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const jwtKey = process.env.JWT_SECRET_KEY as string;

export const accessToken = (
  id: string | number,
  name: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };
    jwt.sign(
      payload,
      jwtKey,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("noi se pudo generar el token");
        }
        resolve(token as string);
      }
    );
  });
};

export const refreshToken = async (
  res: Response,
  req: Request
): Promise<Response> => {
  const { id, name } = req.body as { id: number | string; name: string };
  try {
    const token = await accessToken(id, name);
    return res.status(200).send({ id, name, token });
  } catch (error) {
    return res.status(500).send({ error: "No se pudo generar el token" });
  }
};
