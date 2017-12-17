const ProblemController = require('../controller/problem.js')
const Router = require('koa-router')

const problemRouter = new Router()

problemRouter.get('/list', ProblemController.getProblemList)
problemRouter.get('/:pid', ProblemController.getOneProblem)
problemRouter.post('/', ProblemController.createProblem)
problemRouter.put('/:pid', ProblemController.updateProblem)

module.exports = problemRouter
