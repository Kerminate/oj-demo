import * as types from '../types'
import api from '../../axios.js'

const state = {
  solutionList: [],
  solution: {}
}

// getters
const getters = {
  solutionList: state => state.solutionList,
  solution: state => state.solution
}

// mutations
const mutations = {
  [types.UPDATE_SOLUTION_LIST]: (state, payload) => {
    state.solutionList = payload
  }
}

// actions
const actions = {
  updateSolutionList ({ commit }, payload) {
    return api.getSolutions(payload).then(({ data }) => {
      commit(types.UPDATE_SOLUTION_LIST, data.list)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
