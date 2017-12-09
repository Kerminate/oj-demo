const mongoose = require('mongoose')

const newSchema = mongoose.Schema({
  pid: Number,
  title: String,
  content: String,
  create_time: Date
})

module.exports = mongoose.model('News', newSchema)
