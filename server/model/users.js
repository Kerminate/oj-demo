const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  password: String,
  token: String,
  create_time: Date
})

module.exports = mongoose.model('User', userSchema)
