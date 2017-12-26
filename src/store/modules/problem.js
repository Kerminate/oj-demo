import * as types from '../types'
import api from '../../api.js'

const store = {
  namespaced: true,
  state: {
    problemList: [],
    problem: {},
    sumProblem: 0
  },
  getters: {
    problemList: state => state.problemList,
    problem: state => state.problem,
    sumProblem: state => state.sumProblem
  },
  mutations: {
    [types.GET_PROBLEM]: (state, payload) => {
      state.problem = payload
    },
    [types.GET_PROBLEM_LIST]: (state, payload) => {
      state.problemList = payload
    },
    [types.GET_SUM_PROBLEM]: (state, payload) => {
      state.sumProblem = payload
    },
    [types.UPDATE_PROBLEM]: (state, payload) => {
      state.problem = payload
    }
  },
  actions: {
    getProblem ({ commit }, payload) {
      return api.problem.findOne(payload).then(({ data }) => {
        commit(types.GET_PROBLEM, data)
        return data
      })
    },
    getProblemList ({ commit }, payload) {
      return api.problem.find(payload).then(({ data }) => {
        commit(types.GET_PROBLEM_LIST, data.res.docs)
        commit(types.GET_SUM_PROBLEM, data.res.total)
      })
    }
  }
}

export default store
