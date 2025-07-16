const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')

// Creating one
router.post('/', async (req, res) => {
    console.log('Posting')
    const workout = new Workout({
        pracID: req.body.pracID,
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