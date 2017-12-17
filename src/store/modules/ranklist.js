import * as types from '../types'
import api from '../../api.js'

const state = {
  ranklist: [],
  sumRank: 0
}

// getters
const getters = {
  ranklist: state => state.ranklist,
  sumRank: state => state.sumRank
}

// mutations
const mutations = {
  [types.UPDATE_RANKLIST]: (state, payload) => {
    state.ranklist = payload
  },
  [types.UPDATE_SUM_RANKLIST]: (state, payload) => {
    state.sumRank = payload
  }
}

// actions
const actions = {
  updateRanklist ({ commit }, payload) {
    return api.getRanklist(payload).then(({ data }) => {
      commit(types.UPDATE_RANKLIST, data.list)
      commit(types.UPDATE_SUM_RANKLIST, data.count)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
