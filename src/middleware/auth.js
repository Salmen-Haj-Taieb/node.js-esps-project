const { User } = require("../model/user")
const jwt = require("jsonwebtoken")
require('dotenv').config()
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token,"5000")
        const userId = decodedToken.userId
        const userDetails = await User.findById(userId)
        if (userDetails) {
            req.user = userDetails
            next()
        } else {
            return res.status(403).json({
                status: 403,
                error: new Error('Inalid user!')
            })
        }
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        })
    }
}