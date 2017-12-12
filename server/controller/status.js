const Solution = require('../model/solution.js')

// 返回提交列表
const getSolutionList = async (ctx) => {
  let opt = ctx.request.query
  let filter = {}
  let page = parseInt(opt.page)
  let pageSize = parseInt(opt.pageSize)
  if (opt.pid) filter.pid = opt.pid
  if (opt.uid) filter.uid = opt.uid
  if (opt.judge) filter.judge = opt.judge
  if (opt.language) filter.language = opt.language

  const doc = await Solution
    .find(filter)
    .sort({pid: 1})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()

  const count = await Solution
    .find(filter)
    .count()

  ctx.body = {
    list: doc,
    count: count
  }
}

module.exports = {
  getSolutionList
}
