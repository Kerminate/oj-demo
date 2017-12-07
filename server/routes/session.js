const UserController = require('../controller/session.js')
const Router = require('koa-router')

const userRouter = new Router()

// checkToken作为中间件存在
const checkToken = require('../token/checkToken.js')

userRouter.post('/login', UserController.Login)
userRouter.post('/register', UserController.Reg)

// 需要先检查权限的路由
userRouter.get('/info', checkToken, UserController.GetAllUsers)
userRouter.post('/del', checkToken, UserController.DelUser)

module.exports = userRouter
