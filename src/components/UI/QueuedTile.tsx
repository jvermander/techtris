import React, { useState, useEffect, useRef, LegacyRef } from 'react';
import { TileType } from 'data/types';
import 'styles/Tile.css';

type props = {
  type: TileType;
  style?: React.CSSProperties;
}

const QueuedTile: React.FC<props> = ({ type, style }) => {
  const ref = useRef<HTMLDivElement>();

  return (
    <div 
      ref={ref as LegacyRef<HTMLDivElement>}
      className={`tile queued-tile ${type}`}
      style={style}
    >
    </div>
  )

}

export default QueuedTile;