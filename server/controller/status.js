const Solution = require('../model/solution.js')
const only = require('only')

// 返回提交列表
const getSolutionList = async (ctx) => {
  const opt = ctx.request.query
  const page = parseInt(opt.page)
  const pageSize = parseInt(opt.pageSize)
  const filter = only(opt, 'uid pid judge language')

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
