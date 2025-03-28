const express = require('express')
const router = express.Router()
const Client = require('../models/client')

//Getting all
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find()
        res.json(clients)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Creating one
router.post('/', async (req, res) => {
    try {
        const { pracID, userID } = req.body

        const existingClient = await Client.findOne({ userID })

        if (existingClient) {
            return res.status(400).json({ message: 'Client already assigned to a practitioner' })
        }

        const newClient = new Client({
            pracID,
            userID
        })

        await newClient.save()
        res.status(201).json(newClient)
    } catch (err) {
        res.status(400)
    }
})

module.exports = router