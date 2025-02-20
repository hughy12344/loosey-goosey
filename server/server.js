require('dotenv').config()
const cors = require('cors')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use(cors())

const appointmentRouter = require('./routes/appointments')
app.use('/appointments', appointmentRouter)

app.listen(8080, () => console.log('Server started'))
