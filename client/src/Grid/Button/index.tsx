import { FC } from "react";
import { GridValue } from "tictactoe-common/types/types";
import './style.css';

const buttonSymbol =  [' ', 'X', 'O']

const Button: FC<ButtonProps> = ({value, disabled, onclick}) => {
  console.log(value)
  return <button className="btn" disabled={false} onClick={onclick}>{buttonSymbol[value]}</button>
}

interface ButtonProps {
  value: GridValue
  disabled: boolean
  onclick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void 
}

export default Button