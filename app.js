const Koa = require('koa')
const koaLogger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const router = require('./server/routes')
const logger = require('./server/utils/logger')
require('./server/config/db.js')

const app = new Koa()

// 日志，会在控制台显示请求的方法和路由
app.use(koaLogger())

app.use(bodyparser())

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  logger.info('The server is running at http://localhost:' + 8888)
})
