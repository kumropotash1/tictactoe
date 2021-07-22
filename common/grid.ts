import { minimax } from './logic'
import { Mode, winConditions } from './types/const'
import { Grid as GridType, GridValue, Turn } from './types/types'

export default class Grid {
  private grid: GridType
  private moves: number = 0

  public map: <U>(callbackfn: (value: GridValue, index: number, array: GridValue[]) => U, thisArg?: any) => U[];

  constructor () {
    this.grid = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]

    this.moves = 0

    // alias this.map with this.grid.map
    // This will give the developers read-only access to the grid
    this.map = this.grid.map.bind(this.grid)
  }

  public valueOf (index: number): GridValue {
    if (index > 8 || index < 0) {
      throw new RangeError('Expected a value between 0 and 8, received ' + index)
    }

    return this.grid[index]
  }

  public move (player: Turn, place: number) {
    if (this.grid[place]) {
      throw new Error('Trying to access a non-empty place')
    }

    this.grid[place] = player === 'first' ? 1 : 2
    this.moves++

    this.repaint()
  }

  public suggestMove (player: Turn) {
    let bestScore = -Infinity
    let bestMove = 0
    for (let i = 0; i < 9; i++) {
      if (!this.grid[i]) {
        this.grid[i] = player === 'first' ? 1 : 2
        const score = minimax(this.grid, player, 0, Mode.MAX)
        // logger.debug("I:", i, ", Score:", score)
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
        this.grid[i] = 0
      }
    }

    return bestMove
  }

  public isDrawn (): boolean {
    // TODO: Check no winner before returning true
    return this.moves === 9 // && !this.isVictory(Player.FIRST) && !this.isVictory(Player.SECOND) // TODO here
  }

  public isVictory (turn: Turn): boolean {
    const player = turn === 'first' ? 1 : 2
    
    for (const condition of winConditions) {
      let isWinning = true
      for (const index of condition) {
        if (this.grid[index] !== player) {
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

  private gridValueToString = {
    0: ' ',
    1: 'X',
    2: 'O'
  }

  public repaint () {
    // TODO: a lot
    console.log(`After ${this.moves} moves:`)
    let outputStr = ''
    for (let i = 0; i < 9; i++) {
      outputStr += ` ${this.gridValueToString[this.grid[i]]}`
      if (i % 3 === 2) {
        console.log(outputStr)
        if (i !== 8) {
          console.log('---+---+---')
        }
        outputStr = ''
      } else {
        outputStr += ' |'
      }
    }
  }
}
