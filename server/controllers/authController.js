const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate presence of required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Validate input types
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input type' })
        }

        // Find user by email
        const foundUser = await User.findOne({ email }).lean()
        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // Compare provided password with hashed password
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // Prepare payload for JWT
        const userInfo = {
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email
        }

        // Sign JWT with expiration
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

        // Respond with token and user info
        res.json({ accessToken: accessToken, user: userInfo, role: foundUser.role })

    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Server error during login' })
    }
}

const register = async (req, res) => {
    try {
        const { name, password, email } = req.body

        // Validate presence of required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Validate input types
        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input type' })
        }

        // Check for duplicate email
        const duplicate = await User.findOne({ email: email }).lean()
        if (duplicate) {
            return res.status(409).json({ message: "Duplicate email" })
        }

        // Hash password before storing
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject = { name, email, password: hashedPwd }

        // Create new user document
        const user = await User.create(userObject)
        if (user) {
            return res.status(201).json({ message: `New user ${user.email} created` })
        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }

    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({ message: 'Server error during registration' })
    }
}

module.exports = { login, register }
