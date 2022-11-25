import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType } from 'data/types';
import { TileAnimator } from 'components';
import 'styles/Tile.css';
import { Tetris } from 'data/Tetris';

type props = {
  type: TileType;
  magnitude: number;
  isTetris: boolean;
}

const Tile: React.FC<props> = ({ type, magnitude, isTetris }) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if(isTetris && ref.current && type !== Tetris.EMPTY_TILE)
      ref.current.style.animation = 'tetris var(--tetris-duration) ease-out';
  }, [isTetris])

  return (
    <div 
      ref={ref as LegacyRef<HTMLDivElement>}
      onAnimationEnd={(e) => { if(e.animationName === 'tetris' && ref.current) ref.current.style.animation = ''; }}
      className={`tile ${type}`}
    >
      <TileAnimator type={type} magnitude={magnitude} />
    </div>
  )

}



export default Tile;