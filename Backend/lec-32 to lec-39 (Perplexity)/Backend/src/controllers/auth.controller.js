import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../services/mail.service.js";

/**
 * Send token in cookie
 * @param {Object} user - The user object.
 * @param {number} statusCode - The HTTP status code.
 * @param {Object} res - The response object.
 * @param {string} message - The success message.
 */
const sendTokenResponse = (user, statusCode, res, message) => {
    const token = user.generateToken();

    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    user.password = undefined;

    res.status(statusCode)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message,
            data: user
        });
};

/**
 * REGISTER USER
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    // ✅ Basic validation (don’t skip this)
    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // ✅ Check existing user
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(400, "User already exists");
    }

    // ✅ Create user
    const user = await User.create({
        fullName,
        email,
        username,
        password
    });

    if (!user) {
        throw new ApiError(500, "User registration failed");
    }

    // ✅ Send email (DON'T BREAK FLOW)
    sendEmail({
        to: user.email,
        subject: "Welcome to our Platform - Perplexity",
        html: `
        <h1>Welcome to our Platform</h1>
        <p>Your username is ${user.username}</p>
        `
    }).catch(err => {
        console.error("Email failed:", err.message);
    });

    // ✅ Send token (better UX)
    sendTokenResponse(user, 201, res, "User registered successfully!");
});

/**
 * LOGIN USER
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    sendTokenResponse(user, 200, res, "User logged in successfully!");
});

export { registerUser, loginUser };