const userModel = require('../models/user.model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    const { username, email, password } = req.body

    

}



module.exports = {
    registerController
}