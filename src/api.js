import axios from 'axios'
// import store from './store'
// import router from './router'

// 设置全局axios默认值
axios.defaults.timeout = 5000 // 5000ms的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 创建一个axios实例
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

// request拦截器
// instance.interceptors.request.use(
//   config => {
//     // 每次发送请求之前检测,若vuex存有 token,那么都要放在请求头发送给服务器
//     if (store.state.token) {
//       config.headers.Authorization = `token ${store.state.token}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

// response拦截器
// instance.interceptors.response.use(
//   response => response,
//   // 默认除了2XX之外的都是错误的，就会走这里
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           store.dispatch('UserLogout') // 可能是token过期，清除它
//           router.replace({
//             // 跳转到题目页面
//             path: 'Problem',
//             query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//     }
//     return Promise.reject(error.response)
//   }
// )

export default {
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
  // 更新题目
  updateProblem (data) {
    return instance.put(`/problem/${data.pid}`, data)
  }
}