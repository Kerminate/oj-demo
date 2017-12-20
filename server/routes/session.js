const session = require('../controllers/session')
const Router = require('koa-router')

const router = new Router()

router.post('/', session.login)
router.get('/', session.profile)
router.del('/', session.logout)

module.exports = router
