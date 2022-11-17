import React, { useEffect, useRef, useState } from "react";
import { Tetris, roulette, tile, coord } from 'Tetris';
import { isCollision, getRotation } from 'functional';
import Assert from 'assert-js';

type props = {
  gr: [tile[][], React.Dispatch<React.SetStateAction<tile[][]>>],
  level: number
}

const FallingTetro: React.FC<props> = ({ gr, level }) => {
  const [grid, setGrid] = gr;

  const [position, setPosition] = useState<coord[]>([]);
  const posRef = useRef<coord[]>(position);
  posRef.current = position;
  const [lastPosition, setLastPosition] = useState<coord[]>([]); // required for erasing from the grid
  const [type, setType] = useState<tile>(Tetris.EMPTY_TILE);
  const [rotationIdx, setRotationIdx] = useState<number>(0);

  const [gravity, setGravity] = useState<number>(1000);
  const [time, setTime] = useState<number | null>(null);
  
  const updatePosition = (update: coord[], current: (coord[] | null) = null) => {
    setLastPosition(current ?? position);
    setPosition(update);
  }

  const spawnTetro = () => {
    var randomType = getRandomType();

    const init = getRotation(randomType, { x: Tetris.SPAWN_COL, y: Tetris.SPAWN_ROW }, 0);
    setPosition(init);
    setLastPosition([]);
    setType(randomType);    
    setRotationIdx(0);
    setTime(time ? 0 : -1); // must still force a state change if this tetro is spawning at time = 0
  };

  const getRandomType = () => {
    return roulette[Math.floor(Math.random() * Tetris.NUM_TETROS)];
  }

  const updateGrid = () => {
    var update = [...grid];
    if(lastPosition.length > 0) {
      for(const p of lastPosition) {
        update[p.y][p.x] = Tetris.EMPTY_TILE;
      }
    }
    for(const p of position) {
      update[p.y][p.x] = type as tile;
    }
    setGrid(update);
  }

  /* 
    Translates the falling tetromino in the given directions.
    Returns true if successful, or false if impossible.

    An optional current position can be supplied if the caller believes it has a 
    more recent version of position (e.g. in timeout functions).
  */
  const onTranslate = (x_step: number, y_step: number, current: (coord[] | null) = null) => {
    var update = new Array<coord>();
    for(const p of current ?? position) {
      var newCoord: coord = { x: p.x + x_step, y: p.y + y_step };
      if(!isCollision(newCoord, grid, current ?? position)) {
        update.push(newCoord);
      } else {
        return false;
      }
    }
    updatePosition(update, current);
    return true;
  }

  const onRotate = (step: number) => {
    switch(type) {
      case 'O': return;
      case 'I': rotate(Tetris.I_PIVOT_IDX, Tetris.I_NUM_ROTATIONS, step); break;
      case 'L': rotate(Tetris.L_PIVOT_IDX, Tetris.L_NUM_ROTATIONS, step); break;
      case 'J': rotate(Tetris.J_PIVOT_IDX, Tetris.J_NUM_ROTATIONS, step); break;
      case 'S': rotate(Tetris.S_PIVOT_IDX, Tetris.S_NUM_ROTATIONS, step); break;
      case 'Z': rotate(Tetris.Z_PIVOT_IDX, Tetris.Z_NUM_ROTATIONS, step); break;
      case 'T': rotate(Tetris.T_PIVOT_IDX, Tetris.T_NUM_ROTATIONS, step); break; 
      default: return;
    }
  }

  const rotate = (pivotIdx: number, numRotations: number, step: number) => {
    const pivot = position[pivotIdx];
    const newRotationIdx = (rotationIdx + step + numRotations) % numRotations; 
    const update = getRotation(type, pivot, newRotationIdx);
    var i = 0;
    for(const p of update) {
      if(i !== pivotIdx && isCollision(p, grid, position))
        return;
      i++;
    }

    setRotationIdx(newRotationIdx);
    updatePosition(update);
  }

  useEffect(() => {
    if(!level)
      return;
    spawnTetro();
  }, [level])

  useEffect(() => {
    console.log('Time', time);
    if(time === null)
      return;

    setTimeout(() => {
      // console.log('Time passes by...');
      // console.log('Time sees:', posRef.current);
      // setTime(time + gravity);

      var success = onTranslate(0, 1, posRef.current); // position variable is stale here, must supply a reference
      if(success) {
        setTime(time + gravity);
      } else { // tetro hit the ground, spawn another
        spawnTetro(); 
        console.log('Collision occurred');
      }
    }, gravity);
  }, [time])

  useEffect(() => {
    if(position.length === 0 || type === Tetris.EMPTY_TILE)
      return;

    updateGrid();

  }, [position])

  useEffect(() => {
    document.onkeydown = (e) => {
      switch(e.key) {
        case 'ArrowUp': onTranslate(0, -1); break; // for debugging
        case 'ArrowDown': onTranslate(0, 1); break;
        case 'ArrowLeft': onTranslate(-1, 0); break;
        case 'ArrowRight': onTranslate(1, 0); break;
        case 'z': onRotate(-1); break;
        case 'x': onRotate(1); break;
      }
    }
  }, [onTranslate, onRotate])

  return (
    <div>

    </div>
  )

}

export default FallingTetro;