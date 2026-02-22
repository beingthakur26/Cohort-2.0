const express = require("express");
require("dotenv").config();
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

/* /api/auth/register*/
authRouter.post("/register", async (req,res) => {
    const {name, email, password} = req.body

    const isUserExists = await userModel.findOne({email})

    if(isUserExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        name, email, password: hash
    })
    
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET, 
    )

    res.cookie("jwtToken", token)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

/* /api/auth/get-me*/
authRouter.get("/get-me", async (req,res) => {
    const token = req.cookies.jwtToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    res.json({
        user
    })
})

/* /api/auth/login */
authRouter.post("/login", async (req,res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET, 
    )

    res.cookie("jwtToken", token)

    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    })
})
 
module.exports = authRouter;