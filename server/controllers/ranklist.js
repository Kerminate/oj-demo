const User = require('../models/User.js')
const only = require('only')
const pickBy = require('lodash.pickby')

// 返回排名列表
const list = async (ctx) => {
  let opt = ctx.request.query
  let page = parseInt(opt.page) || 1
  let pageSize = parseInt(opt.pageSize) || 30
  const filter = pickBy(
    only(opt, 'mid'),
    x => x != null && x !== '')
  const res = await User.paginate(filter, {
    sort: { solve: -1, submit: 1 },
    page,
    limit: pageSize,
    select: '-_id -pwd -privilege'
  })

  ctx.body = {
    res
  }
}

module.exports = {
  list
}
