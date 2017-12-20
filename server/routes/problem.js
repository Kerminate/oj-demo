const problem = require('../controllers/problem')
const Router = require('koa-router')
const { loginRequired } = require('../utils/middlewares')

const router = new Router()

router.get('/list', problem.list)
router.get('/:pid', problem.preLoad, problem.findOne)
router.post('/', loginRequired, problem.create)
router.put('/:pid', loginRequired, problem.preLoad, problem.update)

module.exports = router
