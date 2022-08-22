<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { setUpGame, checkForMatchWinner, defineBoard } from '@/utils/tictactoe/game-setup.js'
import { resetTimer, startTimer, stopTimer } from '@/utils/tictactoe/timer.js'
import Dialog from '@/components/Dialog.vue'

const store = useStore()
const board = ref([])
const startingPlayer = ref(null)
const currentPlayer = ref(null)
const matchWinner = ref(null)
const gameWinner = computed(() => store.state.tictactoe.gameWinner)
const showDialog = ref(false)

const performPlay = (x, y) => {
  if (board.value[x][y] !== '') return
  if (board.value.flat().every(square => square === '')) {
    startTimer('match-timer', 'match')

    if (store.state.tictactoe.matchesResults.length === 0) store.dispatch('tictactoe/updateGameTimerStatus', 'started')
  }

  board.value[x][y] = currentPlayer.value

  const hasWinner = checkForMatchWinner(board.value.flat(), currentPlayer.value)
  if (hasWinner) {
    stopTimer('match')
    matchWinner.value = hasWinner
    showDialog.value = true
    startingPlayer.value = startingPlayer.value === 'x' ? 'o' : 'x'
    currentPlayer.value = startingPlayer.value
    store.dispatch('tictactoe/updateMatchesResults', hasWinner)
  } else {
    currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
  }
}

const resetBoard = () => {
  showDialog.value = false
  board.value = defineBoard()
  matchWinner.value = null
  resetTimer('match-timer')
}

const parsePlayerName = player => {
  return player === 'x' ? 'Player 1' : 'Player 2'
}

const goToStatistics = () => {
  showDialog.value = false
  document.getElementById('c-statistics').scrollIntoView({ behavior: 'smooth' })
}

onBeforeMount(() => {
  const matchWinConditions = setUpGame()
  store.dispatch('tictactoe/setMatchWinConditions', matchWinConditions)
  startingPlayer.value = Math.round(Math.random()) === 0 ? 'x' : 'o'
  currentPlayer.value = startingPlayer.value
  board.value = defineBoard()
})
</script>

<template>
  <div class="c-tic-tac-toe">
    <div class="game-board">
      <p>Player {{ currentPlayer === 'x' ? 1 : 2 }}'s turn.</p>

      <div v-for="(row, x) of board" :key="x" :class="['board-rows', { 'no-border-bottom': x === (board.length - 1) }]">
        <button v-for="(column, y) of row" :key="y" @click.prevent="performPlay(x, y)" :class="`point-${column}`" :disabled="matchWinner" />
      </div>
    </div>

    <Dialog v-if="showDialog" @close="gameWinner ? showDialog = false : resetBoard()">
      <template #dialog-body>
        <img v-if="!gameWinner && matchWinner !== 'draw'" :src="require(`@/assets/images/icon-${matchWinner}.svg`)" alt="Match Winner Icon" />
        <img v-if="gameWinner && gameWinner !== 'draw'" :src="require('@/assets/images/icon-winner.svg')" alt="Game Winner Icon" />
        <img v-if="gameWinner === 'draw' || matchWinner === 'draw'" :src="require('@/assets/images/icon-draw.svg')" alt="Game Draw Icon" />

        <p v-if="matchWinner === 'draw' || gameWinner === 'draw'">The {{ gameWinner ? 'game' : 'match' }} ended up as a tie!</p>
        <p v-else>
          The winner of the {{ gameWinner ? 'game' : 'match' }} is: <br />
          <strong>{{ gameWinner ? parsePlayerName(gameWinner) : parsePlayerName(matchWinner) }}</strong>
        </p>

        <button v-if="!gameWinner" @click="resetBoard()">Reset board and play next match!</button>
        <button v-else @click="goToStatistics()">Take me to the game statistics!</button>
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
.c-tic-tac-toe {
  .game-board {
    p {
      margin-bottom: 20px;
    }

    .board-rows {
      &:not(:first-child) {
        margin-top: -2px;
      }

      &.no-border-bottom {
        button {
          border-bottom: none;
        }
      }

      button {
        border-bottom: solid 2px $clr-grey-dark;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 30px;
        height: 60px;
        margin: 0;
        width: 60px;

        &:not(:first-child) {
          border-left: solid 2px $clr-grey-dark
        }

        &.point-x {
          background-image: url('@/assets/images/icon-x.svg');
        }

        &.point-o {
          background-image: url('@/assets/images/icon-o.svg');
        }
      }
    }
  }

  ::v-deep .c-dialog {
    .dialog-content {
      padding: 30px;

      img {
        margin-bottom: 30px;
        width: 100px;
      }

      p {
        font-size: 30px;
      }

      button {
        background-color: $clr-btn-secondary;
        border-radius: 4px;
        color: $clr-white;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        margin-top: 30px;
        padding: 12px;
        transition: all ease 0.3s;
        width: 100%;

        &:hover {
          filter: brightness(90%);
        }
      }
    }
  }
}
</style>
