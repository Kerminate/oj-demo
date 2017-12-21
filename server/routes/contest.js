const contest = require('../controllers/contest.js')
const Router = require('koa-router')

const router = new Router()

router.get('/list', contest.list)
router.get('/:cid', contest.findOne)
router.get('/:cid/rank', contest.ranklist)

module.exports = router
