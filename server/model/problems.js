const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate') // 分页
const db = require('../config/db.js')

const problemSchema = db.Schema({
  isdone: Boolean,
  pid: {
    type: String,
    index: true
  },
  title: String,
  accepted: Number,
  submit: Number,
  tages: Array
})

problemSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Problem_list', problemSchema)
