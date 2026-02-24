const express = require('express')
const authRouter = express.Router()
const userModel = require('../models/user.model')

authRouter.post("/register", async (req, res) => {
    const { user, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({ 
        $or: [
            {user},
            {email}
        ] 
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({ 
            message: "User already exists" + (isUserAlreadyExist.email ? " with this email" : " with this username")
        })
    }



})