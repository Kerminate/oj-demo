const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
require('./server/config/db.js')

const app = new Koa()
const router = new Router()
app.use(bodyparser())

const user = require('./server/routes/user.js')
const problem = require('./server/routes/problem.js')

router.use('/user', user.routes(), user.allowedMethods()) // allowedMethods:当前接口运行的method
router.use('/problem', problem.routes(), problem.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888)
})
