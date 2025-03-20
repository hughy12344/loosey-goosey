require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const appointmentRouter = require('./routes/appointments')
const authRouter = require('./routes/auth')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use('/appointments', require('./middleware/auth'), appointmentRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT
app.listen(8080, () => console.log(`Server started on port ${PORT}`))
