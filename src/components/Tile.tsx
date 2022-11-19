import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType } from 'data/types';
import { TileAnimator } from 'components';
import 'styles/Tile.css';
import { Tetris } from 'data/Tetris';

type props = {
  type: TileType;
  magnitude: number;
  tetris: boolean;
  id: string;
}

const Tile: React.FC<props> = ({ type, magnitude, tetris, id }) => {
  const [classList, setClassList] = useState<string[]>([type, 'tile'])
  const [exitTime, setExitTime] = useState(0);
  const timeRef = useRef(exitTime);
  timeRef.current = exitTime;

  const tetrisMode = (duration: number = 7500) => {
    setClassList(prev => [...prev, 'tetris-mode', 'tetris']);
    setExitTime(new Date().getTime() + duration);
    
    setTimeout(() => {
      setClassList(prev => (prev.filter((value) => (value !== 'tetris'))));
    }, Tetris.TETRIS_DURATION);

    setTimeout(() => {
      if(timeRef.current <= new Date().getTime()) {
        setClassList(prev => ([ ...(prev.filter((value) => (value !== 'tetris-mode'))), 'transition' ] ));
    
        setTimeout(() => {
          setClassList(prev => (prev.filter((value) => (value !== 'transition'))));

        }, 1000)
      }
    }, duration);
  }

  useEffect(() => {
    if(tetris)
      tetrisMode();
  }, [tetris])

  useEffect(() => {
    setClassList( prev => ([type, ...prev.filter((value, index) => (index != 0))]));
  }, [type])

  return (
    <div 
      className={classList.join(' ')}
    >
      <TileAnimator type={type} magnitude={magnitude} id={id}/>
    </div>
  )

}



export default Tile;