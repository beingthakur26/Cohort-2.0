const express = require('express')
const authController = require('../controllers/auth.controler')

const authRouter = express.Router()  
// Create isolated router instance for auth-related routes

// Route for user registration
authRouter.post("/register", authController.registerController)

// Route for user login
authRouter.post("/login", authController.loginController)

module.exports = authRouter
// Export router to be mounted in main app (e.g., app.use("/auth", authRouter))