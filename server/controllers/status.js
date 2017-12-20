const Solution = require('../models/Solution')
const only = require('only')
const pickBy = require('lodash.pickby')

// 返回提交列表
const list = async (ctx) => {
  const opt = ctx.request.query
  const page = parseInt(opt.page) || 1
  const pageSize = parseInt(opt.pageSize) || 30
  const filter = pickBy(
    only(opt, 'uid pid judge language mid'),
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
  list
}
