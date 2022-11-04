import React, { useEffect, useState } from "react";
import { Tetris, tile, coord } from 'Tetris';
import { 
  isRotationBlocked,
  isCollision 
} from 'functional';

type props = {
  gr: [tile[][], React.Dispatch<React.SetStateAction<tile[][]>>],
  level: number
}

const FallingTetromino: React.FC<props> = ({ gr, level }) => {
  const [grid, setGrid] = gr;
  const [value, setValue] = useState<tile | null>(null);
  const [lastPosition, setLastPosition] = useState<coord[]>([]);
  const [position, setPosition] = useState<coord[]>([]);
  const [gravity, setGravity] = useState<number>(1000);

  const updatePosition = (update: coord[]) => {
    setLastPosition(position);
    setPosition(update);
  }

  const spawnI = () => {
    console.log('Spawning I');
    var update = new Array<coord>();
    for(var i = Tetris.SPAWN_COL; i < (Tetris.SPAWN_COL + Tetris.TETROMINO_SIZE); i++) {
      update.push({ y: Tetris.SPAWN_ROW, x: i });
    }
    setPosition(update);
    setValue('I');
  };

  const posDown = () => {
    var update = new Array<coord>();
    for(const p of position) {
      var newCoord: coord = { y: p.y + 1, x: p.x };
      if(!isCollision(newCoord, grid, position)) {
        update.push(newCoord);
      } else {
        return;
      }
    }
    updatePosition(update);
  };

  const posUp = () => { // for debugging
    var update = new Array<coord>();
    for(const p of position) {
      var newCoord: coord = { y: p.y - 1, x: p.x };
      if(!isCollision(newCoord, grid, position)) {
        update.push(newCoord);
      } else {
        return;
      }
    }
    updatePosition(update);
  }

  const posLeft = () => {
    var update = new Array<coord>();
    for(const p of position) {
      var newCoord: coord = { y: p.y, x: p.x - 1 };
      if(!isCollision(newCoord, grid, position)) {
        update.push(newCoord);
      } else {
        return;
      }
    }
    updatePosition(update);
  }

  const posRight = () => {
    var update = new Array<coord>();
    for(const p of position) {
      var newCoord: coord = { y: p.y, x: p.x + 1 };
      if(!isCollision(newCoord, grid, position)) {
        update.push(newCoord);
      } else {
        return;
      }
    }
    updatePosition(update);
  }

  const rotateLeft = () => {
    switch(value) {
      case 'I': rotateI(); break;
    }
  }

  const rotateRight = () => {
    switch(value) {
      case 'I': rotateI(); break;
    }
  }

  
  const rotateI = () => {
    const PIVOT = position[2]; // I-tetro rotates around position[2]
    var update = new Array<coord>();
    if(position[0].y === position[1].y) { // horizontal

      update.push({ y: PIVOT.y - 2, x: PIVOT.x });
      update.push({ y: PIVOT.y - 1, x: PIVOT.x });
      update.push(PIVOT);
      update.push({ y: PIVOT.y + 1, x: PIVOT.x });
    } else { // vertical

      update.push({ y: PIVOT.y, x: PIVOT.x - 2 });
      update.push({ y: PIVOT.y, x: PIVOT.x - 1 });
      update.push(PIVOT);
      update.push({ y: PIVOT.y, x: PIVOT.x + 1 });
    }
    for(var i = 0; i < update.length; i++) {
      if(i !== 2 && (isCollision(update[i], grid, null) || isRotationBlocked(position[i], update[i], PIVOT, grid, position)))
        return;
    }
    updatePosition(update);
  }




  useEffect(() => {
    if(!level)
      return;
    spawnI();
  }, [level])

  useEffect(() => {
    if(position.length == 0 || !value)
      return;

    updateGrid();
    // setTimeout(() => {
      
    // }, gravity)
  }, [position])



  // assumes there is an existing falling tetromino
  const updateGrid = () => {
    var update = [...grid];
    if(lastPosition.length > 0) {
      for(const p of lastPosition) {
        update[p.y][p.x] = Tetris.EMPTY_TILE;
      }
    }
    for(const p of position) {
      update[p.y][p.x] = value as tile;
    }
    setGrid(update);
  }

  useEffect(() => {
    document.onkeydown = (e) => {
      console.log(e.key);
      switch(e.key) {
        case 'ArrowDown': posDown(); break;
        case 'ArrowUp': posUp(); break;
        case 'ArrowLeft': posLeft(); break;
        case 'ArrowRight': posRight(); break;
        case 'z': rotateLeft(); break;
        case 'x': rotateRight(); break;
      }
    }
  }, [posDown, posUp])

  return (
    <div>

    </div>
  )

}

export default FallingTetromino;