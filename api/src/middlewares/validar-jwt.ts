import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const jwtKey = process.env.JWT_SECRET_KEY as string;

interface JwtPayload {
  id: string;
  name: string;
}

export const validarJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send("No hay token en la petición");
  }

  try {
    const { id, name } = jwt.verify(token, jwtKey) as JwtPayload;
    req.body.id = id;
    req.body.name = name;
  } catch (error) {
    return res.status(401).send("Token no válido");
  }

  next();
};
