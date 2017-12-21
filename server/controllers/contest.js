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

  let pro = []
  res.forEach((value, index) => {
    pro.push(res[index].pid)
  })

  ctx.body = {
    doc,
    res,
    total,
    pro
  }
}

const getRanklist = async (ctx) => {
  let res = []
  const cid = parseInt(ctx.query.cid)
  const users = await Solution.find({mid: cid}).distinct('uid').exec()
  const contest = await Contest.findOne({cid}).exec()
  const start = contest.start
  users.forEach((value, index) => {
    let prolist = []
    res[index] = { uid: value }
    contest.list.forEach((item, ind) => {
      prolist[ind] = {
        pid: item,
        submit: 0,
        solve: false,
        create: 0
      }
    })
    res[index].list = prolist
  })
  const process = users.map(async (value, index) => {
    await Solution.aggregate([
      { $match: {
        mid: cid,
        uid: value,
        judge: 3
      }},
      { $group: {
        _id: '$pid',
        pid: { $first: '$pid' },
        create: { $first: '$create' }
      }}
    ]).exec()
      .then((solution) => {
        let solve = []
        solution.forEach((value, index) => {
          solve[index] = only(value, 'pid create')
        })
        res[index].solve = solve
      })
      .then(() => {
        return Solution.find({mid: cid, uid: value, judge: {$ne: 3}}).exec()
      })
      .then((solution) => {
        let error = []
        solution.forEach((value, index) => {
          error[index] = only(value, 'pid create')
        })
        res[index].error = error
      })
  })
  await Promise.all(process)

  res.forEach((value, index) => {
    res[index].ac = value.solve.length
    res[index].time = 0
    value.error.forEach((item, ind) => {
      value.list[contest.list.indexOf(item.pid)].submit++
    })
    value.solve.forEach((item, ind) => {
      value.list[contest.list.indexOf(item.pid)].create = item.create
      value.list[contest.list.indexOf(item.pid)].solve = true
      res[index].time += item.submit * 20 * 60 * 1000 + item.create - start
    })
  })

  console.log(res)
  res.sort((a, b) => {
    if (a.ac !== b.ac) {
      return a.ac < b.ac
    } else {
      return a.time > b.time
    }
  })

  ctx.body = {
    res
  }
}

module.exports = {
  list,
  findOne,
  getRanklist
}
