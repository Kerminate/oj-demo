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
  [types.LOGIN]: (state, data) => {
    // 更改token的值
    state.token = data
    window.sessionStorage.setItem('token', data)
  },
  [types.LOGOUT]: (state) => {
    // 登出的时候要清除token
    state.token = null
    state.username = null
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('username')
  },
  [types.USERNAME]: (state, data) => {
    // 把用户名存起来
    state.username = data
    window.sessionStorage.setItem('username', data)
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
    api.userLogin(opt)
      .then(({ data }) => { // 解构赋值拿到data
        // 账号不存在
        if (data.info === false) {
          // this.$message({
          //   type: 'info',
          //   message: '账号不存在'
          // })
          return false
        }
        // 账号存在
        if (data.success) {
          // this.$message({
          //   type: 'success',
          //   message: '登录成功'
          // })
          let token = data.token
          let username = data.username
          commit(types.LOGIN, token)
          commit(types.USERNAME, username)
          commit(types.SHOW_LOGIN)
          // this.$store.dispatch('UserLogin', token)
          // this.$store.dispatch('UserName', username)
        } else {
          // this.$message({
          //   type: 'info',
          //   message: '密码错误！'
          // })
        }
      })
  },
  // UserLogin ({ commit }, data) {
  //   commit(types.LOGIN, data)
  // },
  UserLogout ({ commit }) {
    commit(types.LOGOUT)
  },
  UserName ({ commit }, data) {
    commit(types.USERNAME, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
