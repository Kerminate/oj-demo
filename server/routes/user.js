const user = require('../controllers/user')
const Router = require('koa-router')

const router = new Router()

router.get('/:uid', user.findOne)

router.post('/', user.reg)

module.exports = router
