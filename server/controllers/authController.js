const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require('jsonwebtoken')



const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ email }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const userInfo = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email

    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken: accessToken,user:userInfo,role:foundUser.role })

}
const register = async (req, res) => {
    const { name, password, email } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ email: email }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, password: hashedPwd }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({ message: `New user ${user.email} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
module.exports = { login, register }