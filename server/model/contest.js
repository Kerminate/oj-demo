const mongoose = require('mongoose')

const newSchema = mongoose.Schema({
  cid: {
    type: Number,
    index: {
      unique: true
    }
  },
  title: String,
  status: {
    type: Number,
    default: 2
  },
  create: {
    type: Number,
    default: Date.now
  },
  start: Number,
  end: Number,
  creator: String,
  list: [Number],
  encrypt: 1,
  argument: {
    type: mongoose.Schema.Types.Mixed, // 这个字段干啥的？
    default: null
  }
}, {
  collection: 'Contest'
})

module.exports = mongoose.model('Contest', newSchema)
