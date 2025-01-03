import { Request, Response } from "express";
import { accessToken, refreshToken } from "./jwt";
import { User } from "../model/Users";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { loginAttempts } from "../../services/loginAttempts";

dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario está bloqueado
    if (!loginAttempts.checkAttempts(email)) {
      const remainingTime = Math.ceil(loginAttempts.getRemainingTime(email) / 1000 / 60); // Convertir a minutos
      return res.status(429).json({ 
        error: `Demasiados intentos fallidos. Por favor, intente nuevamente en ${remainingTime} minutos.`
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      loginAttempts.addAttempt(email);
      return res.status(400).send("Credenciales incorrectas");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      loginAttempts.addAttempt(email);
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    // Login exitoso, resetear intentos
    loginAttempts.resetAttempts(email);

    const token = await accessToken(user.id, user.name);
    const getRefreshToken = await refreshToken(req, res);

    res.status(201).send({
      email,
      accessToken: token,
      refreshToken: getRefreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
