import { Router } from "express";
import { authRegister } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/register", authRegister)

export default authRouter