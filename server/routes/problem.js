const problem = require('../controllers/problem')
const Router = require('koa-router')

const router = new Router()

router.get('/list', problem.list)
router.get('/:pid', problem.findOne)
router.post('/', problem.create)
router.put('/:pid', problem.update)

module.exports = router
