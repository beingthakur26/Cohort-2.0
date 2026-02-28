const express = require('express')
const PostRouter = express.Router()
const PostController = require('../controllers/post.controler')
const multer = require('multer')

// Store uploaded file in memory (buffer) instead of disk
// Useful when directly uploading to cloud (ImageKit)
const upload = multer({ storage: multer.memoryStorage() })

const identifyUser = require('../middlewares/auth.middleware')


/* 
    POST /api/posts/create  [protected] 
    body -> { caption }
    file -> imgUrl (multipart/form-data)
*/
PostRouter.post(
    "/create",
    upload.single("imgUrl"),  // Extract single file from form-data
    identifyUser,             // Attach logged-in user to req.user
    PostController.createPost
)

/*
    GET /api/posts  [protected]
    Returns posts of logged-in user
*/
PostRouter.get(
    "/",
    identifyUser,             // Must verify user before accessing posts
    PostController.getAllPosts
)

/*
    GET /api/posts/details/:postId  [protected]
    Returns detailed post info and checks ownership inside controller
*/
PostRouter.get(
    "/details/:postId",
    identifyUser,             // Required to check ownership
    PostController.getPostDetails
)

/*
    POST /api/posts/like/:postId  [protected]
    Likes a post using its ID
*/
PostRouter.post(
    "/like/:postId",
    identifyUser,             // Ensures only authenticated users can like
    PostController.likePost
)

module.exports = PostRouter