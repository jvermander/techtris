import React, { useState, useEffect } from 'react';
import { TileType } from 'data/types';
import 'styles/Tile.css';

type props = {
  type: TileType;
}

const Tile: React.FC<props> = ({ type }) => {

  return (
    <div className={`tile ${type}`}>
    </div>
  )

}



export default Tile;