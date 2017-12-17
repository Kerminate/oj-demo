const Contest = require('../model/contest.js')

// 返回竞赛列表
const getContestList = async (ctx) => {
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

module.exports = {
  getContestList
}
