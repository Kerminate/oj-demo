import * as types from '../types'
import api from '../../api.js'

const state = {
  contestList: [],
  sumContest: 0
}

// getters
const getters = {
  contestList: state => state.contestList,
  sumContest: state => state.sumContest
}

// mutations
const mutations = {
  [types.UPDATE_CONTEST_LIST]: (state, payload) => {
    state.contestList = payload
  },
  [types.UPDATE_SUM_CONTEST]: (state, payload) => {
    state.sumContest = payload
  }
}

// actions
const actions = {
  updateContestList ({ commit }, payload) {
    return api.getContestList(payload).then(({ data }) => {
      commit(types.UPDATE_CONTEST_LIST, data.res.docs)
      commit(types.UPDATE_SUM_CONTEST, data.total)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
