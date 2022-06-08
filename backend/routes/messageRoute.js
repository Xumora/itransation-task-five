const express = require('express')
const { sendMessage, getMessage, sentMsgToUsers } = require('../controllers/messageController')

const router = express.Router()

router.post('/sendMessage', sendMessage)
router.get('/getMessage', getMessage)
router.get('/sentToUsers', sentMsgToUsers)

module.exports = router;