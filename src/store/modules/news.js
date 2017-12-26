import * as types from '../types'
import api from '../../api.js'

const store = {
  namespaced: true,
  state: {
    newsList: [],
    news: {}
  },
  getters: {
    newsList: state => state.newsList,
    news: state => state.news
  },
  mutations: {
    [types.UPDATE_NEWS]: (state, payload) => {
      state.news = payload
    },
    [types.UPDATE_NEW_LIST]: (state, payload) => {
      state.newsList = payload
    }
  },
  actions: {
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
}

export default store
