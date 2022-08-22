import { checkForEndGame } from '@/utils/tictactoe/game-setup'

const state = () => ({
  settings: {
    boardSize: 3,
    matchesToWin: 3,
    matchWinConditions: [],
    maxMatches: 5,
    gameTimerStatus: null
  },
  matchesResults: [],
  resultsByPlayer: null,
  gameWinner: null
})

const mutations = {
  SET_MATCH_WIN_CONDITIONS(state, conditions) {
    state.settings.matchWinConditions = conditions
  },
  UPDATE_MATCHES_RESULTS(state, winner) {
    state.matchesResults.push(winner)
  },
  UPDATE_RESULTS_BY_PLAYER(state, results) {
    state.resultsByPlayer = results
  },
  UPDATE_GAME_WINNER(state, winner) {
    state.gameWinner = winner
  },
  UPDATE_GAME_TIMER_STATUS(state, status) {
    state.settings.gameTimerStatus = status
  }
}

const actions = {
  setMatchWinConditions({ commit }, conditions) {
    commit('SET_MATCH_WIN_CONDITIONS', conditions)
  },
  updateMatchesResults({ commit, dispatch, state }, winner) {
    commit('UPDATE_MATCHES_RESULTS', winner)

    const resultsByPlayer = state.matchesResults.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
    commit('UPDATE_RESULTS_BY_PLAYER', resultsByPlayer)

    const gameWinner = checkForEndGame(state.matchesResults, state.settings.maxMatches, state.settings.matchesToWin, state.resultsByPlayer)

    if (gameWinner) {
      commit('UPDATE_GAME_WINNER', gameWinner)
      dispatch('updateGameTimerStatus', 'stopped')
    }
  },
  updateGameTimerStatus({ commit }, status) {
    commit('UPDATE_GAME_TIMER_STATUS', status)
  }
}

const getters = {}

const tictactoeModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default tictactoeModule