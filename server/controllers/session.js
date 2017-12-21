// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// const sha1 = require('sha1')
const User = require('../models/User')
// const createToken = require('../token/createToken')
const { generatePwd } = require('../utils/helper')

const login = async (ctx) => {
  const uid = ctx.request.body.uid
  const pwd = generatePwd(ctx.request.body.pwd)

  const user = await User
    .findOne({ uid })
    .exec()

  if (user == null) {
    ctx.throw(400, 'No such a user')
  }
  if (user.pwd !== pwd) {
    ctx.throw(400, 'Wrong password')
  }

  ctx.session.user = user
  ctx.body = {}
}

const logout = async (ctx) => {
  delete ctx.session.user
  ctx.body = {}
}

const profile = async (ctx) => {
  ctx.body = {
    user: ctx.session.user
  }
}

module.exports = {
  login,
  logout,
  profile
}
