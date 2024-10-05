import express, { Router } from "express";

import authRouter from "./authRouter";

const router = Router();

router.use(express.json());

router.use("/auth", authRouter);

export default router;
