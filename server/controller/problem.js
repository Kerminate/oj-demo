const Problem = require('../model/problems.js')

// 返回题目列表
const findProblemList = (opt) => {
  let filter = {}
  let page = opt.page
  let pageSize = 10
  if (opt.type) {
    filter[opt.type] = opt.content
    page = 1
  }
  // console.log(filter)
  // console.log(typeof filter.pid + ' ' + filter.pid)
  return new Promise((resolve, reject) => {
    Problem.find(filter).sort({pid: 1}).skip((page - 1) * pageSize).limit(pageSize).exec((err, doc) => {
    // Problem.find(filter, (err, doc) => {
      if (err) {
        reject(err)
      } else {
        // console.log(doc)
        resolve(doc)
      }
    })
  })
}

// 返回题目数量
const countProblem = (opt) => {
  let filter = {}
  if (opt.type) {
    filter[opt.type] = opt.content
  }
  return new Promise((resolve, reject) => {
    Problem.where(filter).count((err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 获取所取题目信息
const getFindProblemList = async (ctx) => {
  let doc = await findProblemList(ctx.request.body)
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc
  }
}

// 返回题目数量
const getCountProblem = async (ctx) => {
  let doc = await countProblem(ctx.request.body)
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc
  }
}

module.exports = {
  getFindProblemList,
  getCountProblem
}
