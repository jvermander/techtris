import React, { useEffect, useRef, useState } from "react";
import { FallingTile } from 'components';
import { Tetris, roulette, gravityByLevel } from 'data/Tetris';
import { TileType, Coordinate, GameStage } from 'data/types';
import { isCollision, findYCollisionDist, getRotation, findYCollisions } from 'functional';

type props = {
  gr: [
    grid: TileType[][], 
    updateGrid: (
      position: Coordinate[], 
      type: TileType, 
    ) => void,
  ],
  st: [GameStage, React.Dispatch<React.SetStateAction<GameStage>>]
  level: number,
  nx: [ next: TileType, setNext: React.Dispatch<React.SetStateAction<TileType>> ],
  destroyPending: boolean
}

const FallingTetro: React.FC<props> = ({ gr, st, level, nx, destroyPending }) => {
  const [grid, updateGrid] = gr;
  const [stage, setStage] = st;
  const [next, setNext] = nx;

  // state describing the current tetromino
  const [position, setPosition] = useState<Coordinate[]>([]);
  const [type, setType] = useState<TileType>(Tetris.EMPTY_TILE);
  const [rotationIdx, setRotationIdx] = useState<number>(0);
  const posRef = useRef<Coordinate[]>(position);
  posRef.current = position;

  // state for periodically updating the display
  const [time, setTime] = useState<number>(-1);
  const [gravity, setGravity] = useState<number>(0);
  const [gravityTemp, setGravityTemp] = useState<number>(gravity);
  const timeRef = useRef<number>(time);
  const [wait, setWait] = useState<boolean>(false);
  const pendingRef = useRef<boolean>(wait);
  timeRef.current = time;
  pendingRef.current = wait;

  const [pause, setPause] = useState<boolean>(false);
  const pauseRef = useRef(pause);
  pauseRef.current = pause;
  
  const resetTetro = () => {
    setPosition([]);
    setType(Tetris.EMPTY_TILE);
    setRotationIdx(0);
    setTime(-1);
    setGravity(0);
    setWait(false);
  }

  const spawnTetro = (): void => {
    var queued = next === Tetris.EMPTY_TILE ? getRandomType() : next;
    // var queued = 'I' as TileType;
    const init = getRotation(queued, { x: Tetris.SPAWN_COL, y: Tetris.SPAWN_ROW }, 0);
    // const init = getRotation('I', { x: Tetris.COLS - 1, y: Tetris.SPAWN_ROW }, 1);
    setPosition(init);
    setType(queued);    
    setRotationIdx(0);
    setTime(new Date().getTime());
    setNext(getRandomType());
    setWait(false);

    if(isSpawnBlocked(init)) {
      console.log('Game over!');
      console.log('Final tetro is of type', queued); 
      setStage('game_over');
    }
  };

  const isSpawnBlocked = (position: Coordinate[]): boolean => {
    for(const p of position) {
      if(isCollision(p, grid, true))
        return true;
    }
    return false;
  }

  const getRandomType = (): TileType => {
    return roulette[Math.floor(Math.random() * Tetris.NUM_TETROS)];
  }

  /* 
    Translates the falling tetromino in the given directions.
    Returns true if successful, or false if impossible.

    An optional current position can be supplied if the caller believes it has a 
    more recent version of position (e.g. in timeout functions).
  */
  const onTranslate = (x_step: number, y_step: number, refresh: boolean = true): Coordinate[] => {
    var update = new Array<Coordinate>();
    for(const p of posRef.current) {
      var newCoord: Coordinate = { x: p.x + x_step, y: p.y + y_step };
      if(!isCollision(newCoord, grid)) {
        update.push(newCoord);
      } else {
        return [];
      }
    }
    if(refresh)
      setPosition(update);
    return update;
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
    const pivot = posRef.current[pivotIdx];
    const newRotationIdx = (rotationIdx + step + numRotations) % numRotations; 
    const update = getRotation(type, pivot, newRotationIdx);
    var i = 0;
    for(const p of update) {
      if(i !== pivotIdx && isCollision(p, grid))
        return false;
      i++;
    }

    setRotationIdx(newRotationIdx);
    setPosition(update);
    return true;
  }

  const onDrop = (): void => {
    var fallDist = findYCollisionDist(grid, position);
    setWait(true);
    var update = fallDist ? onTranslate(0, fallDist, false) : position;
    updateGrid(update, type);
  }

  useEffect(() => {
    if(stage === 'setup')
      resetTetro();
    else if(stage === 'play')
      spawnTetro();
  }, [stage])

  useEffect(() => {
    console.log('Pause:', pause);
    setGravity(pause ? 0: gravityTemp);
    setGravityTemp(gravity);
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
      if(pendingRef.current || timeRef.current != time || pauseRef.current || gravity <= 0)
        return; // quit in either case

      var update = onTranslate(0, 1);
      if(update.length > 0) {
        setTime(time + gravity);
      } else { // tetro hit the ground, spawn another
        console.log('Tetro hit the ground');
        updateGrid(posRef.current, type);
        setWait(true);
      }
    }, gravity);
  }, [time])

  useEffect(() => {
    if(stage !== 'play' && stage !== 'game_over')
      return;
    if(!destroyPending) {
      spawnTetro();
    }
  }, [grid]);

  useEffect(() => {
    setGravity(gravityByLevel[level]);
    console.log('Level reached:', level);
  }, [level])

  useEffect(() => {
    document.onkeydown = (e) => {
      if(stage !== 'play' || pendingRef.current)
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
  }, [onTranslate, onRotate, onDrop, pendingRef.current])

  return (
    <div>
      {posRef.current.map((p, i) => {
        return <FallingTile type={type} pos={p} level={level} key={i} />
      })}
    </div>
  )

}

export default FallingTetro;