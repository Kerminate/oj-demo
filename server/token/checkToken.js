const jwt = require('jsonwebtoken')

// 检查token是否过期
module.exports = async (ctx, next) => {
  // 拿到token
  // console.log(ctx.request);的输出
       // { method: 'GET',
       // url: '/api/user',
       // header:
       // { 'accept-language': 'zh-CN,zh;q=0.8',
       //     'accept-encoding': 'gzip, deflate, sdch, br',
       //     referer: 'http://localhost:8000/',
       //     authorization: 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzMTIzMTIzIiwiaWF0IjoxNDk0NDA1MDg4LCJleHAiOjE0OTQ0MDUwODh9.57iy3sL9TG0MTXBS7Xr6SS0QGRZObrivUloy-25NBqg',
       //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36',
       //     accept: 'application/json, text/plain, */*',
       //     connection: 'close',
       //     host: 'localhost:8888' } }
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, "no token detected in http header 'Authorization'")
  }
  const token = authorization.split(' ')[1]
  try {
    await jwt.verify(token, 'kerminate') // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, 'invalid token')
  }
  await next()
}
