const SessionController = require('../controller/session.js')
const Router = require('koa-router')

const sessionRouter = new Router()

// checkToken作为中间件存在
const checkToken = require('../token/checkToken.js')

sessionRouter.post('/login', SessionController.Login)
sessionRouter.post('/register', SessionController.Reg)

// 需要先检查权限的路由
sessionRouter.get('/info', checkToken, SessionController.GetAllUsers)
sessionRouter.post('/del', checkToken, SessionController.DelUser)

module.exports = sessionRouter
