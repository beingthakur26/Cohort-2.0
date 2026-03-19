import { authRegister} from "../controllers/auth.controller.js";
import { Router } from "express";
import { registerValidation } from "../validation/auth.validator.js";

const authRouter = Router()

/**
 * /api/auth/register
 */
authRouter.post("/register", registerValidation, authRegister)


export default authRouter