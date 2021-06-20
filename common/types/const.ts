/* eslint-disable no-unused-vars */
export const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
]

export enum Player {
  FIRST = 1,
  SECOND = 2
}

export enum Level {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2
}

export enum Mode {
  MIN = -1,
  MAX = 1
}
