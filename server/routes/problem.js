const ProblemController = require('../controller/problem.js')
const Router = require('koa-router')

const problemRouter = new Router()

problemRouter.get('/list', ProblemController.getProblemList)
problemRouter.get('/:pid', ProblemController.getOneProblem)
problemRouter.post('/add', ProblemController.createProblem)

module.exports = problemRouter
