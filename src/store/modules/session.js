import * as types from '../types'
import api from '../../axios.js'

// 初始化时用sessionStorage.getItem('token')，这样子刷新页面就无需重新登录
const state = {
  token: window.sessionStorage.getItem('token'),
  username: window.sessionStorage.getItem('username'),
  loginDialog: false,
  registerDialog: false
}

// getters
const getters = {
  username: state => state.username,
  token: state => state.token,
  loginDialog: state => state.loginDialog,
  registerDialog: state => state.registerDialog
}

// mutations
const mutations = {
  [types.LOGIN]: (state, payload) => {
    // 更改token的值
    state.token = payload
    window.sessionStorage.setItem('token', payload)
  },
  [types.LOGOUT]: (state) => {
    // 登出的时候要清除token
    state.token = null
    state.username = null
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('username')
  },
  [types.USERNAME]: (state, payload) => {
    // 把用户名存起来
    state.username = payload
    window.sessionStorage.setItem('username', payload)
  },
  [types.SHOW_LOGIN]: (state) => {
    state.loginDialog = !state.loginDialog
  },
  [types.SHOW_REGISTER]: (state) => {
    state.registerDialog = !state.registerDialog
  }
}

// actions
const actions = {
  UserLogin ({ commit }, opt) {
    return api.userLogin(opt).then(({ data }) => { // 解构赋值拿到data
      if (data.success) {
        let token = data.token
        let username = data.username
        commit(types.LOGIN, token)
        commit(types.USERNAME, username)
        commit(types.SHOW_LOGIN)
      }
      return data
    }).catch(err => {
      console.log(err)
    })
  },
  // UserLogout 和 UserName 应该放到 mutations 中，因为它们是明显的同步操作
  UserRegister ({ commit }, payload) {
    return api.userRegister(payload).then(({ data }) => {
      if (data.success) {
        commit(types.SHOW_REGISTER)
      }
      return data
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
