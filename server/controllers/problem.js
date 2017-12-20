const Problem = require('../models/Problem')
const only = require('only')
const logger = require('../utils/logger')

// 返回题目列表
const list = async (ctx) => {
  const opt = ctx.request.query
  const filter = {}
  const page = parseInt(opt.page) || 1
  const pageSize = parseInt(opt.pageSize) || 30
  if (opt.content) {
    if (opt.type === 'pid') {
      filter[opt.type] = parseInt(opt.content)
    } else {
      filter[opt.type] = opt.content
    }
  }

  // 使用mongoose-paginate包简化
  const res = await Problem.paginate(filter, {
    sort: { pid: 1 },
    page,
    limit: pageSize,
    select: '-_id -hint -description -in -out -input -output' // -表示不要的字段
  })

  ctx.body = {
    res
  }
}

// 返回一道题目
const findOne = async (ctx) => {
  const opt = parseInt(ctx.query.pid)
  const doc = await Problem.findOne({pid: opt}).exec()
  ctx.body = doc
}

// 新建一个题目
const create = async (ctx) => {
  const opt = ctx.request.body

  const info = new Problem(Object.assign(
    only(opt, 'title description input output in out hint'),
    { // pid 会自动生成
      time: parseInt(opt.time) || 1000,
      memory: parseInt(opt.memory) || 32768
    }
  ))

  await info.save()
  ctx.body = {
    success: true,
    pid: info.pid
  }
}

// 更新一道题目
const update = async (ctx) => {
  const opt = ctx.request.body
  const problem = await Problem.findOne({pid: opt.pid}).exec()
  const fileds = ['title', 'time', 'memory', 'description', 'input', 'output', 'hint', 'in', 'out']
  fileds.forEach((filed) => {
    problem[filed] = opt[filed]
  })
  try {
    await problem.save()
    logger.info(`New problem is updated" ${problem.pid} -- ${problem.title}`)
  } catch (e) {
    ctx.throw(400, e.message)
  }

  ctx.body = {
    success: true
  }
}

module.exports = {
  list,
  findOne,
  create,
  update
}
