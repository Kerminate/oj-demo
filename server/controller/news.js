const News = require('../model/news.js')

// 返回消息列表
const getNewsList = async (ctx) => {
  let filter = {}
  console.log(ctx.query)
  let opt = ctx.request.query
  let page = parseInt(opt.page) || 1
  let pageSize = parseInt(opt.pageSize) || 5
  const doc = await News
    .find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()
  ctx.body = doc
}

// 返回消息数量
const getNewsNumber = async (ctx) => {
  let filter = {}
  const doc = await News.find(filter).count()
  ctx.status = 200
  ctx.body = doc
}

// 返回一道题目
const getNewsInfo = async (ctx) => {
  let opt = parseInt(ctx.query.pid)
  let doc = await News.findOne({pid: opt}).exec()
  ctx.status = 200
  ctx.body = doc
}

module.exports = {
  getNewsList,
  getNewsNumber,
  getNewsInfo
}
