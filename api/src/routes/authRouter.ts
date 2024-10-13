import { Router } from "express";
import { refreshToken } from "../utils/jwt";
import { validarJWT } from "../middlewares/validar-jwt";
import { loginUser } from "../auth/auth";
import {
  postUserHandler,
  updateUserHandler,
  getUserHandler,
  getUserByIdHandler,
  deleteGame,
} from "../handlers/usersHandlers";

const authRouter = Router();

// Ruta para crear un nuevo usuario
authRouter.post("/create", postUserHandler);

// Ruta para actualizar un usuario existente
authRouter.put("/update/:id", updateUserHandler);

// // Ruta para obtener todos los usuarios
authRouter.get("/getAll", validarJWT, getUserHandler);

// // Ruta para obtener un usuario por ID
authRouter.get("/usersById/:id", validarJWT, getUserByIdHandler);

// // Ruta para borrar un usuario por ID
authRouter.delete("/usersById/:id", validarJWT, deleteGame);

authRouter.post("/create", loginUser);
authRouter.get("/renew", validarJWT, refreshToken);

export default authRouter;
