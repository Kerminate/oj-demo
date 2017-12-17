const Solution = require('../model/solution.js')

// 返回提交列表
const getSolutionList = async (ctx) => {
  const opt = ctx.request.query
  const filter = {}
  const page = parseInt(opt.page)
  const pageSize = parseInt(opt.pageSize)
  if (opt.pid) filter.pid = opt.pid
  if (opt.uid) filter.uid = opt.uid
  if (opt.judge) filter.judge = opt.judge
  if (opt.language) filter.language = opt.language

  const res = await Solution.paginate(filter, {
    sort: { sid: -1 },
    page,
    limit: pageSize
  })

  ctx.body = {
    res
  }
}

module.exports = {
  getSolutionList
}
