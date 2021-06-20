import React from 'react';
import { GameMode } from 'tictactoe-common/proto/tictactoe_pb';
import './App.css';
import Grid from './Grid';


function App() {
  return (
    <Grid mode={GameMode.MODE_SINGLE_PLAYER}/>
  );
}

export default App;
