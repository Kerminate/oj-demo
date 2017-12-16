const Koa = require('koa')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const router = require('./server/routes')
require('./server/config/db.js')

const app = new Koa()

// 日志，会在控制台显示请求的方法和路由
app.use(logger())

app.use(bodyparser())

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888)
})
