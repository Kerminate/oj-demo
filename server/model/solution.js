const mongoose = require('mongoose')
const config = require('../config/common.js')

const solutionSchema = mongoose.Schema({
  sid: {
    type: Number,
    index: {
      unique: true
    }
  },
  pid: {
    type: Number,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  mid: {
    type: Number,
    default: 1 // 历史遗留问题，这里的 mid 指代 cid, 默认为 1
  },
  time: {
    type: Number,
    default: 0
  },
  memory: {
    type: Number,
    default: 0
  },
  create: {
    type: Number,
    default: Date.now
  },
  length: Number,
  judge: {
    type: Number,
    default: config.judge.Pending
  },
  status: {
    type: Number,
    default: 2
  },
  language: {
    type: Number,
    required: true
  },
  error: {
    type: String,
    default: ''
  },
  sim: {
    type: Number,
    default: 0
  },
  sim_s_id: {
    type: Number,
    default: 0
  },
  code: {
    type: String,
    required: true
  },
  module: {
    type: Number,
    default: config.module.Problem
  }
}, {
  collection: 'Solution'
})

module.exports = mongoose.model('Solution', solutionSchema)
