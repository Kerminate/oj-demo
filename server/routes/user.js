const UserController = require('../controller/user.js')
const Router = require('koa-router')

const userRouter = new Router()

userRouter.get('/:uid', UserController.getUserInfo)

userRouter.post('/register', UserController.reg)

module.exports = userRouter
