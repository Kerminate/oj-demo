const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
require('./server/config/db.js')

const app = new Koa()
const router = new Router()

// 日志，会在控制台显示请求的方法和路由
app.use(logger())

app.use(bodyparser())

const session = require('./server/routes/session.js')
const problem = require('./server/routes/problem.js')
const news = require('./server/routes/news.js')
const status = require('./server/routes/status.js')
const user = require('./server/routes/user.js')

router.use('/session', session.routes(), session.allowedMethods()) // allowedMethods:当前接口运行的method
router.use('/problem', problem.routes(), problem.allowedMethods())
router.use('/news', news.routes(), news.allowedMethods())
router.use('/status', status.routes(), status.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888)
})
