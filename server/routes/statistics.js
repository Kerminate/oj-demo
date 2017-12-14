const StatisticsController = require('../controller/statistics.js')
const Router = require('koa-router')

const statisticsRouter = new Router()

statisticsRouter.get('/:pid', StatisticsController.getStatistics)

module.exports = statisticsRouter
