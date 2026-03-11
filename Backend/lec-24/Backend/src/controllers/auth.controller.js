const userModel = require('../models/user.model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email or username"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        )

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        })
    }
}



module.exports = {
    registerController
}