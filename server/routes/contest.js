const ContestController = require('../controller/contest.js')
const Router = require('koa-router')

const contestRouter = new Router()

contestRouter.get('/list', ContestController.getContestList)

module.exports = contestRouter
