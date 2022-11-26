import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType } from 'data/types';
import 'styles/Tile.css';

type props = {
  type: TileType;
  style?: React.CSSProperties;
  id: string;
}

const QueuedTile: React.FC<props> = ({ type, style, id }) => {
  const ref = useRef<HTMLDivElement>();

  return (
    <div 
      id={id}
      ref={ref as LegacyRef<HTMLDivElement>}
      className={`tile queued-tile ${type}`}
      style={style}
    >
    </div>
  )

}

export default QueuedTile;