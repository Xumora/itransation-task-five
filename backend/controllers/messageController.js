const asyncHandler = require("express-async-handler")
const Message = require("../models/messageModel")

const sendMessage = asyncHandler(async (req, res) => {
    const { sender, theme, text, recipient } = req.body
    var newMessage = {
        sender: { _id: sender.id, username: sender.username },
        theme: theme.length > 0 ? theme : "Without theme",
        content: text,
        recipient: { _id: recipient._id, username: recipient.username },
    }
    var msg = await Message.create(newMessage)
    return res.json(msg)
})

const getMessage = asyncHandler(async (req, res) => {
    const type = req.query.type
    const user = req.query.user
    if (type === "" || type === "incoming") {
        const messages = await Message.find({ 'recipient._id': user }).sort({ createdAt: -1 })
        return res.json(messages)
    } else if (type === "sent") {
        const messages = await Message.find({ 'sender._id': user }).sort({ createdAt: -1 })
        return res.json(messages)
    } else if (type === "all") {
        const messages = await Message.find({ $or: [{ 'recipient._id': user }, { 'sender._id': user }] }).sort({ createdAt: -1 })
        return res.json(messages)
    }
})

const sentMsgToUsers = asyncHandler(async (req, res) => {
    const users = req.query.users
    const id = req.query.id
    const result = await Message.find({ $and: [{ 'recipient._id': users }, { 'sender._id': id }] }).sort({ createdAt: -1 })
    return res.json(result)
})

module.exports = { sendMessage, getMessage, sentMsgToUsers }