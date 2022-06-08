const express = require('express')
const { registerUser, authUser, searchUsers, checkToken } = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/registration', registerUser)
router.post('/login', authUser)
router.get('/searchUsers', searchUsers)
router.get('/checkToken', authMiddleware, checkToken)

module.exports = router;