// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// const sha1 = require('sha1')
const User = require('../model/user.js')
const createToken = require('../token/createToken.js')
const util = require('../config/util.js')

// 登录
const Login = async (ctx) => {
  // 拿到账号和密码
  let uid = ctx.request.body.uid
  let pwd = util.generatePwd(ctx.request.body.pwd)
  // let password = sha1(ctx.request.body.password)
  let doc = await User.findOne({ uid }).exec()
  if (!doc) {
    console.log('检查到用户名不存在')
    ctx.status = 200
    ctx.body = {
      info: false
    }
  } else if (doc.pwd === pwd) {
    console.log('密码一致')
    // 生成一个新的token,并存到数据库
    let token = createToken(uid)
    console.log(token)
    doc.token = token
    await doc.save()

    ctx.status = 200
    ctx.body = {
      success: true,
      uid,
      token, // 登录成功要创建一个新的token，应该存到数据库
      create: doc.create
    }
  } else {
    console.log('密码错误')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  }
}

module.exports = {
  Login
}
