const userModel = require('../models/user.model')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')

const registerController = async (req, res) => {
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

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const newUser = await userModel.create({
        user,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = JWT.sign({ 
        id: newUser._id 
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

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

    const userExists = await userModel.findOne({ 
        $or: [
            { user: user }, 
            { email: email }
        ] 
    })

    if (!userExists) {
        return res.status(404).json({ 
            message: "User not found" 
        })
    }   

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordCorrect = hash === userExists.password

    if (!isPasswordCorrect) {
        return res.status(401).json({ 
            message: "Invalid credentials" 
        })
    }    

    const token = JWT.sign({ 
        id: userExists._id 
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)       

    res.status(200).json({ 
        message: "User logged in successfully",
        email : userExists.email, 
        user : userExists.user,
        bio : userExists.bio,
        profileImage : userExists.profileImage
    })
}

module.exports = {
    registerController,
    loginController
}