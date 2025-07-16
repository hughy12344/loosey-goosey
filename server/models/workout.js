const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: false
  },
  reps: {
    type: Number,
    required: false
  }
})

const workoutSchema = new mongoose.Schema({
  pracID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  clientID: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema]
})

module.exports = mongoose.model('Workout', workoutSchema)
