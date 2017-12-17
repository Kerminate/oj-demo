const User = require('../model/user.js')

// 返回排名列表
const getRanklist = async (ctx) => {
  let opt = ctx.request.query
  let filter = {}
  let page = parseInt(opt.page) || 1
  let pageSize = parseInt(opt.pageSize) || 30

  const res = await User.paginate(filter, {
    sort: { solve: -1, submit: 1 },
    page,
    limit: pageSize
  })

  ctx.body = {
    res
  }
}

module.exports = {
  getRanklist
}
