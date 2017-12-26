import * as types from '../types'
import api from '../../api.js'

const store = {
  namespaced: true,
  state: {
    ranklist: [],
    sumRank: 0
  },
  getters: {
    ranklist: state => state.ranklist,
    sumRank: state => state.sumRank
  },
  mutations: {
    [types.UPDATE_RANKLIST]: (state, payload) => {
      state.ranklist = payload
    },
    [types.UPDATE_SUM_RANKLIST]: (state, payload) => {
      state.sumRank = payload
    }
  },
  actions: {
    updateRanklist ({ commit }, payload) {
      return api.getRanklist(payload).then(({ data }) => {
        commit(types.UPDATE_RANKLIST, data.res.docs)
        commit(types.UPDATE_SUM_RANKLIST, data.res.total)
      })
    }
  }
}

export default store
