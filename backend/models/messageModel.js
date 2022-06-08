const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
    sender: { type: Object },
    theme: { type: String, trim: true },
    content: { type: String, trim: true },
    recipient: { type: Object }
}, {
    timestamps: true
})

const Message = mongoose.model("Message", messageModel)

module.exports = Message