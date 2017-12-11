const mongoose = require('mongoose')

const newSchema = mongoose.Schema({
  nid: {
    type: Number,
    index: {
      unique: true
    }
  },
  title: String,
  content: String,
  status: {
    type: Number,
    default: 2
  },
  create: {
    type: Number,
    default: Date.now
  }
}, {
  collection: 'News'
})

module.exports = mongoose.model('News', newSchema)
