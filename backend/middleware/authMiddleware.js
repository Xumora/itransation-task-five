const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json(err)
        }
        next()
    })
}