import React, { useEffect, useState } from "react";
import { Tetris, tile, coord } from 'Tetris';
import { isCollision, getRotation } from 'functional';
import Assert from 'assert-js';

type props = {
  gr: [tile[][], React.Dispatch<React.SetStateAction<tile[][]>>],
  level: number
}

const FallingTetro: React.FC<props> = ({ gr, level }) => {
  const [grid, setGrid] = gr;
  const [type, setType] = useState<tile>(Tetris.EMPTY_TILE);
  const [lastPosition, setLastPosition] = useState<coord[]>([]); // required for erasing from the grid
  const [position, setPosition] = useState<coord[]>([]);
  const [rotationIdx, setRotationIdx] = useState<number>(0);
  const [gravity, setGravity] = useState<number>(1000);

  useEffect(() => {
    if(!level)
      return;
    spawnTetro('T');
  }, [level])

  const updatePosition = (update: coord[]) => {
    setLastPosition(position);
    setPosition(update);
  }

  const spawnTetro = (type: tile) => {
    if(type == Tetris.EMPTY_TILE)
      return;
    setPosition(getRotation(type, { x: Tetris.SPAWN_COL, y: Tetris.SPAWN_ROW }, 0));
    setType(type);
  };

  const onTranslate = (x_step: number, y_step: number) => {
    var update = new Array<coord>();
    for(const p of position) {
      var newCoord: coord = { x: p.x + x_step, y: p.y + y_step };
      if(!isCollision(newCoord, grid, position)) {
        update.push(newCoord);
      } else {
        return;
      }
    }
    updatePosition(update);
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
    if(position.length === 0 || type === Tetris.EMPTY_TILE)
      return;

    updateGrid();
    // setTimeout(() => {
      
    // }, gravity)
  }, [position])

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

  useEffect(() => {
    document.onkeydown = (e) => {
      switch(e.key) {
        case 'ArrowDown': onTranslate(0, 1); break;
        case 'ArrowUp': onTranslate(0, -1); break;
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