const Problem = require('../model/problems.js')

// 返回题目列表
// const findAllProblems = () => {
//   return new Promise((resolve, reject) => {
//     Problem.find({}, (err, doc) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(doc)
//       }
//     })
//   })
// }
const findProblemList = (ctx, next) => {
  let filter = {}
  // await Problem.find(filter).sort({pid: 1}).limit(10).exec((err, doc) => {
  return new Promise((resolve, reject) => {
    let problemModel = Problem.find(filter).sort({pid: 1}).limit(10)
    problemModel.exec({filter}, (err, doc) => {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

// 获取所有题目信息
const GetAllProblems = async (ctx) => {
  let doc = await findProblemList()
  ctx.status = 200
  ctx.body = {
    success: '成功',
    result: doc
  }
}

module.exports = {
  GetAllProblems
}
