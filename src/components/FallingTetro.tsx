import React, { useEffect, useRef, useState } from "react";
import { Tetris, roulette, tile, coord } from 'Tetris';
import { isCollision, findYCollisionDist, getRotation } from 'functional';
import Assert from 'assert-js';

type props = {
  gr: [tile[][], React.Dispatch<React.SetStateAction<tile[][]>>],
  level: number
}

const FallingTetro: React.FC<props> = ({ gr, level }) => {
  const [grid, setGrid] = gr;

  // state describing the current tetromino
  const [position, setPosition] = useState<coord[]>([]);
  const [lastPosition, setLastPosition] = useState<coord[]>([]); // required for erasing from the grid
  const [type, setType] = useState<tile>(Tetris.EMPTY_TILE);
  const [rotationIdx, setRotationIdx] = useState<number>(0);
  const posRef = useRef<coord[]>();
  posRef.current = position;

  // state for periodically updating the display
  const [time, setTime] = useState<number | null>(null);
  const [gravity, setGravity] = useState<number>(1000);
  const [spawnPending, setSpawnPending] = useState<boolean>(false);
  const timeRef = useRef<number | null>();
  const pendingRef = useRef<boolean>();
  timeRef.current = time;
  pendingRef.current = spawnPending;
  
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
      case 'O': return true;
      case 'I': return rotate(Tetris.I_PIVOT_IDX, Tetris.I_NUM_ROTATIONS, step);
      case 'L': return rotate(Tetris.L_PIVOT_IDX, Tetris.L_NUM_ROTATIONS, step);
      case 'J': return rotate(Tetris.J_PIVOT_IDX, Tetris.J_NUM_ROTATIONS, step);
      case 'S': return rotate(Tetris.S_PIVOT_IDX, Tetris.S_NUM_ROTATIONS, step);
      case 'Z': return rotate(Tetris.Z_PIVOT_IDX, Tetris.Z_NUM_ROTATIONS, step);
      case 'T': return rotate(Tetris.T_PIVOT_IDX, Tetris.T_NUM_ROTATIONS, step);
      default: return false;
    }
  }

  const rotate = (pivotIdx: number, numRotations: number, step: number) => {
    const pivot = position[pivotIdx];
    const newRotationIdx = (rotationIdx + step + numRotations) % numRotations; 
    const update = getRotation(type, pivot, newRotationIdx);
    var i = 0;
    for(const p of update) {
      if(i !== pivotIdx && isCollision(p, grid, position))
        return false;
      i++;
    }

    setRotationIdx(newRotationIdx);
    updatePosition(update);
    return true;
  }

  const onDrop = () => {
    var fallDist = findYCollisionDist(grid, position);
    onTranslate(0, fallDist);
    setSpawnPending(true);
    console.log('Player spawned a tetro.');
  }

  useEffect(() => {
    if(!level)
      return;
    spawnTetro();
  }, [level])

  useEffect(() => {
    if(time === null)
      return;

    setTimeout(() => {
      // if the player hit spacebar, then either 
      // 1) the pending flag will be set (awaiting the spawn)
      // 2) or the time variable will be stale (spawn has already occurred)
      if(pendingRef.current || timeRef.current != time)
        return; // quit in either case
      

      var success = onTranslate(0, 1, posRef.current); // position variable is stale here, must supply a reference
      if(success) {
        setTime(time + gravity);
      } else { // tetro hit the ground, spawn another
        spawnTetro(); 
        console.log('Tetro completed its fall.');
      }
    }, gravity);
  }, [time])

  useEffect(() => {
    if(position.length === 0 || type === Tetris.EMPTY_TILE)
      return;
    updateGrid();
    if(spawnPending) {
      setSpawnPending(false);
      spawnTetro();
    }
      
  }, [position])

  useEffect(() => {
    document.onkeydown = (e) => {
      if(position.length <= 0)
        return;
      console.log(e.key);
      switch(e.key) {
        case 'ArrowUp': onTranslate(0, -1); break; // for debugging
        case 'ArrowDown': onTranslate(0, 1); break;
        case 'ArrowLeft': onTranslate(-1, 0); break;
        case 'ArrowRight': onTranslate(1, 0); break;
        case 'z': onRotate(1); break;
        case 'x': onRotate(-1); break;
        case ' ': onDrop(); break;
        default: return;
      }
    }
  }, [onTranslate, onRotate])

  return (
    <div>

    </div>
  )

}

export default FallingTetro;