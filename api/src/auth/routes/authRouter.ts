import { Router } from "express";
import { refreshToken } from "../services/jwt";
import { validarJWT } from "../../middlewares/validar-jwt";
import { loginUser } from "../services/authService";
import {
  postUserHandler,
  updateUserHandler,
  getUserHandler,
  getUserByIdHandler,
  recoverPasswordHandler,
  resetPasswordHandler,
  deleteUserHandler,
  restoreUserHandler,
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

authRouter.post("/login", loginUser);
authRouter.get("/renew", refreshToken);

// Ruta para solicitar recuperación de contraseña
authRouter.post("/recover-password", recoverPasswordHandler);

// Ruta para restablecer la contraseña
authRouter.post("/reset-password", resetPasswordHandler);

// Ruta para soft delete de usuario
authRouter.delete("/usersById/:id", validarJWT, deleteUserHandler);

// Opcional: Ruta para restaurar usuario
authRouter.post("/restore/:id", validarJWT, restoreUserHandler);

export default authRouter;
