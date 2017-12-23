const path = require('path')

const submit = (ctx) => {
  const filename = path.basename(ctx.request.body.files.image.path)
  ctx.body = '/uploads/' + filename
}

module.exports = {
  submit
}
