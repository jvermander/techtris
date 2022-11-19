import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType } from 'data/types';
import { TileAnimator } from 'components';
import 'styles/Tile.css';

type props = {
  type: TileType;
  magnitude: number;
}

const Tile: React.FC<props> = ({ type, magnitude }) => {
  return (
    <div className={`tile ${type}`}>
      <TileAnimator type={type} magnitude={magnitude}/>
    </div>
  )

}



export default Tile;