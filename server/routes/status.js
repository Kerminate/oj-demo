const StatusController = require('../controller/status.js')
const Router = require('koa-router')

const statusRouter = new Router()

statusRouter.get('/list', StatusController.getSolutionList)

module.exports = statusRouter
