<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TicTacToeBoard from '@/components/games/TicTacToeBoard.vue'

const store = useStore()
const games = computed(() => store.state.games)
const results = computed(() => store.state.tictactoe.resultsByPlayer)

const selectGame = game => {
  if (game.isActive || !game.isAvailable) return
  console.info('>>> Set up game selection after new games are implemented.')
}
</script>

<template>
  <div class="c-game-area">
    <div class="container">
      <h3>Tic tac toe games</h3>
      <p>Welcome to the best game in the world.</p>
      <div class="games-selector">
        <button
          v-for="game of games"
          :key="game.name"
          :disabled="!game.isAvailable"
          :class="{ 'active': game.isActive }"
          @click.prevent="selectGame(game)"
        >
          {{ game.name }}
        </button>
      </div>
      <div class="game-board">
        <TicTacToeBoard />
        <div class="game-score" id="player-1">
          <h3>Player 1</h3>
          <span>{{ results?.x || 0 }}</span>
        </div>
        <div id="match-timer">00:00:00</div>
        <div class="game-score" id="player-2">
          <h3>Player 2</h3>
          <span>{{ results?.o || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-game-area {
  background-color: $clr-grey-light;
  padding: 30px 0;

  .container {
    h3 {
      text-align: center;
    }

    p {
      font-size: 16px;
      text-align: center;
    }

    .games-selector {
      display: flex;
      justify-content: center;
      margin: 30px 0;

      button {
        background-color: $clr-white;
        color: $clr-grey-dark;
        cursor: pointer;
        font-size: 16px;
        padding: 8px 16px;

        &.active {
          background-color: $clr-grey-dark;
          color: $clr-white;
        }

        &:disabled {
          cursor: no-drop;
        }

        &:first-child {
          border-radius: 4px 0 0 4px;
        }

        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }
    }

    .game-board {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .game-score {
        text-align: center;

        @media only screen and (min-width: $breakpoint-md) {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 25%;
        }

        &#player-1 {
          @media only screen and (min-width: $breakpoint-md) {
            order: 1;
          }
        }

        &#player-2 {
          order: 3
        }

        span {
          font-size: 40px;

          @media only screen and (min-width: $breakpoint-md) {
            font-size: 80px;
          }
        }
      }

      #match-timer {
        font-size: 20px;

        @media only screen and (min-width: $breakpoint-md) {
          flex-grow: 1;
          font-size: 30px;
          margin-top: 20px;
          order: 4;
          text-align: center;
          width: 100%;
        }
      }

      ::v-deep {
        .c-tic-tac-toe {
          flex-grow: 1;
          margin-bottom: 20px;
          text-align: center;
          width: 100%;

          @media only screen and (min-width: $breakpoint-md) {
            flex-grow: 0;
            order: 2;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
