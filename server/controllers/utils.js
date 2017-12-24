const path = require('path')

const submit = (ctx) => {
  const filename = path.basename(ctx.request.body.files.image.path) // 文件名
  console.log(filename)
  ctx.body = {
    url: '/uploads/' + filename
  }
}

module.exports = {
  submit
}
