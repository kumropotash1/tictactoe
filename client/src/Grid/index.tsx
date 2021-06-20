import { FC } from 'react'
import { GameMode } from 'tictactoe-common/proto/tictactoe_pb'
import Button from './Button'
import { useGameState } from './state'
import "./style.css"

const Grid: FC<GridProps> = ({mode}) => {
  const { grid, isMyTurn, onPlayerMove } = useGameState(mode)

  const onButtonClick = (index: number) => {
    onPlayerMove(index)
    return
  }

  console.log("isMyTurn:", isMyTurn)

  return (
    <div className="container">
      {
        grid.map((val, index) => {
          console.log("Hello world", val, index)
          return <Button disabled={val > 0 || !isMyTurn} onclick={() => {onButtonClick(index)}} value={val}></Button>
        })
      }
    </div>
  )
}

interface GridProps {
  mode: GameMode,
}

export default Grid