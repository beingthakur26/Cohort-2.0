const userModel = require('../models/user.model')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerController = async (req, res) => {

    const { user, email, password, bio, profileImage } = req.body

    // Check if username OR email already exists in database
    const isUserAlreadyExist = await userModel.findOne({ 
        $or: [
            { user },
            { email }
        ] 
    })

    // Stop registration if duplicate found
    if (isUserAlreadyExist) {
        return res.status(409).json({ 
            message: "User already exists" + 
                (isUserAlreadyExist.email ? " with this email" : " with this username")
        })
    }

    // Hash password before saving (never store plain password)
    const hash = await bcrypt.hash(password, 10)

    // Create user with hashed password
    const newUser = await userModel.create({
        user,
        email,
        password: hash,
        bio,
        profileImage
    })

    // Generate JWT token for authentication (valid 1 day)
    const token = JWT.sign({ 
        id: newUser._id,
        username: newUser.user
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    // Store token in cookie for future requests
    res.cookie('token', token)

    // Send user data (never send password)
    res.status(201).json({ 
        message: "User registered successfully",
        email : newUser.email,
        user : newUser.user,
        bio : newUser.bio,
        profileImage : newUser.profileImage
     })
}

const loginController = async (req, res) => {

    const { user, email, password } = req.body

    // Find user using either username or email
    const userExists = await userModel.findOne({ 
        $or: [
            { user: user }, 
            { email: email }
        ] 
    })

    // If no matching user found
    if (!userExists) {
        return res.status(404).json({ 
            message: "User not found" 
        })
    }   

    // Compare entered password with hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(password, userExists.password)

    // If password doesn't match
    if (!isPasswordCorrect) {
        return res.status(401).json({ 
            message: "Invalid credentials" 
        })
    }    

    // Generate new JWT token after successful login
    const token = JWT.sign({ 
        id: userExists._id,
        username: userExists.user
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)       

    // Send response without password field
    res.status(200).json({ 
        message: "User logged in successfully",
        email : userExists.email, 
        user : userExists.user,
        bio : userExists.bio,
        profileImage : userExists.profileImage
    })
}

const getMeController = async (req, res) => {

    const userId = req.user.id  

    const user = await userModel.findById(userId).select("-password")

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }   

    res.status(200).json({
        email : user.email,
        user : user.user,
        bio : user.bio,
        profileImage : user.profileImage
    })
}



module.exports = {
    registerController,
    loginController,
    getMeController
}