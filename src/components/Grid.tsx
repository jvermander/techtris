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
  const [grid, setGrid] = useState<TileType[][]>(initGrid(true));
  const [level, setLevel] = useState<number>(0);
  const [stage, setStage] = useState<GameStage>('setup');

  const [toDestroy, setToDestroy] = useState<number[]>([]);

  /*
    Update each coordinate in the given set with a particular type, and
    update each coordinate in the given stale set as empty.
    Effectively, this enables movement on screen.
  */
  const updateGrid = useCallback((position: Coordinate[], type: TileType, lastPosition: Coordinate[]): void => {
    var update = [...grid];
    if(lastPosition.length > 0) {
      for(const p of lastPosition) {
        update[p.y][p.x] = Tetris.EMPTY_TILE;
      }
    }
    for(const p of position) {
      update[p.y][p.x] = type as TileType;
    }
    setGrid(update);
  }, [grid]);

  const commenceDestroy = useCallback((position: Coordinate[]): number => {
    var complete = findCompleteRows(grid, position);
    if(complete.length === 0)
      return 0;
    setToDestroy(complete);
    return complete.length;
  }, [grid])

  useEffect(() => {
    if(!toDestroy.length)
      return;
    concludeDestroy();
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
    // console.log(JSON.stringify(grid));
  }, [grid])
  
  return(
    <>
      <FallingTetro gr={[grid, updateGrid, commenceDestroy]} st={[stage, setStage]} level={level} />
      <div className='board' onClick={() => newGame() }>
        {grid.map((row, i) => {
          return ( i >= Tetris.ACTUAL_ROWS - Tetris.DISPLAY_ROWS ?
            <div key={`k${i}`} className='row'>
              {row.map((sq, j) => {
                return (
                  <Tile key={`k${i}${j}`} type={grid[i][j]} magnitude={toDestroy.includes(i) ? toDestroy.length : 0}/>
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