import { useState } from "react";
import { GameMode, Result } from "../../../common/proto/tictactoe_pb";
import { Player } from "../../../common/types/const";

interface reducerPayload {
  // type: string
  player: Player
  index: number
}

const gridReducer = (grid: Grid, action: reducerPayload) => {
  grid[action.index] = action.player
}

type GridValue = 0 | 1 | 2;

type Grid = [
  GridValue, GridValue, GridValue,
  GridValue, GridValue, GridValue,
  GridValue, GridValue, GridValue
]

const initialGrid: Grid = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
]

export const useGameState = (mode: GameMode) => {
  const [result, setResult] = useState<Result>()
  const [isMyTurn, setIsMyTurn] = useState<boolean>(true)
  const [turn, setTurn] = useState<Player>(Player.FIRST)
  const [grid, setGrid] = useState<Grid>(initialGrid)
  
  console.log(grid)
  // TODOS:
  // 1. Create connection
  // 2. Set turn (p1 or p2)
  // 3. Write transaction handlers (move handlers)

  const move = (player: Player, index: GridValue) => {
    const newGrid: Grid = [...grid]
    newGrid[index] = player
    setGrid(newGrid)
  }

  const onPlayerMove = (index: number) => {
    // TODO:
    // 1. update Grid state
    // 2. inform server
    console.log(`${index + 1} clicked`)


    try {
      move(turn, index as GridValue)
    } catch(err) {
      console.error(err)
    }
    
    // setIsMyTurn(false)
  }

  const onOpponentMove = (index: number) => {
    const opponent: Player = (turn === Player.FIRST) ? Player.SECOND : Player.FIRST
    
    move(opponent, index as GridValue)
    
    setIsMyTurn(true)
  }

  return {
    grid,
    result,
    isMyTurn,
    onPlayerMove
  }
}