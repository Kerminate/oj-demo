const status = require('../controllers/status')
const Router = require('koa-router')

const router = new Router()

router.get('/list', status.list)

module.exports = router
