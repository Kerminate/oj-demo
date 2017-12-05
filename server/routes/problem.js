const ProblemController = require('../controller/problem.js')
const Router = require('koa-router')

const problemRouter = new Router()

problemRouter.post('/list', ProblemController.getFindProblemList)
problemRouter.post('/count', ProblemController.getCountProblem)

module.exports = problemRouter
