const UserController = require('../controller/user.js')
const Router = require('koa-router')

const userRouter = new Router()

userRouter.get('/:uid', UserController.getUser)

module.exports = userRouter
