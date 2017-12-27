import * as types from '../types'
import api from '../../api.js'

const store = {
  namespaced: true,
  state: {
    list: [],
    one: {},
    sum: 0
  },
  getters: {
    list: state => state.list,
    one: state => state.one,
    sum: state => state.sum
  },
  mutations: {
    [types.GET_PROBLEM]: (state, payload) => {
      state.one = payload
    },
    [types.GET_PROBLEM_LIST]: (state, payload) => {
      state.list = payload
    },
    [types.GET_SUM_PROBLEM]: (state, payload) => {
      state.sum = payload
    }
  },
  actions: {
    findOne ({ commit }, payload) {
      return api.problem.findOne(payload).then(({ data }) => {
        commit(types.GET_PROBLEM, data)
        return data
      })
    },
    find ({ commit }, payload) {
      return api.problem.find(payload).then(({ data }) => {
        commit(types.GET_PROBLEM_LIST, data.res.docs)
        commit(types.GET_SUM_PROBLEM, data.res.total)
      })
    }
  }
}

export default store
