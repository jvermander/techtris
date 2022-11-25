import React, { useState, useRef, useEffect } from "react";
import { GameStage, TileType } from 'data/types';
import { Tetris } from "data/Tetris";
import { Grid, NextQueue } from 'components';
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
      <Grid st={st} nx={[next, setNext]} lv={[level, setLevel]} sc={[score, setScore]} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NextQueue nextType={next} />
      </div>
    </div>
  );
}

export default HUD;