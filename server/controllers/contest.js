const Contest = require('../models/Contest')
const Problem = require('../models/Problem')
const Solution = require('../models/Solution')
const only = require('only')

// 返回竞赛列表
const list = async (ctx) => {
  const opt = ctx.request.query
  const page = parseInt(opt.page) || 1
  const pageSize = parseInt(opt.pageSize) || 20
  const res = await Contest.paginate({}, {
    sort: { cid: -1 },
    page,
    limit: pageSize
  })

  ctx.body = {
    res
  }
}

const findOne = async (ctx) => {
  const opt = parseInt(ctx.query.cid)
  const doc = await Contest.findOne({ cid: opt }).exec()

  const list = doc.list
  const total = list.length
  let res = []
  const process = list.map(async (pid, index) => {
    await Problem.findOne({pid}).exec()
      .then((problem) => {
        res[index] = only(problem, 'title pid')
      })
      .then(() => {
        return Solution.count({pid, module: 2}).exec() // 为什么用mid不用module？
      })
      .then((count) => {
        res[index].submit = count
      })
      .then(() => {
        return Solution.count({pid, module: 2, judge: 3}).exec()
      })
      .then((count) => {
        res[index].solve = count
      })
  })
  await Promise.all(process)

  ctx.body = {
    doc,
    res,
    total
  }
}

module.exports = {
  list,
  findOne
}
