import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access public
 */
router.route("/register").post(registerValidator, validate, registerUser);

/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access public
 */
router.route("/login").post(loginValidator, validate, loginUser);

export default router;

