const Koa = require('koa')
const koaLogger = require('koa-logger')
const bodyparser = require('koa-body')
const staticCache = require('koa-static-cache')
const path = require('path')
const session = require('koa-session')
const router = require('./server/routes')
const logger = require('./server/utils/logger')
require('./server/config/db.js')

const app = new Koa()

// 日志，会在控制台显示请求的方法和路由
app.use(koaLogger())

app.keys = ['some secret hurr'] // TODO: config this at config.js

const CONFIG = {
  key: 'koa:oj:sess',
  maxAge: 1 * 60 * 1000, // ms
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true /** (boolean) signed or not (default true) */
}

app.use(session(CONFIG, app))

app.use(bodyparser({
  formidable: {
    uploadDir: path.resolve(__dirname, 'server/public/uploads')
  },
  multipart: true,
  urlencoded: true
}))

app.use(staticCache(path.join(__dirname, 'server/public'), {
  maxAge: 7 * 24 * 60 * 60 // 7 天不更新，也就是缓存期限
}))


app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      error: err.message
    }
    logger.error(`${err.status} -- ${err.message}\n${err.stack}`)
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  logger.info('The server is running at http://localhost:' + 8888)
})
