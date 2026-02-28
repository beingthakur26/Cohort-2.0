const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

const followUserController = async (req, res) => {

    const followerUsername  = req.user.username
    const followingUsername = req.params.username
 
    // Prevent self-follow
    if (followerUsername === followingUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    // Ensure the target user actually exists in DB
    const isFollowingExists = await userModel.findOne({
        user: followingUsername
    })

    if (!isFollowingExists) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    // Check if follow relationship already exists
    const isAlreadyFollowing = await followModel.findOne({
        followers: followerUsername,
        following: followingUsername
    })

    if (isAlreadyFollowing) {
        return res.status(409).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }

    // Create new follow request (default status = pending)
    const followRecords = await followModel.create({
        followers: followerUsername,
        following: followingUsername,
        status: "pending"  // useful for private accounts logic
    })

    res.status(200).json({
        message: `User followed ${followingUsername} successfully`,
        follower: followerUsername,
        following: followingUsername,
        follow: followRecords
    })
}

const unFollowUserController = async (req, res) => {

    const followerUsername  = req.user.username
    const followingUsername = req.params.username

    // Check if relationship exists before deleting
    const isUserFollowing = await followModel.findOne({
        followers: followerUsername,
        following: followingUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following this ${followingUsername} user`
        })
    }

    // Remove follow relationship
    await followModel.findOneAndDelete({
        followers: followerUsername,
        following: followingUsername
    })

    res.status(200).json({
        message: `User unfollowed ${followingUsername} successfully`,
        follower: followerUsername,
        unfollowed: followingUsername
    })
}

const updateFollowStatus = async (req, res) => {

    const loggedInUser = req.user.username
    const requesterUsername = req.params.username
    const { status } = req.body   // expected: accepted or rejected

    // Only allow valid status transitions
    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({
            message: "Status must be accepted or rejected"
        })
    }

    // Find pending follow request where:
    // requester -> loggedInUser
    const followRequest = await followModel.findOne({
        followers: requesterUsername,
        following: loggedInUser,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: "Pending request not found"
        })
    }

    // Update follow request status
    followRequest.status = status
    await followRequest.save()

    res.status(200).json({
        message: `Follow request ${status}`,
        follow: followRequest
    })
}

module.exports = {
    followUserController,
    unFollowUserController,
    updateFollowStatus
}