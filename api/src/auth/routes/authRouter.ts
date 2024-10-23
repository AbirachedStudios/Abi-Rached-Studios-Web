import { Router } from "express";
import { refreshToken } from "../services/jwt";
import { validarJWT } from "../../middlewares/validar-jwt";
import { loginUser } from "../services/authService";
import {
  postUserHandler,
  updateUserHandler,
  getUserHandler,
  getUserByIdHandler,
  deleteGame,
} from "../handlers/usersHandlers";

const authRouter = Router();

// http://localhost:3001/auth

// Ruta para crear un nuevo usuario
authRouter.post("/register", postUserHandler);

// Ruta para actualizar un usuario existente
authRouter.put("/update/:id", updateUserHandler);

// // Ruta para obtener todos los usuarios
authRouter.get("/getAll", validarJWT, getUserHandler);

// // Ruta para obtener un usuario por ID
authRouter.get("/usersById/:id", validarJWT, getUserByIdHandler);

// // Ruta para borrar un usuario por ID
authRouter.delete("/usersById/:id", validarJWT, deleteGame);

authRouter.post("/login", loginUser);
authRouter.get("/renew", validarJWT, refreshToken);

export default authRouter;
