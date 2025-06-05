const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  userID: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Appointment', appointmentSchema)