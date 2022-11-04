import React, { useState, useEffect } from 'react';
import { Tetris, tile } from 'Tetris';
import 'styles/Tile.css';

type props = {
  value: tile;
}

const Tile: React.FC<props> = ({ value }) => {

  return (
    <div className={`tile ${value}`}>
    </div>
  )

}



export default Tile;