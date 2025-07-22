const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')

//Getting all
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
  const workout = new Workout({
    pracID: req.body.pracID,
    pracFirstName: req.body.pracFirstName,
    date: req.body.date,
    clientID: req.body.clientID,
    exercises: req.body.exercises
  })
  try {
    const newWorkout = await workout.save()
    res.status(201).json(newWorkout)
  } catch (err) {
    res.status(400)
  }
})

module.exports = router
