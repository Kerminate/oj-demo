const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const sha1 = require('sha1')
const User = require('../model/user.js')
const createToken = require('../token/createToken.js')

// 根据用户名查找用户
const findUser = (username) => User.findOne({ username }).exec()

// 找到所有用户
const findAllUsers = () => User.find({}).exec()

// 删除某个用户
const delUser = (id) =>
  User.findOneAndRemove({ _id: id }).then(x => console.log('删除用户成功！'))

// 登录
const Login = async (ctx) => {
  // 拿到账号和密码
  let username = ctx.request.body.username
  let password = sha1(ctx.request.body.password)
  let doc = await findUser(username)
  if (!doc) {
    console.log('检查到用户名不存在')
    ctx.status = 200
    ctx.body = {
      info: false
    }
  } else if (doc.password === password) {
    console.log('密码一致')
    // 生成一个新的token,并存到数据库
    let token = createToken(username)
    console.log(token)
    doc.token = token
    await doc.save()

    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token, // 登录成功要创建一个新的token，应该存到数据库
      create_time: doc.create_time
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
    username: ctx.request.body.username,
    nickname: ctx.request.body.nickname,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username)
  })
  // 将objectid转换为用户创建时间(可以不用)
  user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')

  let doc = await findUser(user.username)
  if (doc) {
    console.log('用户已经存在')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  } else {
    await User.save()

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
  let id = ctx.request.body.id
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
