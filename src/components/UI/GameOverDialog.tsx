import React, { useState } from 'react';
import { Button } from 'components';
import { GameStage } from 'data/types';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
  sc: [ score: number, setStage: React.Dispatch<React.SetStateAction<number>> ]
}

const GameOverDialog: React.FC<props> = ({ st, sc }) => {
  const [stage, setStage] = st;
  const [score, setScore] = sc;

  return (
    <div id='game-over' style={{ display: stage === 'game_over' ? 'flex' : 'none' }}>
      <div style={{ marginBottom: '2em'}}>Game Over</div>
      <div>Your Score:</div>
      <div>{score}</div>
      <Button label='One more try.' onClick={(e) => { setStage('setup' )}}/>
    </div>
  );
}

export default GameOverDialog;