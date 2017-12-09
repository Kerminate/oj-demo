const NewsController = require('../controller/news.js')
const Router = require('koa-router')

const newsRouter = new Router()

newsRouter.get('/list', NewsController.getNewsList)
newsRouter.get('/:pid', NewsController.getNewsInfo)

module.exports = newsRouter
