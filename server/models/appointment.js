const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema)