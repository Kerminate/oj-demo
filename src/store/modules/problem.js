import * as types from '../types'
import api from '../../axios.js'

const state = {
  problemList: [],
  problem: {}
}

// getters
const getters = {
  problemList: state => state.problemList,
  problem: state => state.problem
}

// mutations
const mutations = {
  [types.UPDATE_PROBLEM]: (state, payload) => {
    state.problem = payload
  },
  [types.UPDATE_PROBLEM_LIST]: (state, payload) => {
    state.problemList = payload
  }
}

// actions
const actions = {
  updateProblem ({ commit }, payload) {
    return api.getProblemInfo(payload).then(({ data }) => {
      commit(types.UPDATE_PROBLEM, data)
      console.log(data)
    })
  },
  updateProblemList ({ commit }, payload) {
    return api.getProblems(payload).then(({ data }) => {
      commit(types.UPDATE_PROBLEM_LIST, data)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
