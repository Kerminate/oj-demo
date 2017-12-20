const session = require('../controllers/session')
const Router = require('koa-router')

const router = new Router()

// checkToken作为中间件存在
// const checkToken = require('../token/checkToken.js')

router.post('/login', session.login)

// 需要先检查权限的路由
// sessionRouter.get('/info', checkToken, SessionController.GetAllUsers)
// sessionRouter.post('/del', checkToken, SessionController.DelUser)

module.exports = router
