const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""  // Optional caption, empty string if not provided
    },
    imgUrl: {
        type: String,
        required: [true, "Image URL is required"]  
        // Stores cloud image URL (not file itself)
    },
    userId: {
        ref: "User",  // Reference to User collection (for population)
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ID is required"]  
        // Links post to its creator using stable ObjectId
    }
}, { timestamps: true })  // Adds createdAt and updatedAt automatically

const PostModel = mongoose.model("posts", postSchema)

module.exports = PostModel