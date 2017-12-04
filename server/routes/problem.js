const ProblemController = require('../controller/problem-list.js')
const Router = require('koa-router')

const problemRouter = new Router()

problemRouter.get('/', ProblemController.GetAllProblems)

module.exports = problemRouter
