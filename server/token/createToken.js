const jwt = require('jsonwebtoken')

module.exports = (userId) => {
  const token = jwt.sign({
    user_id: userId
  }, 'Kerminate', {
    expiresIn: '60s'
  })
  return token
}
