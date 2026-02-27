const PostModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const { Folders } = require('@imagekit/nodejs/resources/index.js')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

const createPost = async (req, res) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).send({
            message: "Unauthorized - No token provided"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized - Invalid token"
        });
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: req.file.originalname,
        folder: "cohort-2-insta-posts"
    })

    const post = await PostModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        userId: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })


}

const getAllPosts = async (req, res) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).send({
            message: "Unauthorized - No token provided"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        return res.status(401).send({
            message: "Unauthorized - Invalid token"
        })
    }

    const posts = await PostModel.find({
        userId: decoded.id
    })

    res.status(200).json({  
        message: "Posts fetched successfully",
        posts
    })
}   

const getPostDetails = async (req, res) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).send({
            message: "Unauthorized - No token provided"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized - Invalid token"
        });
    }

    const userid = decoded.id
    const postId = req.params.postId

    const post = await PostModel.findById(postId)

    if (!post) {
        return res.status(404).send({
            message: "Post not found"
        })
    }

    const isValidUser = post.userId.toString() === userid

    if (!isValidUser) {
        return res.status(403).send({
            message: "Forbidden - You don't have access to this post"
        })
    }

    res.status(200).json({
        message: "Post details fetched successfully",
        post,
        isValidUser
    })
}

module.exports = {
    createPost,
    getAllPosts,
    getPostDetails
}