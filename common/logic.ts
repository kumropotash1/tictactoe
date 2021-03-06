import { Level, Mode, winConditions } from './types/const'
import { Grid, Turn } from './types/types'

export const findWinCondition = (grid: Grid, turn: Turn) => {
  const player = turn === 'first' ? 1 : 2

  const winWays = winConditions.length
  for (let i = 0; i < winWays; i++) {
    const winCondition = winConditions[i]
    for (let j = 0; j < 3; j++) {
      if (grid[winCondition[j]] === player) {
        if (j === 2) {
          console.debug('findWinCondition', `win condition ${winCondition}`)
          return true
        }
        continue
      }
      break
    }
  }
}

const isWinning = (grid: Grid, turn: Turn): boolean => {
  const player = turn === 'first' ? 1 : 2

  for (const condition of winConditions) {
    let isWinning = true
    for (const index of condition) {
      if (grid[index] !== player) {
        isWinning = false
        break
      }
    }

    if (isWinning) {
      return true
    }
  }
  return false
}

export const minimax = (grid: Grid, turn: Turn, depth: number, mode: Mode): number => {
  const player = turn === 'first' ? 1 : 2
  
  if (isWinning(grid, turn)) {
    return mode * (10 - depth)
  }

  const movesLeft = grid.some(val => val === 0)
  if (!movesLeft) {
    return 0
  }

  const opponent = player === 1 ? 2 : 1

  const opponentTurn: Turn = turn === 'first' ? 'second' : 'first'

  if (mode === Mode.MAX) {
    let bestScore = Infinity
    for (let i = 0; i < 9; i++) {
      if (!grid[i]) {
        grid[i] = opponent
        bestScore = Math.min(minimax(grid, opponentTurn, depth, Mode.MIN), bestScore)
        grid[i] = 0
      }
    }
    return bestScore
  } else {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!grid[i]) {
        grid[i] = opponent
        bestScore = Math.max(minimax(grid, opponentTurn, depth + 1, Mode.MAX), bestScore)
        grid[i] = 0
      }
    }

    return bestScore
  }
}

export const findNextMove = (grid: Grid, turn: Turn, level: Level): number => {
  // 3 levels:
  // 0 -> Doesn't try to defend, doesn't try to win. a noob. Returns a random value
  // 1 -> Actively defends by blocking the opponent. Checks how a defeat can be avoided
  // 2 -> Tries to win. Defends, and tries to find the best move

  // const availableOptions = findAvailableOptions(grid)
  // let corners = [0, 2, 6, 8]

  // const move = grid.filter(el => el).length + 1

  // switch (level) {
  //   case levels.LOW:
  //     switch (move) {
  //       case 0: return Math.floor(Math.random() * 9)
  //       default:
  //         return availableOptions[Math.floor(Math.random() * availableOptions.length)]
  //     }

  //   case levels.MEDIUM:

  //     if (move > 4) {
  //       const placesToDefend = findOpponentWinningMoves(grid, player)
  //       if (placesToDefend.length) {
  //         return placesToDefend[Math.floor(Math.random() * placesToDefend.length)]
  //       }
  //     }
  //     return availableOptions[Math.floor(Math.random() * availableOptions.length)]

  //   case levels.HIGH:
  //     if (!grid[4]) return 4

  //     if (move > 1) {
  //       const winningMoves = findSelfWinningMoves(grid, player);
  //       if(winningMoves.length) {
  //         return winningMoves[Math.floor(Math.random() * winningMoves.length)]
  //       }
  //       const placesToDefend = findOpponentWinningMoves(grid, player)
  //       if (placesToDefend.length) {
  //         return placesToDefend[Math.floor(Math.random() * placesToDefend.length)]
  //       }
  //     }

  //     corners = corners.filter(place => !grid[place])
  //     if (corners.length) {
  //       return corners[Math.floor(Math.random() * corners.length)]
  //     }
  //     return availableOptions[Math.floor(Math.random() * availableOptions.length)]

  //   default: throw new Error('Unexpected value for level')
  // }

  const player = turn === 'first' ? 1 : 2

  let bestScore = -Infinity
  let bestMove = 0
  for (let i = 0; i < 9; i++) {
    if (!grid[i]) {
      grid[i] = player
      const score = minimax(grid, turn, 0, Mode.MAX)
      // console.debug("I:", i, ", Score:", score)
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
      grid[i] = 0
    }
  }

  return bestMove
}
