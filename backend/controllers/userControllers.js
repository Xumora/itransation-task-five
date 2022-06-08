const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.json({ success: false, message: "Please enter all the fields" })
    }

    const userExists = await User.findOne({ username })
    if (userExists) {
        return res.json({ success: false, message: "This user is already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({ username, password: hashedPassword })

    const token = generateToken(user._id)
    if (user) {
        return res.json({ success: true, message: "User is created", userInfo: { token, id: user._id } })
    } else {
        return res.json({ success: false, message: "Failed to create the user" })
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.json({ success: false, message: "Please enter all the fields" })
    }

    const user = await User.findOne({ username })
    if (!user) {
        return res.json({ success: false, message: "There is not such an username" })
    }

    let isMatch = await bcrypt.compare(password, user.password).then(validPass => {
        if (validPass) {
            return true
        } else {
            return false
        }
    }).catch(err => console.log(err))
    if (!isMatch) {
        return res.json({ success: false, message: 'Passwords do not match' })
    }

    const token = generateToken(user._id)
    if (user && isMatch) {
        return res.json({ success: true, message: "User can login", userInfo: { token, id: user._id, username } })
    }
    res.json(isMatch)
})

const searchUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? { username: { $regex: req.query.search, $options: 'i' } } : {}
    const users = await User.find(keyword).select("-password")
    res.send(users)
})

const checkToken = asyncHandler(async (req, res) => {
    res.json({ success: true })
})

module.exports = { registerUser, authUser, searchUsers, checkToken }