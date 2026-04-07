import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * @description Helper function to send token in a cookie and response.
 * @param {Object} user - The user object.
 * @param {number} statusCode - The HTTP status code.
 * @param {Object} res - The response object.
 * @param {string} message - The success message.
 */
const sendTokenResponse = (user, statusCode, res, message) => {
    const token = user.generateToken();

    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        message,
        token,
        data: user
    });
};

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(400, "User already exists with email or username");
    }

    const user = await User.create({ fullName, email, username, password });

    if (!user) {
        throw new ApiError(500, "User registration failed");
    }

    sendTokenResponse(user, 201, res, "User registered successfully!");
});

/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    sendTokenResponse(user, 200, res, "User logged in successfully!");
});

export { registerUser, loginUser };

