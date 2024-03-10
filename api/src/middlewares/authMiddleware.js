const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization)
            return res.status(401).json({ message: 'Invalid token' })

        const [, bearerToken] = authorization.split(' ')

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(401).json({ message: 'Invalid token' })

            req._token = decoded

            next()
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = authMiddleware