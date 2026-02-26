const mongoose =require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image URL is required"]
    },
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ID is required"]
    }
}, {timestamps: true})

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel