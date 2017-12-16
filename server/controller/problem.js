const Problem = require('../model/problem.js')

// 返回题目列表
const getProblemList = async (ctx) => {
  let opt = ctx.request.query
  let filter = {}
  let page = parseInt(opt.page)
  let pageSize = parseInt(opt.pageSize)
  if (opt.type) {
    page = 1
    if (opt.type === 'pid') {
      filter[opt.type] = parseInt(opt.content)
    } else {
      filter[opt.type] = opt.content
    }
  }

  // 链式操作较多的话，个人建议分成多行的话，可读性更加
  const doc = await Problem
    .find(filter)
    .sort({pid: 1})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()

  const count = await Problem
    .find(filter)
    .count()

  ctx.status = 200
  ctx.body = {
    list: doc,
    count: count
  }
}

// 返回一道题目
const getOneProblem = async (ctx) => {
  let opt = parseInt(ctx.query.pid)
  let doc = await Problem.findOne({pid: opt}).exec()
  ctx.status = 200
  ctx.body = doc
}

// 新建一个题目
const createProblem = async (ctx) => {
  let opt = ctx.request.body

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
