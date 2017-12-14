const User = require('../model/user')
const Solution = require('../model/solution')
const util = require('../config/util.js')
const createToken = require('../token/createToken.js')

// 查询用户具体信息
const getUserInfo = async (ctx) => {
  let uid = ctx.query.uid
  const info = await User
    .findOne({ uid })
    .exec()

  const solved = await Solution
    .find({ uid, judge: 3 })
    .distinct('pid')
    .exec()

  const unsolved = await Solution
    .find({ uid, judge: {$ne: 3} })
    .distinct('pid')
    .exec()

  console.log(info)
  ctx.status = 200
  ctx.body = {
    info,
    solved,
    unsolved
  }
}

// 注册
const reg = async (ctx) => {
  let user = new User({
    uid: ctx.request.body.uid,
    nick: ctx.request.body.nick,
    pwd: util.generatePwd(ctx.request.body.pwd),
    token: createToken(this.uid)
  })
  // 将objectid转换为用户创建时间(可以不用)
  // user.create = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')
  let doc = await User.findOne({ uid: user.uid }).exec()
  if (doc) {
    console.log('用户已经存在')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  } else {
    await user.save()

    console.log('注册成功')
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }
}

module.exports = {
  getUserInfo,
  reg
}
