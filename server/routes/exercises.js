const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise')

// Getting all
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find()
    res.json(exercises)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one
router.get('/:id', getExercise, (req, res) => {
  res.json(res.exercise)
})

// Creating one
router.post('/', async (req, res) => {
  const exercise = new Exercise({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    userID: req.body.userID
  })
  try {
    const newExercise = await exercise.save()
    res.status(201).json(newExercise)
  } catch (err) {
    res.status(400)
  }
})

// Updating one
router.patch('/:id', getExercise, async (req, res) => {
  if (req.body.title != null) {
    res.exercise.title = req.body.title
  }

  try {
    const updatedExercise = await res.exercise.save()
    res.json(updatedExercise)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one
router.delete('/:id', getExercise, async (req, res) => {
  try {
    await res.exercise.deleteOne()
    res.json({ message: 'Deleted exercise' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getExercise (req, res, next) {
  let exercise
  try {
    exercise = await Exercise.findById(req.params.id)
    if (exercise == null) {
      return res.status(404).json({ message: 'Could not find exercise' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.exercise = exercise
  next()
}

module.exports = router
