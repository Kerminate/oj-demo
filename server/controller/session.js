// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// const sha1 = require('sha1')
const crypto = require('crypto')
const User = require('../model/user.js')
const createToken = require('../token/createToken.js')

function generatePwd (pwd) {
  return crypto.createHash('md5').update(pwd).digest('hex') + crypto.createHash('sha1').update(pwd).digest('hex')
}

// 根据用户名查找用户
const findUser = (uid) => User.findOne({ uid }).exec()

// 找到所有用户
const findAllUsers = () => User.find({}).exec()

// 删除某个用户
const delUser = (id) =>
  User.findOneAndRemove({ _id: id }).then(x => console.log('删除用户成功！'))

// 登录
const Login = async (ctx) => {
  // 拿到账号和密码
  let uid = ctx.request.body.uid
  let pwd = generatePwd(ctx.request.body.pwd)
  // let password = sha1(ctx.request.body.password)
  let doc = await findUser(uid)
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

// 注册
const Reg = async (ctx) => {
  let user = new User({
    uid: ctx.request.body.uid,
    nick: ctx.request.body.nick,
    pwd: generatePwd(ctx.request.body.pwd),
    token: createToken(this.uid)
  })
  // 将objectid转换为用户创建时间(可以不用)
  // user.create = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')
  let doc = await findUser(user.uid)
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

// 获取所有用户信息
const GetAllUsers = async (ctx) => {
  // 查询所有用户信息
  let doc = await findAllUsers()
  ctx.status = 200
  ctx.body = {
    success: '成功',
    result: doc
  }
}

// 删除某个用户
const DelUser = async (ctx) => {
  // 拿到要删除的用户id
  let id = ctx.request.body.uid
  await delUser(id)
  ctx.status = 200
  ctx.body = {
    success: '删除成功'
  }
}

module.exports = {
  Login,
  Reg,
  GetAllUsers,
  DelUser
}
