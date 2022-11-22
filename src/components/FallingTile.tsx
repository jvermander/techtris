import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType, Coordinate } from 'data/types';
import 'styles/Tile.css';
import { Tetris } from 'data/Tetris';

type props = {
  type: TileType;
  coord: Coordinate;
}

const FallingTile: React.FC<props> = ({ type, coord }) => {
  const ref = useRef<HTMLDivElement>();
  const [left, setLeft] = useState<string>('');
  const [top, setTop] = useState<string>('');

  useEffect(() => {
    if(!ref.current)
      return;
    var duration = '0.2s';
    ref.current.style.display = 'flex';
    ref.current.style.transition = `left ${duration}, top ${duration}, opacity ${duration}`;
    ref.current.style.left = `calc(${coord.x}* var(--tileWidth))`;
    ref.current.style.top = `calc((${coord.y} - 3)  * var(--tileHeight))`;
    if(coord.y < 3)
      ref.current.style.opacity = '0';
    else
      ref.current.style.opacity = '1';
  }, [coord])
  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      className={`falling-tile ${type}`}
    >
    </div>
  )

}



export default FallingTile;