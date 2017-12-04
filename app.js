const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()
app.use(bodyparser())

const users = require('./server/routes/user.js')
const problems = require('./server/routes/problem.js')

router.use('/user', users.routes(), users.allowedMethods()) // allowedMethods:当前接口运行的method
router.use('/problem', problems.routes(), users.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888)
})
