import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'
// import * as getters from './getters'
import session from './modules/session'
import problem from './modules/problem'
import news from './modules/news'
import solution from './modules/solution'
import user from './modules/user'
import statistics from './modules/statistics'

Vue.use(Vuex)

// 初始化时用sessionStorage.getItem('token')，这样子刷新页面就无需重新登录
const state = {
  info: ''
}

export default new Vuex.Store({
  state,
  modules: {
    session,
    problem,
    news,
    solution,
    user,
    statistics
  }
})
