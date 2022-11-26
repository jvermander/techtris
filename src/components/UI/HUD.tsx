import React, { useState, useRef, useEffect } from "react";
import { GameStage, TileType } from 'data/types';
import { Tetris } from "data/Tetris";
import { Grid, NextQueue, LevelSelector } from 'components';
import 'styles/HUD.css';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
}

const HUD: React.FC<props> = ({ st }) => {
  const [stage, setStage] = st;
  const [next, setNext] = useState<TileType>(Tetris.EMPTY_TILE);
  const [level, setLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  return (
    <div id='hud'>
      <LevelSelector st={ [stage, setStage ]} lv={[level, setLevel]} />
      <Grid st={st} nx={[next, setNext]} lv={[level, setLevel]} sc={[score, setScore]} />
      <div 
        style={{ 
          display: stage === 'greeting' ? 'none' : 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-start',
          margin: '1em', 
          position: 'absolute', 
          right: '20em'
        }}>
        <NextQueue nextType={next} />
        <div className='hud-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  marginTop: '1em'}}>
          <div style={{padding: '1em 1em 0.5em 1em', fontSize: '2rem'}}>{`${level}`.padStart(2, '0')}</div>
          <div style={{fontSize: '1.25rem', padding: '0.5em'}}>Level</div>
        </div>
        <div className='hud-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1em'}}>
          <div style={{padding: '1em 1em 0.5em 1em', fontSize: '1rem'}}>{score}</div>
          <div style={{fontSize: '1.25rem', padding: '0.5em'}}>Score</div>
        </div>
      </div>
      
    </div>
  );
}

export default HUD;