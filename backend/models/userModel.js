const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

const User = mongoose.model("User", userModel)

module.exports = User;