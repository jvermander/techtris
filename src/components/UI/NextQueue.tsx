import React, { useState, useRef, useEffect } from "react";
import { TileType, Coordinate } from "data/types";
import { getRotation } from 'functional';
import { QueuedTile } from "components";
import 'styles/HUD.css';

const getCenterStyle = (type: TileType, p: Coordinate): React.CSSProperties => {
  var offsetX = 0;
  var offsetY = 0;

  switch(type) {
    case 'I':
      offsetY = -0.95;
      break;
    case 'O':
      offsetY = -1.9;
      break;
    case 'T':
    case 'S':
    case 'Z':
    case 'J':
    case 'L':
      offsetX = - 1.1;
      offsetY = - 1.9;
      break;
    default:
      break;
  }
  return { left: `${p.x * 2.2 + offsetX}em`, top: `${p.y * 1.9 + offsetY}em` };
}

type props = {
  nextType: TileType;
}

const NextQueue: React.FC<props> = ({ nextType }) => {
  return (
    <div id='next-queue'>
      <div style={{ position: 'relative', width: '10em', height: '6em' }}>
        {getRotation(nextType, { x: 2.25, y: 1.6 }, 0).map((p, i) => {
          return <QueuedTile type={nextType} style={getCenterStyle(nextType, p)}/>
        })}
      </div>
      <div style={{fontSize: '1.25rem', padding: '0.5em'}}>Next</div>
    </div>
  );
}

export default NextQueue;