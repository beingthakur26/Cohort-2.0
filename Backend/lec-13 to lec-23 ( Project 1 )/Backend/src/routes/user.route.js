const express = require("express")
const userControllers = require('../controllers/user.controler')
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()


/* 
 - POST /api/users/follow/:username
 - Follow a user (authenticated route)
*/
userRouter.post(
    "/follow/:username",
    identifyUser, // Ensures only logged-in users can follow someone
    userControllers.followUserController
)

/*
 - POST /api/users/unfollow/:username
 - Unfollow a user (authenticated route)
*/
userRouter.post(
    "/unfollow/:username",
    identifyUser, // Prevents unauthorized unfollow attempts
    userControllers.unFollowUserController
)

/*
  PATCH /api/users/follow/status/:username
  - Accept or reject a follow request
  - Requires logged-in user (target of the request)
*/
userRouter.patch(
    "/follow/status/:username",
    identifyUser, // Needed to verify that only the target user updates status
    userControllers.updateFollowStatus
)

module.exports = userRouter;