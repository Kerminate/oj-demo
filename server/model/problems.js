const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate') // 分页
const db = require('../config/db.js')

const problemSchema = db.Schema({
  isdone: Boolean,
  pid: {
    type: String,
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
  accepted: {
    type: Number,
    default: 0
  },
  submit: {
    type: Number,
    default: 0
  },
  tages: Array
})

problemSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Problem_list', problemSchema)
