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

contestSchema.pre('validate', function (next) {
  // 验证字段
  ;['title', 'start', 'end', 'list', 'encrypt'].forEach((item) => {
    if (typeof this[item] === 'undefined' || this[item] === '') {
      next(new Error(`Field "${item}" is required to create a contest`))
    }
  })

  if (new Date(this.start).getTime() < Date.now()) {
    next(new Error('The game time should be in the future!'))
  } else if (new Date(this.start).getTime() >= new Date(this.end).getTime()) {
    next(new Error('The race end time can not be earlier than the start time!'))
  } else {
    next()
  }
})

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
