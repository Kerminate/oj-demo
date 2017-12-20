async function loginRequired (ctx, next) {
  if (!ctx.session || ctx.session.user == null) ctx.throw(401, 'Login required')
  return next()
}

module.exports = {
  loginRequired
}
