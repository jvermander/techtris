import React, { useState, useEffect, useCallback } from 'react';
import { Tetris } from 'data/Tetris';
import { TileType, Coordinate, GameStage } from 'data/types';
import { findCompleteRows, findYCollisions } from 'functional';
import { Tile, FallingTetro } from 'components';
import 'styles/Grid.css';

type props = {}

const initGrid = (development: boolean = true) => {
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

const Grid: React.FC<props> = ({}) => {
  const [grid, setGrid] = useState<TileType[][]>(initGrid());
  const [level, setLevel] = useState<number>(0);
  const [stage, setStage] = useState<GameStage>('setup');
  const [tetrisModeEnd, setTetrisModeEnd] = useState<number>(-1);

  const [toDestroy, setToDestroy] = useState<number[]>([]);
  const [shadow, setShadow] = useState<Coordinate[]>([]);

  useEffect(() => {
    document.documentElement.style.setProperty('--tetris-duration', `${Tetris.TETRIS_DURATION}ms`);
    document.documentElement.style.setProperty('--tetris-mode-exit-transition', `${Tetris.TETRIS_MODE_EXIT_TRANSITION}ms`);
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
    
    var delay = 0;
    // Take a moment to animate a tetris
    if(toDestroy.length === 4) {
      delay = Tetris.TETRIS_DURATION;
    }
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

  const renderShadow = useCallback((collisions: Coordinate[]) => {
    setShadow(collisions);
  }, []);

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
  
  const getShadow = (i: number, j: number) => {
    if(shadow.findIndex((p) => ( p.y === i && p.x === j )) != -1)
      return 'top';
    else if(shadow.findIndex((p) => ( p.y - 1 === i && p.x === j && p.y === Tetris.ACTUAL_ROWS )) != -1)
      return 'bot';
    return 'none';
  }

  return(
    <>
      <div id='board' onClick={() => newGame() }>
      <FallingTetro gr={[grid, updateGrid, renderShadow]} st={[stage, setStage]} level={level} />
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
                    shadow={getShadow(i, j)}
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