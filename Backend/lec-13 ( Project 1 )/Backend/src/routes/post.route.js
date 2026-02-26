const express = require('express')
const PostRouter = express.Router()
const PostController = require('../controllers/post.controler')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })



/* 
    POST /api/posts [protected] 
    re.body - {caption, imgUrl}
*/
PostRouter.post("/create", upload.single("imgUrl"), PostController.createPost)



module.exports = PostRouter 