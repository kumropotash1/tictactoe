import { useState } from "react"
import Grid from "../../../common/grid"
import { GameMode, Result } from "../../../common/proto/tictactoe_pb"
import { Player } from "../../../common/types/const"

export const useGameState = (mode: GameMode) => {
  const [result, setResult] = useState<Result>()
  const [isMyTurn, setIsMyTurn] = useState<boolean>()
  let [turn, setTurn] = useState<Player>(Player.FIRST)
  
  const grid = new Grid()
    
  // TODOS:
  // 1. Create connection
  // 2. Set turn (p1 or p2)
  // 3. Write transaction handlers (move handlers)

  const onPlayerMove = (index: number) => {
    // TODO:
    // 1. update Grid state
    // 2. inform server
    console.log(`${index + 1} button clicked`)
    grid.move(turn as Player, index)

    // setIsMyTurn(false)
  }

  const onOpponentMove = (index: number) => {
    const opponent: Player = (turn === Player.FIRST) ? Player.SECOND : Player.FIRST
    grid.move(turn as Player, index)

    setIsMyTurn(true)
  }

  return {
    grid,
    result,
    isMyTurn,
    onPlayerMove
  }
}