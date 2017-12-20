async function login (ctx, next) {
  if (!ctx.session || ctx.session.user == null) ctx.throw(401, 'Login required')
  return next()
}

async function admin (ctx, next) {
  // TODO 判断一个用户是不是 admin
  return next()
}

module.exports = {
  auth: {
    login,
    admin
  }
}
