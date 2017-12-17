import * as types from '../types'
import api from '../../api.js'

const state = {
  solutionList: [],
  solution: {},
  sumSolutions: 0,
  codeDialog: false
}

// getters
const getters = {
  solutionList: state => state.solutionList,
  solution: state => state.solution,
  sumSolutions: state => state.sumSolutions,
  codeDialog: state => state.codeDialog
}

// mutations
const mutations = {
  [types.UPDATE_SOLUTION_LIST]: (state, payload) => {
    state.solutionList = payload
  },
  [types.UPDATE_SUM_SOLUTIONS]: (state, payload) => {
    state.sumSolutions = payload
  },
  [types.SHOW_CODE]: (state, payload) => {
    state.codeDialog = true
    state.solution = payload
  },
  [types.CLOSE_CODE]: (state) => {
    state.codeDialog = false
  }
}

// actions
const actions = {
  updateSolutionList ({ commit }, payload) {
    return api.getSolutions(payload).then(({ data }) => {
      commit(types.UPDATE_SOLUTION_LIST, data.res.docs)
      commit(types.UPDATE_SUM_SOLUTIONS, data.res.total)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
