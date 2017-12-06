const mongoose = require('mongoose')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/oj-demo', {
  useMongoClient: true
})

mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})
