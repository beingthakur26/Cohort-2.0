const jwt = require('jsonwebtoken');

const identifyUser = async (req, res, next) => {
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

    req.user = decoded;

    next();

}

module.exports = identifyUser