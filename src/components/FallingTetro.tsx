import React, { useEffect, useRef, useState } from "react";
import { Tetris, roulette } from 'data/Tetris';
import { TileType, Coordinate, GameStage } from 'data/types';
import { isCollision, findYCollisionDist, getRotation } from 'functional';
import Assert from 'assert-js';

type props = {
  gr: [
    grid: TileType[][], 
    updateGrid: (position: Coordinate[], type: TileType, lastPosition: Coordinate[]) => void,
    destroyRows: (position: Coordinate[]) => number
  ],
  st: [GameStage, React.Dispatch<React.SetStateAction<GameStage>>]
  level: number,
}

const FallingTetro: React.FC<props> = ({ gr, st, level }) => {
  const [grid, updateGrid, destroyRows] = gr;
  const [stage, setStage] = st;

  // state describing the current tetromino
  const [position, setPosition] = useState<Coordinate[]>([]);
  const [lastPosition, setLastPosition] = useState<Coordinate[]>([]); // required for erasing from the grid
  const [type, setType] = useState<TileType>(Tetris.EMPTY_TILE);
  const [rotationIdx, setRotationIdx] = useState<number>(0);
  const posRef = useRef<Coordinate[]>(position);
  posRef.current = position;

  // state for periodically updating the display
  const [time, setTime] = useState<number>(-1);
  const [gravity, setGravity] = useState<number>(1000);
  const [destroyPending, setDestroyPending] = useState<boolean>(false);
  const [spawnPending, setSpawnPending] = useState<boolean>(false);
  const timeRef = useRef<number>(time);
  const pendingRef = useRef<boolean>(spawnPending);
  timeRef.current = time;
  pendingRef.current = spawnPending;

  const [pause, setPause] = useState<boolean>(false);
  const pauseRef = useRef(pause);
  pauseRef.current = pause;
  
  const updatePosition = (update: Coordinate[], current: (Coordinate[] | null) = null): void => {
    setLastPosition(current ?? position);
    setPosition(update);
  }

  const spawnTetro = (): void => {
    // var randomType = getRandomType();
    var randomType = 'I' as TileType;

    const init = getRotation(randomType, { x: Tetris.SPAWN_COL, y: Tetris.SPAWN_ROW }, 0);
    setPosition(init);
    setLastPosition([]);
    setType(randomType);    
    setRotationIdx(0);
    setTime(new Date().getTime());

    if(isSpawnBlocked(init)) {
      console.log('Game over!');
      console.log('Final tetro is of type', randomType);
      setStage('game_over');
    }
  };

  const isSpawnBlocked = (position: Coordinate[]): boolean => {
    for(const p of position) {
      if(isCollision(p, grid, null))
        return true;
    }
    return false;
  }

  const getRandomType = (): TileType => {
    return roulette[Math.floor(Math.random() * Tetris.NUM_TETROS)];
  }

  const onDestroy = (position: Coordinate[]): boolean => {
    var numDestroyed = destroyRows(position);
    console.log('# Destroyed:', numDestroyed);
    if(numDestroyed)
      setSpawnPending(true);
    else
      spawnTetro();
    setDestroyPending(false);
    return numDestroyed != 0;
  }

  /* 
    Translates the falling tetromino in the given directions.
    Returns true if successful, or false if impossible.

    An optional current position can be supplied if the caller believes it has a 
    more recent version of position (e.g. in timeout functions).
  */
  const onTranslate = (x_step: number, y_step: number, current: (Coordinate[] | null) = null): boolean => {
    if(!x_step && !y_step) // if a zero-translation, return true but do not update any state
      return true;

    var update = new Array<Coordinate>();
    for(const p of current ?? position) {
      var newCoord: Coordinate = { x: p.x + x_step, y: p.y + y_step };
      if(!isCollision(newCoord, grid, current ?? position)) {
        update.push(newCoord);
      } else {
        return false;
      }
    }
    updatePosition(update, current);
    return true;
  }

  const onRotate = (step: number): boolean => {
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

  const rotate = (pivotIdx: number, numRotations: number, step: number): boolean => {
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

  const onDrop = (): void => {
    var fallDist = findYCollisionDist(grid, position);
    onTranslate(0, fallDist);
    if(fallDist === 0) {
      onDestroy(position);
    } else {
      setDestroyPending(true);
    }
  }

  useEffect(() => {
    if(stage === 'play')
      spawnTetro();
  }, [stage])

  useEffect(() => {
    console.log('Pause:', pause);
    setGravity(pause ? 0: 1000);
    setTime(new Date().getTime());
  }, [pause])


  /*
    Updates the time slice (i.e. applies gravity periodically).
  */
  useEffect(() => {
    if(stage != 'play')
      return;

    setTimeout(() => {
      // if the player hit spacebar, then either 
      // 1) the pending flag will be set (awaiting the spawn)
      // 2) or the time variable will be stale (spawn has already occurred)
      if(pendingRef.current || timeRef.current != time || pauseRef.current)
        return; // quit in either case

      var success = onTranslate(0, 1, posRef.current); // position variable is stale here, must supply a reference
      if(success) {
        setTime(time + gravity);
      } else { // tetro hit the ground, spawn another
        console.log('Tetro hit the ground.')
        onDestroy(posRef.current);
      }
    }, gravity);
  }, [time])

  useEffect(() => {
    if(stage === 'setup')
      return;
    updateGrid(position, type, lastPosition);
  }, [position])

  useEffect(() => {
    if(stage === 'setup')
      return;

    if(destroyPending) {
      onDestroy(position);
    } else if(spawnPending) {
      spawnTetro();
      setSpawnPending(false);
    }
  }, [grid])

  useEffect(() => {
    document.onkeydown = (e) => {
      if(stage != 'play' || spawnPending || destroyPending)
        return;
      switch(e.key) {
        // case 'ArrowUp': onTranslate(0, -1); break; // for debugging
        case 'ArrowDown': onTranslate(0, 1); break;
        case 'ArrowLeft': onTranslate(-1, 0); break;
        case 'ArrowRight': onTranslate(1, 0); break;
        case 'z': onRotate(-1); break;
        case 'x': onRotate(1); break;
        case ' ': onDrop(); break;
        case 'p': setPause(!pause); break;
        default: return;
      }
    }
  }, [onTranslate, onRotate, spawnPending])

  return (
    <div>

    </div>
  )

}

export default FallingTetro;