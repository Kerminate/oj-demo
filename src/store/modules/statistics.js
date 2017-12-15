import * as types from '../types.js'
import api from '../../axios.js'
import { statisTableObj } from '../../util/constant.js'

const state = {
  statisticsList: [],
  countList: [],
  sumCharts: 0,
  statisTable: [],
  sumStatis: 0
}

// getters
const getters = {
  statisticsList: state => state.statisticsList,
  countList: state => state.countList,
  sumCharts: state => state.sumCharts,
  statisTable: state => state.statisTable,
  sumStatis: state => state.sumStatis
}

// mutations
const mutations = {
  [types.UPDATE_STATISTICS_LIST]: (state, payload) => {
    state.statisticsList = payload
  },
  [types.UPDATE_COUNT_LIST]: (state, payload) => {
    state.countList = payload
  },
  [types.UPDATE_STATISTICS_TOTAL]: (state, payload) => {
    state.sumStatis = payload
  },
  [types.UPDATE_STATISTICS_CHARTS]: (state, payload) => {
    state.sumCharts = payload
  },
  [types.UPDATE_STATISTICS_TABLE]: (state, payload) => {
    let obj = {
      name: 'Total Submissions',
      num: payload.total
    }
    state.statisTable.push(obj)
    for (let i = 0; i < statisTableObj.length; i++) {
      let obk = {}
      obk.name = statisTableObj[i]
      obk.num = payload.counted[i]
      state.statisTable.push(obk)
    }
  }
}

// actions
const actions = {
  updateStatistics ({ commit }, payload) {
    return api.getStatistics(payload).then(({ data }) => {
      commit(types.UPDATE_STATISTICS_LIST, data.list)
      commit(types.UPDATE_COUNT_LIST, data.counted)
      commit(types.UPDATE_STATISTICS_CHARTS, data.total)
      commit(types.UPDATE_STATISTICS_TABLE, data)
      commit(types.UPDATE_STATISTICS_TOTAL, data.sum)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
