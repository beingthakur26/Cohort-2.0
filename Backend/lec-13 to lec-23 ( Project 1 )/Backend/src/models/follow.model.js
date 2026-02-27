const mongoose = require('mongoose')


const followSchema = new mongoose.Schema({
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Followers are required"]
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Follwing are required"]
    }]
}, { timestamps: true })

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel