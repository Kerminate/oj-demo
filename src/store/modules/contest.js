import * as types from '../types'
import api from '../../api.js'

const state = {
  contestList: [],
  sumContest: 0,
  contest: {},
  contestOverview: [],
  contestTotalPro: 0
}

// getters
const getters = {
  contestList: state => state.contestList,
  sumContest: state => state.sumContest,
  contest: state => state.contest,
  contestOverview: state => state.contestOverview,
  contestTotalPro: state => state.contestTotalPro
}

// mutations
const mutations = {
  [types.UPDATE_CONTEST_LIST]: (state, payload) => {
    state.contestList = payload
  },
  [types.UPDATE_SUM_CONTEST]: (state, payload) => {
    state.sumContest = payload
  },
  [types.GET_CONTEST]: (state, payload) => {
    state.contest = payload
  },
  [types.GET_CONTEST_OVERVIEW]: (state, payload) => {
    state.contestOverview = payload
  },
  [types.GET_CONTEST_TOTAL_PRO]: (state, payload) => {
    state.contestTotalPro = payload
  }
}

// actions
const actions = {
  updateContestList ({ commit }, payload) {
    return api.getContestList(payload).then(({ data }) => {
      commit(types.UPDATE_CONTEST_LIST, data.res.docs)
      commit(types.UPDATE_SUM_CONTEST, data.total)
    })
  },
  getContest ({ commit }, payload) {
    return api.getContestInfo(payload).then(({ data }) => {
      commit(types.GET_CONTEST, data.doc)
      commit(types.GET_CONTEST_OVERVIEW, data.res)
      commit(types.GET_CONTEST_TOTAL_PRO, data.total)
      console.log(data)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
