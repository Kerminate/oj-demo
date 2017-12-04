const mongoose = require('mongoose')
const db = require('../config/db.js')

const userSchema = db.Schema({
  username: String,
  nickname: String,
  password: String,
  token: String,
  create_time: Date
})

module.exports = mongoose.model('User', userSchema)
