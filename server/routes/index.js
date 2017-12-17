const Router = require('koa-router')

const router = new Router()

const session = require('./session.js')
const problem = require('./problem.js')
const news = require('./news.js')
const status = require('./status.js')
const user = require('./user.js')
const statistics = require('./statistics.js')
const ranklist = require('./ranklist.js')
const contest = require('./contest.js')

router.use('/session', session.routes(), session.allowedMethods()) // allowedMethods:当前接口运行的method
router.use('/problem', problem.routes(), problem.allowedMethods())
router.use('/news', news.routes(), news.allowedMethods())
router.use('/status', status.routes(), status.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/statistics', statistics.routes(), statistics.allowedMethods())
router.use('/ranklist', ranklist.routes(), ranklist.allowedMethods())
router.use('/contest', contest.routes(), contest.allowedMethods())

module.exports = router
