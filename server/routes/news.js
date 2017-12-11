const NewsController = require('../controller/news.js')
const Router = require('koa-router')

const newsRouter = new Router()

newsRouter.get('/list', NewsController.getNewsList)
newsRouter.get('/:nid', NewsController.getNewsInfo)

module.exports = newsRouter
