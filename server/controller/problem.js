const Problem = require('../model/problem.js')

// 返回题目列表
const getProblemList = async (ctx) => {
  const opt = ctx.request.query
  const filter = {}
  const page = parseInt(opt.page)
  const pageSize = parseInt(opt.pageSize)
  if (opt.type) {
    page = 1
    if (opt.type === 'pid') {
      filter[opt.type] = parseInt(opt.content)
    } else {
      filter[opt.type] = opt.content
    }
  }

  // 链式操作较多的话，个人建议分成多行的话，可读性更加
  const [ doc, count ] = Promise.all([
    Problem
      .find(filter)
      .sort({pid: 1})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec(),
    Problem
      .count(filter)
      .exec()
  ])

  ctx.body = {
    list: doc,
    count: count
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

module.exports = {
  getProblemList,
  getOneProblem,
  createProblem
}
