import * as types from '../types'
import api from '../../api.js'

const state = {
  newsList: [],
  news: {}
}

// getters
const getters = {
  newsList: state => state.newsList,
  news: state => state.news
}

// mutations
const mutations = {
  [types.UPDATE_NEWS]: (state, payload) => {
    state.news = payload
  },
  [types.UPDATE_NEW_LIST]: (state, payload) => {
    state.newsList = payload
  }
}

// actions
const actions = {
  updateNew ({ commit }, payload) {
    return api.getNewInfo(payload).then(({ data }) => {
      commit(types.UPDATE_NEWS, data)
    })
  },
  updateNewsList ({ commit }, payload) {
    return api.getNews(payload).then(({ data }) => {
      commit(types.UPDATE_NEW_LIST, data)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
