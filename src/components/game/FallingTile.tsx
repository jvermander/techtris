import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType, Coordinate } from 'data/types';
import 'styles/Tile.css';

type props = {
  type: TileType;
  pos: Coordinate; 
  level: number;
}

// responsible for animating a tile in the current falling tetromino
const FallingTile: React.FC<props> = ({ type, pos, level }) => {
  const ref = useRef<HTMLDivElement>();
  const [origin, setOrigin] = useState<Coordinate | null>(null);

  useEffect(() => {
    if(!ref.current)
      return;

    if(origin) {
      ref.current.style.transform = 
        `translate(${(pos.x - origin.x) * 2.2}em, ${(pos.y - origin.y) * 1.9}em) translateZ(0)`;
      if(pos.y < 3) {
        ref.current.style.opacity = '0';
      } else {
        ref.current.style.opacity = '1';
      }
    } else {
      ref.current.style.left = `${pos.x * 2.2}em`;
      ref.current.style.top = `${(pos.y - 3) * 1.9}em`;
      ref.current.style.display = 'flex';
      setOrigin(pos);
    }
  }, [pos])

  useEffect(() => {
    if(!ref.current)
      return;
    if(level >= 9 && level < 11) 
      ref.current.style.setProperty('--falling-transition-duration', '100ms');
    else if(level >= 11 && level < 13)
      ref.current.style.setProperty('--falling-transition-duration', '50ms');
    else if(level >= 13)
      ref.current.style.setProperty('--falling-transition-duration', '20ms');
  }, [level])

  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      className={`falling-tile ${type}`}
    >
    </div>
  )
}

export default FallingTile;