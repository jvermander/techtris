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
  return (
    <div 
      className={`tile ${type} ${tetris ? 'tetris' : ''}`}
    >
      <TileAnimator type={type} magnitude={magnitude} id={id}/>
    </div>
  )

}



export default Tile;