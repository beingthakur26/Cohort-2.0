const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const crypto = require("crypto");
const authRouter = express.Router();

/* /api/auth/register*/
authRouter.post("/register", async (req,res) => {
    const {name, email, password} = req.body

    const isUserExists = await UserModel.findOne({email})

    if(isUserExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await UserModel.create({
        name, email, password: hash
    })
    
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET, 
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

/* /api/auth/protected */
authRouter.post("/protected", (req,res) => {
    console.log(req.cookies)
    res.status(200).json(
        {message: "Protected route accessed successfully"
    })
})

/* /api/auth/login */
authRouter.post("/login", async (req,res) => {
    const {email, password} = req.body

    const user = await UserModel.findOne({email})

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

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    })
})

module.exports = authRouter;