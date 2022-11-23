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
  shadow: string;
}

const Tile: React.FC<props> = ({ type, magnitude, tetris, id, shadow }) => {
  const [classList, setClassList] = useState<string[]>([type, 'tile'])
  const [exitTime, setExitTime] = useState(-1);
  const timeRef = useRef(exitTime);
  timeRef.current = exitTime;

  const tetrisMode = () => {
    var board = document.getElementById('board');
    if(board && new Date().getTime() >= exitTime) {
      board.style.backgroundColor = 'transparent';
      board.style.borderColor = 'transparent';
    }
    setClassList(prev => [...prev, 'tetris-mode', 'tetris']);
    
    setExitTime(new Date().getTime() + Tetris.TETRIS_MODE_DURATION);
    
    setTimeout(() => {
      setClassList(prev => (prev.filter((value) => (value !== 'tetris'))));
    }, Tetris.TETRIS_DURATION);

    setTimeout(() => {
      if(timeRef.current <= new Date().getTime()) {
        if(board) {
          board.style.backgroundColor = '';
          board.style.borderColor = '';
        }
        setClassList(prev => ([ ...(prev.filter((value) => (value !== 'tetris-mode'))), 'transition' ] ));
    
        setTimeout(() => {
          setClassList(prev => (prev.filter((value) => (value !== 'transition'))));

        }, Tetris.TETRIS_MODE_EXIT_TRANSITION)
      }
    }, Tetris.TETRIS_MODE_DURATION);
  }

  useEffect(() => {
    if(tetris)
      tetrisMode();
  }, [tetris])

  useEffect(() => {
    if(shadow === 'top') {
      setClassList( prev => ( [ ...prev, 'falling-shadow'] ));
    } else if(shadow === 'bot') {
      setClassList( prev => ( [ ...prev, 'falling-shadow-bot' ] ));
    } else {
      setClassList( prev => (prev.filter((value) => (value != 'falling-shadow' && value != 'falling-shadow-bot'))));
    }
  }, [shadow])

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