import React, { useState, useEffect, useCallback } from 'react';
import { Tetris } from 'data/Tetris';
import { TileType, Coordinate, GameStage } from 'data/types';
import { findCompleteRows, findYCollisions } from 'functional';
import { Tile, FallingTetro } from 'components';
import 'styles/Grid.css';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
}

const initGrid = (development: boolean = false) => {
  var grid : TileType[][] = new Array<Array<TileType>>(Tetris.ACTUAL_ROWS);

  for(var i = 0; i < Tetris.ACTUAL_ROWS; i++) {
    if(i > 6 && development) {
      grid[i] = new Array<TileType>(Tetris.COLS).fill('O');
      grid[i][Tetris.COLS - 1] = '_';
    } else {
      grid[i] = new Array<TileType>(Tetris.COLS).fill('_');
    }

  }

  return grid;
}

const initMagnitude = () => {
  var magnitude: number[][] = new Array<Array<number>>(Tetris.ACTUAL_ROWS);
  for(var i = 3; i < Tetris.ACTUAL_ROWS; i++)
    magnitude[i] = new Array<number>(Tetris.COLS).fill(0);
  return magnitude;
}

const Grid: React.FC<props> = ({ st }) => {
  const [grid, setGrid] = useState<TileType[][]>(initGrid());
  const [level, setLevel] = useState<number>(0);
  const [stage, setStage] = st;
  const [toDestroy, setToDestroy] = useState<number[]>([]);
  const [magnitude, setMagnitude] = useState<number[][]>(initMagnitude());
  const [tetris, setTetris] = useState(false);  

  useEffect(() => {
    document.documentElement.style.setProperty('--tetris-duration', `${Tetris.TETRIS_DURATION}ms`);
  }, [])

  const updateGrid = useCallback((position: Coordinate[], type: TileType): void => {
    var update = [...grid];
    for(const p of position) {
      update[p.y][p.x] = type as TileType;
    }
    var complete = findCompleteRows(grid, position);
    var updateMag = [...magnitude];
    for(const i of complete) {
      for(var j = 0; j < Tetris.COLS; j++ ) {
        updateMag[i][j] = complete.length;
      }
    }
    setMagnitude(updateMag);
    setToDestroy(complete);
    if(complete.length === 4)
      setTetris(true);
    setGrid(update);
  }, [grid]);

  const concludeDestroy = (): void => {
    var replacement = new Array<Array<TileType>>(0);
    var update = [...grid];
    for(const x of toDestroy) {
      update.splice(x, 1);
      replacement.push(new Array<TileType>(Tetris.COLS).fill(Tetris.EMPTY_TILE));
    }
    update = [...replacement, ...update];
    setGrid(update);
    var updateMag = [...magnitude];
    for(const i of toDestroy) {
      for(var j = 0; j < Tetris.COLS; j++ ) {
        updateMag[i][j] = 0;
      }
    }
    setMagnitude(updateMag);
    setToDestroy([]);
    setTetris(false);
  }

  const newGame = () => {
    if(stage === 'game_over')
      setGrid(initGrid());
    setStage('play');
  }

  useEffect(() => {
    if(!level)
      return;
    console.log(`Now on level ${level}`);
  }, [level])

  useEffect(() => {
    if(stage === 'play')
      newGame();
    console.log('Game stage:', stage);
  }, [stage])

  useEffect(() => {
    // console.log(JSON.stringify(grid));
    if(toDestroy.length > 0)
      concludeDestroy();
  }, [grid])
  
  return(
    <>
      <div id='board'>
      <FallingTetro gr={[grid, updateGrid]} st={[stage, setStage]} level={level} />
        {grid.map((row, i) => {
          return ( i >= Tetris.ACTUAL_ROWS - Tetris.DISPLAY_ROWS ?
            <div key={`k${i}`} className='row'>
              {row.map((sq, j) => {
                return (
                  <Tile 
                    key={`k${i}${j}`} 
                    type={grid[i][j]}
                    magnitude={magnitude[i][j]}
                    tetris={tetris}
                  />
                  );
                })}
            </div> : null
          );
        })}
      </div>
    </>
   )
}

export default Grid;