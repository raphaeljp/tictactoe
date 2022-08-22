import { checkForEndGame, checkForMatchWinner, defineBoard, setUpGame } from '@/utils/tictactoe/game-setup'

describe('game-setup.js', () => {
  it('Should return a 3x3 board', () => {
    const expectedBoard = [
      ['','',''],
      ['','',''],
      ['','','']
    ]
    const board = defineBoard(3)

    expect(expectedBoard).toEqual(board)
  })

  it('Should return match win conditions according to the a 3x3 board', () => {
    const expectedWinConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    const matchWinConditions = setUpGame(3)

    expect(expectedWinConditions).toEqual(matchWinConditions)
  })

  it('Should return a 5x5 board', () => {
    const expectedBoard = [
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
    ]
    const board = defineBoard(5)

    expect(expectedBoard).toEqual(board)
  })

  it('Should return match win conditions according to the a 5x5 board', () => {
    const expectedWinConditions = [
      [0,1,2,3,4],
      [5,6,7,8,9],
      [10,11,12,13,14],
      [15,16,17,18,19],
      [20,21,22,23,24],
      [0,5,10,15,20],
      [1,6,11,16,21],
      [2,7,12,17,22],
      [3,8,13,18,23],
      [4,9,14,19,24],
      [0,6,12,18,24],
      [4,8,12,16,20],
    ]
    const matchWinConditions = setUpGame(5)

    expect(expectedWinConditions).toEqual(matchWinConditions)
  })

  it('Should return a 7x7 board', () => {
    const expectedBoard = [
      ['','','','','','',''],
      ['','','','','','',''],
      ['','','','','','',''],
      ['','','','','','',''],
      ['','','','','','',''],
      ['','','','','','',''],
      ['','','','','','',''],
    ]
    const board = defineBoard(7)

    expect(expectedBoard).toEqual(board)
  })

  it('Should return match win conditions according to the a 7x7 board', () => {
    const expectedWinConditions = [
      [0,1,2,3,4,5,6],
      [7,8,9,10,11,12,13],
      [14,15,16,17,18,19,20],
      [21,22,23,24,25,26,27],
      [28,29,30,31,32,33,34],
      [35,36,37,38,39,40,41],
      [42,43,44,45,46,47,48],
      [0,7,14,21,28,35,42],
      [1,8,15,22,29,36,43],
      [2,9,16,23,30,37,44],
      [3,10,17,24,31,38,45],
      [4,11,18,25,32,39,46],
      [5,12,19,26,33,40,47],
      [6,13,20,27,34,41,48],
      [0,8,16,24,32,40,48],
      [6,12,18,24,30,36,42]
    ]
    const matchWinConditions = setUpGame(7)

    expect(expectedWinConditions).toEqual(matchWinConditions)
  })

  it('Should declare a match winner with an horizontal line', () => {
    const expectedResult = 'x'

    const board = ['x', 'x', 'x', 'o', 'x', 'o', 'x', 'o', 'o']
    const player = 'x'
    const conditions = setUpGame(3)
    const result = checkForMatchWinner(board, player, conditions)

    expect(expectedResult).toEqual(result)
  })

  it('Should declare a match winner with an vertical line', () => {
    const expectedResult = 'x'

    const board = ['x', 'x', 'o', 'x', 'o', 'x', 'x', 'o', 'o']
    const player = 'x'
    const conditions = setUpGame(3)
    const result = checkForMatchWinner(board, player, conditions)

    expect(expectedResult).toEqual(result)
  })

  it('Should declare a match winner with an diagonal line', () => {
    const expectedResult = 'x'

    const board = ['x', 'o', 'x', 'o', 'x', 'x', 'o', 'o', 'x']
    const player = 'x'
    const conditions = setUpGame(3)
    const result = checkForMatchWinner(board, player, conditions)

    expect(expectedResult).toEqual(result)
  })

  it('Should declare the match a tie', () => {
    const expectedResult = 'draw'

    const board = ['o', 'x', 'o', 'o', 'x', 'x', 'x', 'o', 'o']
    const player = 'o'
    const conditions = setUpGame(3)
    const result = checkForMatchWinner(board, player, conditions)

    expect(expectedResult).toEqual(result)
  })

  it('Should declare a game winner after 3 matches won by the same player', () => {
    const expectedResult = 'x'

    const matches = ['x', 'o', 'x', 'x']
    const maxMatches = 5
    const matchesToWin = 3
    const resultsByPlayer = { x: 3, o: 1 }
    const result = checkForEndGame(matches, maxMatches, matchesToWin, resultsByPlayer)

    expect(expectedResult).toEqual(result)
  })

  it('Should declare the game a tie after 5 matches and no player with 3 wins', () => {
    const expectedResult = 'draw'

    const matches = ['x', 'draw', 'draw', 'o', 'draw']
    const maxMatches = 5
    const matchesToWin = 3
    const resultsByPlayer = { x: 1, o: 1, draw: 3 }
    const result = checkForEndGame(matches, maxMatches, matchesToWin, resultsByPlayer)

    expect(expectedResult).toEqual(result)
  })
})