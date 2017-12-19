const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const ids = require('./ID')

const contestSchema = mongoose.Schema({
  cid: {
    type: Number,
    index: {
      unique: true
    },
    default: -1
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

contestSchema.pre('save', function (next) {
  // 保存
  if (this.cid === -1) {
    // 表示新的比赛被创建了，因此赋予一个新的 id
    ids
      .generateId('Contest')
      .then(id => {
        this.cid = id
      })
      .then(next)
  } else {
    next()
  }
})

module.exports = mongoose.model('Contest', contestSchema)
