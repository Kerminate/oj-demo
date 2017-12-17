const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const contestSchema = mongoose.Schema({
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
  encrypt: {
    type: Number,
    default: 1
  },
  argument: {
    type: mongoose.Schema.Types.Mixed, // 这个字段干啥的？
    default: null
  }
}, {
  collection: 'Contest'
})

contestSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Contest', contestSchema)
