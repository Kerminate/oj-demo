const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    index: {
      unique: true
    }
  },
  nick: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  // token: {
  //   type: String,
  //   required: true
  // },
  create: {
    type: Number,
    default: Date.now
  },
  privilege: {
    type: String,
    default: 1
  },
  timerecord: {
    type: [Number],
    default: [0, 0, 0, 0, 0]
  },
  iprecord: {
    type: [String],
    default: ['', '', '', '', '']
  },
  status: {
    type: Number,
    default: 2
  },
  solve: {
    type: Number,
    default: 0
  },
  motto: String,
  mail: String,
  school: String
}, {
  collection: 'User'
})

module.exports = mongoose.model('User', userSchema)
