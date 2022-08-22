import { computed } from 'vue'
import store from '@/store'

const boardSize = computed(() => store.state.tictactoe.settings.boardSize)
const matchWinConditions = computed(() => store.state.tictactoe.settings.matchWinConditions)

const defineHorizontalWinConditions = (size) => {
  const values = [...Array(size * size).keys()]
  const horizontalCombos = []

  for (let i = 0; i < values.length; i += size) {
    horizontalCombos.push(values.slice(i, i + size))
  }

  return horizontalCombos
}

const defineVerticalWinConditions = (size) => {
  const verticalCombos = []

  for (let y = 0; y < size; y++) {
    verticalCombos[y] = []

    for (let x = 0; x < size; x++) {
      verticalCombos[y][x] = (x * size) + y
    }
  }

  return verticalCombos
}

const defineDiagonalWinConditions = (size) => {
  const leftToRight = () => {
    const ltrCombo = []
    for(let i = 0; i < size; i++) {
      ltrCombo.push(i === 0 ? 0 : i + (size * i))
    }
    return ltrCombo
  }

  const rightToLeft = () => {
    const rtlCombo = []
    for(let i = 1; i <= size; i++) {
      rtlCombo.push((size * i) - i)
    }
    return rtlCombo
  }

  return [leftToRight(), rightToLeft()]
}

export const setUpGame = (size = boardSize.value) => {
  if (!size || typeof size !== 'number' || size < 3 || (size % 2 !== 1))
    throw new Error('The boardSize needs to be an odd number greater than 3')

  return [...defineHorizontalWinConditions(size), ...defineVerticalWinConditions(size), ...defineDiagonalWinConditions(size)]
}

export const defineBoard = (size = boardSize.value) => {
  const board = []

  for (let x = 0; x < size; x++) {
    board[x] = []

    for (let y = 0; y < size; y++) {
      board[x][y] = ''
    }
  }

  return board
}

export const checkForMatchWinner = (board, player, conditions = matchWinConditions.value) => {
  for (let condition of conditions) {
    const results = []
    for (let i = 0; i < boardSize.value; i++) {
      results.push(board[condition[i]] === player)
    }

    if (results.every(Boolean)) {
      return player
    }
  }

  if (board.every(square => square !== '')) return 'draw'

  return null
}

export const checkForEndGame = (matches, maxMatches, matchesToWin, resultsByPlayer) => {
  const { x, o } = resultsByPlayer

  if (x === matchesToWin) {
    return 'x'
  } else if (o === matchesToWin) {
    return 'o'
  } else if (matches.length === maxMatches && x < matchesToWin && o < matchesToWin) {
    return 'draw'
  }

  return null
}
