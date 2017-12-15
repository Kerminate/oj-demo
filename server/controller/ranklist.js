const User = require('../model/user.js')

// 返回题目列表
const getRanklist = async (ctx) => {
  let opt = ctx.request.query
  let filter = {}
  let page = parseInt(opt.page) || 1
  let pageSize = parseInt(opt.pageSize) || 20

  const doc = await User
    .find(filter)
    .sort({pid: 1})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()

  const count = await User
    .find(filter)
    .count()

  ctx.status = 200
  ctx.body = {
    list: doc,
    count: count
  }
}

module.exports = {
  getRanklist
}
