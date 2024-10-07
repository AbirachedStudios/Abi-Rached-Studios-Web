import { Router } from "express";
import { refreshToken } from "../utils/jwt";
import { validarJWT } from "../middlewares/validar-jwt";
import { loginUser } from "../auth/auth";
import { postUserHandler } from "../handlers/usersHandlers";

const authRouter = Router();

authRouter.post("/create", postUserHandler);

authRouter.post("/create", loginUser);
authRouter.get("/renew", validarJWT, refreshToken);

export default authRouter;
