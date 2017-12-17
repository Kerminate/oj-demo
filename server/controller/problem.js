const Problem = require('../model/problem.js')

// 返回题目列表
const getProblemList = async (ctx) => {
  const opt = ctx.request.query
  const filter = {}
  const page = parseInt(opt.page) || 1
  const pageSize = parseInt(opt.pageSize) || 30
  if (opt.type) {
    if (opt.type === 'pid') {
      filter[opt.type] = parseInt(opt.content)
    } else {
      filter[opt.type] = opt.content
    }
  }

  // const [ doc, count ] = await Promise.all([
  //   Problem
  //     .find(filter)
  //     .sort({pid: 1})
  //     .skip((page - 1) * pageSize)
  //     .limit(pageSize)
  //     .exec(),
  //   Problem
  //     .count(filter)
  //     .exec()
  // ])
  // ctx.body = {
  //   list: doc,
  //   count: count
  // }

  // 使用mongoose-paginate包简化
  const res = await Problem.paginate(filter, {
    sort: { pid: 1 },
    page,
    limit: pageSize
  })

  ctx.body = {
    res
  }
}

// 返回一道题目
const getOneProblem = async (ctx) => {
  const opt = parseInt(ctx.query.pid)
  const doc = await Problem.findOne({pid: opt}).exec()
  ctx.body = doc
}

// 新建一个题目
const createProblem = async (ctx) => {
  const opt = ctx.request.body

  const initPro = await Problem
    .findOne()
    .sort({pid: -1})
    .limit(1)
    .exec()

  console.log(opt)
  console.log(initPro)

  const info = new Problem({
    pid: parseInt(initPro.pid) + 1,
    title: opt.title,
    time: parseInt(opt.time) || 1000,
    memory: parseInt(opt.memory) || 32768,
    description: opt.description,
    input: opt.input,
    output: opt.output,
    in: opt.in,
    out: opt.out,
    hint: opt.hint
  })

  await info.save()
  ctx.body = {
    success: true,
    pid: info.pid
  }
}

// 更新一道题目
const updateProblem = async (ctx) => {
  const problem = ctx.request.body
  console.log(problem)
  await Problem.save(problem)
  ctx.body = {
    success: true
  }
}

module.exports = {
  getProblemList,
  getOneProblem,
  createProblem,
  updateProblem
}
