const RanklistController = require('../controller/ranklist.js')
const Router = require('koa-router')

const ranklistRouter = new Router()

ranklistRouter.get('/list', RanklistController.getRanklist)

module.exports = ranklistRouter
