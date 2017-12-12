const Problem = require('../model/problem.js')

// 返回题目列表
const getProblemList = async (ctx) => {
  let opt = ctx.request.query
  let filter = {}
  let page = parseInt(opt.page)
  let pageSize = parseInt(opt.pageSize)
  if (opt.type) {
    page = 1
    if (opt.type === 'pid') {
      filter[opt.type] = parseInt(opt.content)
    } else {
      filter[opt.type] = opt.content
    }
  }

  // 链式操作较多的话，个人建议分成多行的话，可读性更加
  const doc = await Problem
    .find(filter)
    .sort({pid: 1})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()

  const count = await Problem
    .find(filter)
    .count()

  ctx.status = 200
  ctx.body = {
    list: doc,
    count: count
  }
}

// 返回一道题目
const getOneProblem = async (ctx) => {
  let opt = parseInt(ctx.query.pid)
  let doc = await Problem.findOne({pid: opt}).exec()
  ctx.status = 200
  ctx.body = doc
}

module.exports = {
  getProblemList,
  getOneProblem
}
