const Problem = require('../model/problems.js')

// // 返回题目列表
// const findProblemList = (opt) => {
//   let filter = {}
//   console.log(opt)
//   let page = parseInt(opt.page)
//   let pageSize = parseInt(opt.pageSize)
//   if (opt.type) {
//     filter[opt.type] = opt.content
//     page = 1
//   }
//   console.log(filter)
//   // console.log(typeof filter.pid + ' ' + filter.pid)
//   // return new Promise((resolve, reject) => {
//   Problem.find(filter).sort({pid: 1}).skip((page - 1) * pageSize).limit(pageSize).exec((err, doc) => {
//   // Problem.find(filter, (err, doc) => {
//     if (err) {
//       // reject(err)
//       // console.log(err)
//     } else {
//       // console.log(doc)
//       return doc
//       // resolve(doc)
//     }
//   })
//   // })
// }
//
// // 返回题目数量
// const countProblem = (opt) => {
//   let filter = {}
//   if (opt.type) {
//     filter[opt.type] = opt.content
//   }
//   return new Promise((resolve, reject) => {
//     Problem.where(filter).count((err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }
//
// // 返回一道题目
// const findInfo = (opt) => {
//   return new Promise((resolve, reject) => {
//     Problem.findOne({pid: opt}, (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }

// 返回题目列表
const getFindProblemList = async (ctx) => {
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
  const doc = await Problem.find(filter).sort({pid: 1}).skip((page - 1) * pageSize).limit(pageSize).exec()
  ctx.body = {
    success: true,
    result: doc
  }
}

// 返回题目数量
const getCountProblem = async (ctx) => {
  let opt = ctx.request.query
  let filter = {}
  if (opt.type) {
    filter[opt.type] = opt.content
  }
  const doc = await Problem.find(filter).count()
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc
  }
}

// 返回一道题目
const getFindInfo = async (ctx) => {
  let opt = ctx.request.query
  let doc = await Problem.findOne({pid: opt}).exec()
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc
  }
}

module.exports = {
  getFindProblemList,
  getCountProblem,
  getFindInfo
}
