import * as types from '../types'
import api from '../../api.js'

// 初始化时用sessionStorage.getItem('token')，这样子刷新页面就无需重新登录
const state = {
  token: window.sessionStorage.getItem('token'),
  uid: window.sessionStorage.getItem('uid'),
  loginDialog: false
}

// getters
const getters = {
  uid: state => state.uid,
  token: state => state.token,
  loginDialog: state => state.loginDialog
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
    state.uid = null
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('uid')
  },
  [types.UID]: (state, payload) => {
    // 把用户名存起来
    state.uid = payload
    window.sessionStorage.setItem('uid', payload)
  },
  [types.SHOW_LOGIN]: (state) => {
    state.loginDialog = !state.loginDialog
  }
}

// actions
const actions = {
  UserLogin ({ commit }, opt) {
    return api.userLogin(opt).then(({ data }) => { // 解构赋值拿到data
      if (data.success) {
        let token = data.token
        let uid = data.uid
        commit(types.LOGIN, token)
        commit(types.UID, uid)
        commit(types.SHOW_LOGIN)
      }
      return data
    }).catch(err => {
      console.log(err)
    })
  }
  // UserLogout 和 uid 应该放到 mutations 中，因为它们是明显的同步操作
}

export default {
  state,
  getters,
  actions,
  mutations
}
