<script setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { resetTimer, startTimer, stopTimer } from '@/utils/tictactoe/timer'

const store = useStore()
const gameTimerStatus = computed(() => store.state.tictactoe.settings.gameTimerStatus)
const maxMatches = computed(() => store.state.tictactoe.settings.maxMatches)
const matchesResults = computed(() => store.state.tictactoe.matchesResults)
const resultsByPlayer = computed(() => store.state.tictactoe.resultsByPlayer)

const victoryPercentages = computed(() => {
  const { x: xResults, o: oResults } = resultsByPlayer.value || {}

  const xPercent = xResults ? ((100 * xResults) / matchesResults.value.length) : 0
  const oPercent = oResults ? ((100 * oResults) / matchesResults.value.length) : 0

  return {
    x: { win: `${Math.ceil(xPercent)}%`, loss: `${Math.floor(oPercent)}%` },
    o: { win: `${Math.ceil(oPercent)}%`, loss: `${Math.floor(xPercent)}%` },
  }
})

const parsePlayerName = name => {
  if (name === 'x') return 'P1'
  else if (name === 'o') return 'P2'
  else if (name === 'draw') return 'D'

  return ''
}

watch(gameTimerStatus, () => {
  if (gameTimerStatus.value === 'started') startTimer('game-timer', 'game')
  else if (gameTimerStatus.value === 'stopped') stopTimer('game')
  else resetTimer('game-timer')
})
</script>

<template>
  <div class="c-statistics" id="c-statistics">
    <div class="container">
      <h3>Awesome Statistics</h3>
      <p>All statistics in one place!</p>

      <div class="statistics-block">
        <div class="game-victories">
          <h3>Game Victories %</h3>

          <div class="game-victories-block">
            <div class="game-victories-by-player">
              <p>Player 1</p>

              <div class="percentage-panels">
                <div class="panel">
                  <div class="value">{{ victoryPercentages.x.win }}</div>
                  V
                </div>
                <div class="panel">
                  <div class="value">{{ victoryPercentages.x.loss }}</div>
                  L
                </div>
              </div>
            </div>

            <div class="game-victories-by-player">
              <p>Player 2</p>

              <div class="percentage-panels">
                <div class="panel">
                  <div class="value">{{ victoryPercentages.o.win }}</div>
                  V
                </div>
                <div class="panel">
                  <div class="value">{{ victoryPercentages.o.loss }}</div>
                  L
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="game-history">
          <div class="matches-played">
            <h3>Played matches</h3>
            <div class="match-counter">
              <div v-for="(match, i) of maxMatches" :key="`mp-${match}`" :class="['round-pin', { 'filled': i < matchesResults.length }]"></div>
            </div>
          </div>

          <div class="matches-results">
            <h3>Game history</h3>

            <div class="matches-list">
              <div v-for="(match, i) of maxMatches" :key="`ml-${match}`" class="square-pin">{{ parsePlayerName(matchesResults[i]) }}</div>
            </div>
          </div>
        </div>

        <div class="match-timer">
          <h3>Total time</h3>
          <p id="game-timer">00:00:00</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.c-statistics {
  padding: 30px 0;
  text-align: center;

  .container {
    .statistics-block {
      @media only screen and (min-width: $breakpoint-md) {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }

      .game-victories {
        margin-top: 40px;

        .game-victories-block {
          display: flex;

          .game-victories-by-player {
            width: 50%;

            @media only screen and (min-width: $breakpoint-md) {
              &:not(:first-child) {
                margin-left: 50px;
              }
            }

            p {
              font-size: 20px;
              margin-bottom: 20px;

              @media only screen and (min-width: $breakpoint-md) {
                font-size: 30px;
              }
            }

            .percentage-panels {
              display: flex;
              justify-content: center;

              .panel {
                font-size: 20px;

                .value {
                  background-color: $clr-grey;
                  border-radius: 100%;
                  color: $clr-white;
                  height: 50px;
                  font-size: 16px;
                  font-weight: bold;
                  line-height: 50px;
                  margin-bottom: 8px;
                  text-align: center;
                  width: 50px;
                }

                &:not(:first-child) {
                  margin-left: 20px
                }
              }
            }
          }
        }
      }

      .game-history {
        margin-top: 40px;

        .match-counter {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;

          .round-pin {
            border: solid 2px $clr-grey;
            border-radius: 100%;
            height: 20px;
            width: 20px;

            &:not(:first-child) {
              margin-left: 4px;
            }

            &.filled {
              background-color: $clr-grey;
            }
          }
        }

        .matches-list {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;

          .square-pin {
            border: solid 2px $clr-grey;
            height: 30px;
            line-height: 30px;
            text-align: center;
            width: 30px;

            &:not(:first-child) {
              margin-left: 8px;
            }

            &.filled {
              background-color: $clr-grey;
            }
          }
        }
      }

      .match-timer {
        @media only screen and (min-width: $breakpoint-md) {
          flex-grow: 1;
          width: 100%;
        }

        p {
          @media only screen and (min-width: $breakpoint-md) {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
