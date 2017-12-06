const ProblemController = require('../controller/problem.js')
const Router = require('koa-router')

const problemRouter = new Router()

problemRouter.get('/list', ProblemController.getFindProblemList)
problemRouter.get('/count', ProblemController.getCountProblem)
problemRouter.get('/info', ProblemController.getFindInfo)

module.exports = problemRouter
