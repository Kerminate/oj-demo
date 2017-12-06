import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'
// import * as getters from './getters'
import session from './modules/session'

Vue.use(Vuex)

// 初始化时用sessionStorage.getItem('token')，这样子刷新页面就无需重新登录
const state = {
  info: ''
}

export default new Vuex.Store({
  state,
  modules: {
    session
  }
})
