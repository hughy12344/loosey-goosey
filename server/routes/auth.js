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
    body('type'),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { type, email, password, firstName } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      user = new User({
        type,
        email,
        password: hashedPassword,
        firstName
      })

      await user.save()

      const payload = { user: { id: user.id } }
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
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
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 60 * 60 * 1000
      })

      res.json({
        user: { firstName: user.firstName, _id: user._id, type: user.type }
      })
    } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
    }
  }
)

// Logout Route
router.post(
  '/logout',
  async (req, res) => {
    try {
      res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' })
      res.status(200).json({ message: 'Logged out successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
    }
  }
)

// Get User ID by Email
router.get(
  '/getUserByEmail',
  async (req, res) => {
    try {
      const { email } = req.query
      if (!email) {
        return res.status(400).json({ message: 'Email is required' })
      }

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ userID: user._id })
    } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
    }
  }
)

// Get One User
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

async function getUser (req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user === null) {
      return res.status(404).json({ message: 'Could not find appointment' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router
