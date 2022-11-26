import React, { useState, useEffect, useCallback } from 'react';
import { Tetris, scoreMultiplierByLines } from 'data/Tetris';
import { TileType, Coordinate, GameStage } from 'data/types';
import { findCompleteRows, findYCollisions } from 'functional';
import { Tile, FallingTetro } from 'components';
import 'styles/HUD.css';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ],
  nx: [ next: TileType, setNext: React.Dispatch<React.SetStateAction<TileType>> ],
  lv: [ level: number, setLevel: React.Dispatch<React.SetStateAction<number>>],
  sc: [ score: number, setScore: React.Dispatch<React.SetStateAction<number>>]
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

const Grid: React.FC<props> = ({ st, nx, lv, sc }) => {
  const [stage, setStage] = st;
  const [next, setNext] = nx;
  const [level, setLevel] = lv;
  const [score, setScore] = sc;

  const [grid, setGrid] = useState<TileType[][]>(initGrid());
  const [toDestroy, setToDestroy] = useState<number[]>([]);
  const [magnitude, setMagnitude] = useState<number[][]>(initMagnitude());
  const [isTetris, setIsTetris] = useState(false);  
  const [linesCleared, setLinesCleared] = useState<number>(0);

  useEffect(() => {
    document.documentElement.style.setProperty('--tetris-duration', `${Tetris.TETRIS_DURATION}ms`);
    document.documentElement.style.setProperty('--falling-transition-duration', `${Tetris.FALLING_TRANSITION_DURATION}ms`);
    
  }, [])

  const updateGrid = useCallback((position: Coordinate[], type: TileType): void => {
    var update = [...grid];
    for(const p of position) {
      update[p.y][p.x] = type as TileType;
    }
    var complete = findCompleteRows(grid, position);
    var additionalScore = 0;
    if(complete.length > 0) {
      var updateMag = [...magnitude];
      for(const i of complete) {
        for(var j = 0; j < Tetris.COLS; j++ ) {
          updateMag[i][j] = complete.length;
        }
      }
      setMagnitude(updateMag);
      setToDestroy(complete);
      additionalScore = scoreMultiplierByLines[complete.length] * (level + 1)
      setLinesCleared(prev => prev + complete.length);
      if(complete.length === 4)
        setIsTetris(true);
    }
    setScore(prev => prev + Tetris.BASE_PLACEMENT_SCORE + additionalScore);
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
    setIsTetris(false);
  }

  useEffect(() => {
    console.log()
    if((level <= 10 && linesCleared >= level * 10 + 10) || (level > 10 && linesCleared >= (2 * level - 9) * 10))
      setLevel(prev => prev + 1);
    console.log('Lines cleared', linesCleared);
  }, [linesCleared])

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
      <FallingTetro 
        gr={[grid, updateGrid]} 
        st={[stage, setStage]} 
        level={level} nx={[next, setNext]} 
        destroyPending={toDestroy.length > 0}
      />
        {grid.map((row, i) => {
          return ( i >= Tetris.ACTUAL_ROWS - Tetris.DISPLAY_ROWS ?
            <div key={`k${i}`} className='row'>
              {row.map((sq, j) => {
                return (
                  <Tile 
                    key={`k${i}${j}`} 
                    type={grid[i][j]}
                    magnitude={magnitude[i][j]}
                    isTetris={isTetris}
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