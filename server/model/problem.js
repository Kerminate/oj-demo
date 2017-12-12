const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate') // 分页

const problemSchema = mongoose.Schema({
  isdone: Boolean,
  pid: {
    type: Number,
    index: {
      unique: true
    }
  },
  time: {
    type: Number,
    default: 1000,
    min: 100,
    max: 10000
  },
  memory: {
    type: Number,
    default: 32768,
    min: 100,
    max: 32768 * 4
  },
  title: {
    type: String,
    required: true
  },
  create: {
    type: Number,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  input: {
    type: String,
    default: ''
  },
  output: {
    type: String,
    default: ''
  },
  in: {
    type: String,
    default: ''
  },
  out: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  solve: {
    type: Number,
    default: 0
  },
  submit: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 2
  },
  tages: {
    type: [String],
    default: []
  }
}, {
  collection: 'Problem'
})

problemSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Problemlist', problemSchema)
