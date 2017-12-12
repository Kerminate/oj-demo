import * as types from '../types'
import api from '../../axios.js'

const state = {
  problemList: [],
  problem: {},
  sumProblem: 0
}

// getters
const getters = {
  problemList: state => state.problemList,
  problem: state => state.problem,
  sumProblem: state => state.sumProblem
}

// mutations
const mutations = {
  [types.UPDATE_PROBLEM]: (state, payload) => {
    state.problem = payload
  },
  [types.UPDATE_PROBLEM_LIST]: (state, payload) => {
    state.problemList = payload
  },
  [types.UPDATE_SUMPROBLEM]: (state, payload) => {
    state.sumProblem = payload
  }
}

// actions
const actions = {
  updateProblem ({ commit }, payload) {
    return api.getProblemInfo(payload).then(({ data }) => {
      commit(types.UPDATE_PROBLEM, data)
    })
  },
  updateProblemList ({ commit }, payload) {
    return api.getProblems(payload).then(({ data }) => {
      commit(types.UPDATE_PROBLEM_LIST, data.list)
      commit(types.UPDATE_SUMPROBLEM, data.count)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
