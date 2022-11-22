import React, { useState, useEffect, useCallback } from 'react';
import { Tetris } from 'data/Tetris';
import { TileType, Coordinate, GameStage } from 'data/types';
import { findCompleteRows } from 'functional';
import { Tile, FallingTetro } from 'components';
import 'styles/Grid.css';


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

function Grid() {
  const [grid, setGrid] = useState<TileType[][]>(initGrid());
  const [level, setLevel] = useState<number>(0);
  const [stage, setStage] = useState<GameStage>('setup');

  const [toDestroy, setToDestroy] = useState<number[]>([]);

  useEffect(() => {
    document.documentElement.style.setProperty('--tetris-duration', `${Tetris.TETRIS_DURATION}ms`);
  }, [])

  /*
    Update each coordinate in the given set with a particular type, and
    update each coordinate in the given stale set as empty.
    Effectively, this enables movement on screen.
  */
  const updateGrid = useCallback((position: Coordinate[], type: TileType): void => {
    var update = [...grid];
    for(const p of position) {
      update[p.y][p.x] = type as TileType;
    }
    var complete = findCompleteRows(grid, position);
    setToDestroy(complete);
    setGrid(update);
  }, [grid]);

  useEffect(() => {
    if(!toDestroy.length)
      return;
    
    // Take a moment to animate a tetris
    var delay = toDestroy.length === 4 ? Tetris.TETRIS_DURATION : 0;
    setTimeout(() => {
      concludeDestroy();
    }, delay);
  }, [toDestroy])

  const concludeDestroy = (): void => {
    var replacement = new Array<Array<TileType>>(0);
    var update = [...grid];
    for(const x of toDestroy) {
      update.splice(x, 1);
      replacement.push(new Array<TileType>(Tetris.COLS).fill(Tetris.EMPTY_TILE));
    }
    update = [...replacement, ...update];
    setGrid(update);
    setToDestroy([]);
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
    console.log('Game stage:', stage);
  }, [stage])

  useEffect(() => {
    console.log(JSON.stringify(grid));
  }, [grid])
  
  return(
    <>
      <div className='board' onClick={() => newGame() }>
      <FallingTetro gr={[grid, updateGrid]} st={[stage, setStage]} level={level} />
        {grid.map((row, i) => {
          return ( i >= Tetris.ACTUAL_ROWS - Tetris.DISPLAY_ROWS ?
            <div key={`k${i}`} className='row'>
              {row.map((sq, j) => {
                return (
                  <Tile 
                    key={`k${i}${j}`} 
                    id={`${i}${j}`} 
                    type={grid[i][j]}
                    magnitude={toDestroy.includes(i) ? toDestroy.length : 0}
                    tetris={toDestroy.length === 4}
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