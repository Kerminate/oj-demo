import * as types from '../types'
import api from '../../api.js'

const store = {
  namespaced: true,
  state: {
    registerDialog: false,
    usersList: [],
    user: {},
    solved: [],
    unsolved: []
  },
  getters: {
    registerDialog: state => state.registerDialog,
    usersList: state => state.usersList,
    user: state => state.user,
    solved: state => state.solved,
    unsolved: state => state.unsolved
  },
  mutations: {
    [types.SHOW_REGISTER]: (state) => {
      state.registerDialog = !state.registerDialog
    },
    [types.UPDATE_USER]: (state, payload) => {
      state.user = payload
    },
    [types.UPDATE_USERS_LIST]: (state, payload) => {
      state.usersList = payload
    },
    [types.UPDATE_SOLVED]: (state, payload) => {
      state.solved = payload
    },
    [types.UPDATE_UNSOLVED]: (state, payload) => {
      state.unsolved = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      return api.register(payload).then(({ data }) => {
        if (data.success) {
          commit(types.SHOW_REGISTER)
        }
        return data
      })
    },
    updateUser ({ commit }, payload) {
      return api.getUserInfo(payload).then(({ data }) => {
        commit(types.UPDATE_USER, data.info)
        commit(types.UPDATE_SOLVED, data.solved)
        commit(types.UPDATE_UNSOLVED, data.unsolved)
        // console.log(data.info)
      })
    }
  }
}

export default store
