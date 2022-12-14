import React, { useState, useRef, useEffect } from "react";
import { GameStage, TileType } from 'data/types';
import { Tetris } from "data/Tetris";
import { Grid, NextQueue, LevelSelector, GameOverDialog } from 'components';
import 'styles/HUD.css';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
}

const HUD: React.FC<props> = ({ st }) => {
  const [stage, setStage] = st;
  const [next, setNext] = useState<TileType>(Tetris.EMPTY_TILE);
  const [level, setLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const resetHUD = () => {
    setNext(Tetris.EMPTY_TILE);
    setLevel(0);
    setScore(0);
  }

  useEffect(() => {
    if(stage === 'setup') {
      resetHUD();
    }
  }, [stage])

  return (
    <div id='hud'>
      <LevelSelector st={ [stage, setStage ]} lv={[level, setLevel]} />
      <GameOverDialog st={ [stage, setStage ]} sc={[score, setScore]} />
      <div 
        className='shim sidebar'
      >
      </div>
      <Grid st={st} nx={[next, setNext]} lv={[level, setLevel]} sc={[score, setScore]} />
      <div 
        className='sidebar'
        style={{ 
          visibility: stage === 'greeting' ? 'hidden' : 'visible',
          opacity: stage === 'game_over' ? 0.4 : '',
        }}>
        <NextQueue nextType={next} />
        <div className='hud-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  marginTop: '1em'}}>
          <div style={{padding: '0.5em 1em 0em 1em', fontSize: '2rem'}}>{`${level}`.padStart(2, '0')}</div>
          <div className='hud-label'>Level</div>
        </div>
        <div className='hud-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1em'}}>
          <div style={{padding: '1em 1em 0em 1em', fontSize: '1rem'}}>{score}</div>
          <div className='hud-label'>Score</div>
        </div>
      </div>
    </div>
  );
}

export default HUD;