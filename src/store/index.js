import { createStore } from 'vuex'
import tictactoeModule from './modules/tictactoe'

const state = () => {
  return {
    games: [
      {
        name: 'Tic tac toe',
        isAvailable: true,
        isActive: true
      },
      {
        name: 'Connect four',
        isAvailable: false,
        isActive: false,
      },
    ],
  }
}

const mutations = {}

const actions = {}

const getters = {}

const store = createStore({
  modules: {
    tictactoe: tictactoeModule
  },
  state,
  getters,
  actions,
  mutations
})

export default store
