const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')

const router = express.Router()

// Register Route
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, firstName } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      user = new User({
        email,
        password: hashedPassword,
        firstName
      })

      await user.save()

      const payload = { user: { id: user.id } }
      jwt.sign(payload, 'your-jwt-secret', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
    }
  }
)

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      const payload = { user: { id: user.id } }
      jwt.sign(payload, 'your-jwt-secret', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err
        res.json({ token, user: {firstName: user.firstName, _id: user._id} })
      })
    } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
