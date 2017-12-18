const Solution = require('../model/solution.js')
const only = require('only')
const pickBy = require('lodash.pickby')

// 返回提交列表
const getSolutionList = async (ctx) => {
  const opt = ctx.request.query
  const page = parseInt(opt.page)
  const pageSize = parseInt(opt.pageSize)
  const filter = pickBy(
    only(opt, 'uid pid judge language'),
    x => x != null && x !== '')

  const res = await Solution.paginate(filter, {
    sort: { sid: -1 },
    page,
    limit: pageSize,
    select: '-_id -code -error'
  })

  ctx.body = {
    res
  }
}

module.exports = {
  getSolutionList
}
