import * as types from '../types'
import api from '../../axios.js'

const state = {
  usersList: [],
  user: {},
  solved: [],
  unsolved: []
}

// getters
const getters = {
  usersList: state => state.usersList,
  user: state => state.user,
  solved: state => state.solved,
  unsolved: state => state.unsolved
}

// mutations
const mutations = {
  [types.UPDATE_USER]: (state, payload) => {
    state.user = payload
  },
  [types.UPDATE_USERS_LIST]: (state, payload) => {
    state.usersList = payload
  }
}

// actions
const actions = {
  updateUser ({ commit }, payload) {
    return api.getUserInfo(payload).then(({ data }) => {
      commit(types.UPDATE_USER, data)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
