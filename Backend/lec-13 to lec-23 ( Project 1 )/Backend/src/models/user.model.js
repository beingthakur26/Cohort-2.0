const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        unique:[true, 'User already exists'],
        required: [true, 'User is required']
    },
    email: {
        type: String,
        unique:[true, 'Email already exists'],
        required: [true, 'Email is required']
        
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio: String,
    profileImage: {
        type: String,
        default: 'https://ik.imagekit.io/hhb2cdv9pt/profileImage.jpg'
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel