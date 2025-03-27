const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  pracID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Client', clientSchema)