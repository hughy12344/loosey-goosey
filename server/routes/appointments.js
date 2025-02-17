const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointment')

//Getting all
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.json(appointments)
    } catch (err) {
        res.status(500).json({ message: error.message })
    }
})
//Getting one
router.get('/:id', (req, res) => {

})
//Creating one
router.post('/', async (req, res) => {
    const appointment = new Appointment({
        title: req.body.title
    })
    try {
        const newAppointment = await appointment.save()
        res.status(201).json(newAppointment)
    } catch (err) {
        res.status(400)
    }
})
//Updating one
router.patch('/:id', (req, res) => {
    
})
//Deleting one
router.delete('/:id', (req, res) => {
    
})

module.exports = router