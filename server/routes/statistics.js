const statistics = require('../controllers/statistics')
const Router = require('koa-router')

const rotuer = new Router()

rotuer.get('/:pid', statistics.list)

module.exports = rotuer
