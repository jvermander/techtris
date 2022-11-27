import React, { useState, useRef, useEffect } from "react";
import { TileType, Coordinate } from "data/types";
import { getRotation } from 'functional';
import { QueuedTile } from "components";
import 'styles/HUD.css';

const getCenterStyle = (type: TileType, p: Coordinate): React.CSSProperties => {
  var offsetX = 0;
  var offsetY = 0;

  var style = getComputedStyle(document.body);
  var tileHeight = parseFloat(style.getPropertyValue('--queuedTileHeight'));
  var tileWidth = tileHeight * 1.16;

  switch(type) {
    case 'I':
      offsetY = -tileHeight / 2; // h / 2
      break;
    case 'O':
      offsetY = -tileHeight; // h
      break;
    case 'T':
    case 'S':
    case 'Z':
    case 'J':
    case 'L':
      offsetX = - tileWidth / 2; // w / 2
      offsetY = - tileHeight; // h
      break;
    default:
      break;
  }

  return { 
    left: `${p.x * tileWidth + offsetX + ((tileWidth * 5) / 2)}em`, 
    top: `${p.y * tileHeight + offsetY + ((tileHeight * 3) / 2)}em ` 
  };
}

type props = {
  nextType: TileType;
}

const NextQueue: React.FC<props> = ({ nextType }) => {
  return (
    <div id='next-queue'>
      <div id='queue-display'>
        { getRotation(nextType, { x: 0, y: 0 }, 0).map((p, i) => {
          return <QueuedTile key={`${i}`} type={nextType} style={getCenterStyle(nextType, p)}/>
        })}
      </div>
      <div className="hud-label">Next</div>
    </div>
  );
}

export default NextQueue;