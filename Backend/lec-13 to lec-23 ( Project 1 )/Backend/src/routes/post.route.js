const express = require('express')
const PostRouter = express.Router()
const PostController = require('../controllers/post.controler')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware')


/* 
    POST /api/posts [protected] 
    re.body - {caption, imgUrl}
*/
PostRouter.post("/create", upload.single("imgUrl"), identifyUser, PostController.createPost)

/*
    GET /api/posts [protected]
*/
PostRouter.get("/", identifyUser, PostController.getAllPosts)

/*
    GET /api/posts/details/:postId 
    return a detailed info about a post with id and check whether post belongs to the user that the request comes from
*/
PostRouter.get("/details/:postId", identifyUser, PostController.getPostDetails)


module.exports = PostRouter 