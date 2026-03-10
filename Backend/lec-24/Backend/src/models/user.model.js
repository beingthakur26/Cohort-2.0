const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]       
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

// Task
// userSchema.pre("save", (next) => {})
// userSchema.post("save", (next) => {})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel