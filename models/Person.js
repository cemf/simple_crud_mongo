const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
  name: String,
  quote: String,
})

module.exports = mongoose.model('Person', personSchema)
