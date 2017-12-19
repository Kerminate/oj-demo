import axios from 'axios'
import Vue from 'vue'
// import store from './store'
// import router from './router'

// 设置全局axios默认值
axios.defaults.timeout = 5000 // 5000ms的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 创建一个axios实例
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

const api = {
  // 用户注册
  userRegister (data) {
    return instance.post('/user/register', data)
  },
  // 获取用户信息
  getUserInfo (data) {
    return instance.get(`/user/${data.uid}`, { params: data })
  },
  // 用户登录
  userLogin (data) {
    return instance.post('/session/login', data)
  },
  // 获取用户
  // getUser () {
  //   return instance.get('/session/info')
  // },
  // 删除用户
  // delUser (data) {
  //   return instance.post('/session/delUser', data)
  // },
  // 获取题目列表
  getProblems (data) {
    return instance.get('/problem/list', { params: data })
  },
  // 获取题目信息
  getProblemInfo (data) {
    return instance.get(`/problem/${data.pid}`, { params: data })
  },
  // 获取消息列表
  getNews (data) {
    return instance.get('/news/list', { params: data })
  },
  // 获取消息内容
  getNewInfo (data) {
    return instance.get(`/news/${data.pid}`, { params: data })
  },
  // 获取提交列表
  getSolutions (data) {
    return instance.get('/status/list', { params: data })
  },
  // 获取题目提交信息
  getStatistics (data) {
    return instance.get(`/statistics/${data.pid}`, { params: data })
  },
  // 获取排名列表
  getRanklist (data) {
    return instance.get('/ranklist/list', { params: data })
  },
  // 增加题目
  addProblem (data) {
    return instance.post('/problem/', data)
  },
  // 获取竞赛列表信息
  getContestList (data) {
    return instance.get('/contest/list', { params: data })
  },
  // 获取竞赛信息
  getContestInfo (data) {
    return instance.get(`/contest/${data.cid}`, { params: data })
  },
  // 更新题目
  updateProblem (data) {
    return instance.put(`/problem/${data.pid}`, data)
  }
}

// 对异常的基本处理
Object.entries(api).forEach(([key, value]) => {
  api[key] = function (...args) { // 闭包给原函数捕获异常
    return value(...args)
      .catch((err) => {
        if (err.response && err.response.status >= 500) {
          Vue.prototype.$message({
            message: `Σ(;ﾟдﾟ)  服务器崩坏，需要联系管理员维修`,
            duration: 10000,
            type: 'error',
            showClose: true
          })
        } else if (err.response && err.response.status === 403) {
          Vue.prototype.$message({
            message: `╮(╯_╰)╭ 你没有相关权限进行此操作`,
            duration: 10000,
            type: 'warning',
            showClose: true
          })
        } else if (err.response && err.response.status === 401) {
          Vue.prototype.$message({
            message: `(〃∀〃) 请先登录`,
            duration: 10000,
            showClose: true
          })
        } else if (err.response && err.response.status === 400) {
          Vue.prototype.$message({
            message: `${err.response.data.error}`,
            duration: 10000,
            showClose: true,
            type: 'error'
          })
        } else if (!err.response) {
          Vue.prototype.$message({
            message: `_(:з」∠)_  网络异常，检查你的网线`,
            duration: 10000,
            type: 'error',
            showClose: true
          })
        }
      })
  }
})

export default api
