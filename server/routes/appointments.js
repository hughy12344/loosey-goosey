const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointment')

// Getting all
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.json(appointments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one
router.get('/:id', getAppointment, (req, res) => {
  res.json(res.appointment)
})

// Creating one
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  })
  try {
    const newAppointment = await appointment.save()
    res.status(201).json(newAppointment)
  } catch (err) {
    res.status(400)
  }
})

// Updating one
router.patch('/:id', getAppointment, async (req, res) => {
  if (req.body.title != null) {
    res.appointment.title = req.body.title
  }

  try {
    const updatedAppointment = await res.appointment.save()
    res.json(updatedAppointment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one
router.delete('/:id', getAppointment, async (req, res) => {
  try {
    await res.appointment.deleteOne()
    res.json({ message: 'Deleted appointment' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getAppointment (req, res, next) {
  let appointment
  try {
    appointment = await Appointment.findById(req.params.id)
    if (appointment == null) {
      return res.status(404).json({ message: 'Could not find appointment' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.appointment = appointment
  next()
}

module.exports = router
