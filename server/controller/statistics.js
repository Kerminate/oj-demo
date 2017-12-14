const Solution = require('../model/solution.js')

// 获取statistics信息
const getStatistics = async (ctx) => {
  let opt = ctx.query
  // let page = parseInt(opt.page) || 1
  // let pageSize = parseInt(opt.pageSize) || 10
  let page = 1
  let pageSize = 10
  let pid = parseInt(opt.pid)

  // distinct不能喝sort同时使用，故使用聚合
  const list = await Solution.aggregate([
    { $match: {
      pid,
      judge: 3
    }},
    { $sort: {
      time: 1,
      memory: 1,
      length: 1,
      create: 1
    }},
    { $group: {
      _id: '$uid',
      sid: { $first: '$sid' },
      time: { $first: '$time' },
      memory: { $first: '$memory' },
      length: { $first: '$length' },
      language: { $first: '$language' },
      create: { $first: '$create' },
      pid: { $first: '$pid' },
      uid: { $first: '$uid' }
    }},
    {
      $skip: (page - 1) * pageSize
    },
    {
      $limit: pageSize
    }
  ]).exec()

  let counted = []
  for (let i = 2; i <= 10; i++) {
    counted.push(Solution.find({pid, judge: i}).count().exec())
  }
  counted = await Promise.all(counted)

  const total = await counted.reduce((sum, item) => sum + item)

  ctx.body = {
    list,
    counted,
    total
  }
}

module.exports = {
  getStatistics
}
