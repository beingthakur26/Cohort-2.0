const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authRouter = express.Router();

/* /api/auth/register*/
authRouter.post("/register", async (req,res) => {
    const {name, email, password} = req.body

    const isUserExists = await UserModel.findOne({email})

    if(isUserExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const user = await UserModel.create({
        name, email, password
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

module.exports = authRouter;