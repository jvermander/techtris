import React, { useState, useEffect, useCallback } from 'react';
import { Tetris } from 'data/Tetris';
import { TileType, GameStage } from 'data/types';
import { Tile, FallingTetro } from 'components';
import 'styles/Grid.css';


const initGrid = () => {
  var grid : TileType[][] = new Array<Array<TileType>>(Tetris.ACTUAL_ROWS);

  for(var i = 0; i < Tetris.ACTUAL_ROWS; i++) {
    grid[i] = new Array<TileType>(Tetris.COLS).fill('_'); 
  }

  // grid[7][3] = 'O';
  // grid[10][9] = 'O';
  // grid[17][5] = 'O';
  // grid[17][3] = 'O';

  return grid;
}

function Grid() {
  const [grid, setGrid] = useState<TileType[][]>(initGrid());
  const [level, setLevel] = useState<number>(0);
  const [stage, setStage] = useState<GameStage>('setup');

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
      <FallingTetro gr={[grid, setGrid]} st={[stage, setStage]} level={level} />
      <div className='board' onClick={() => newGame() }>
        {grid.map((row, i) => {
          return ( i >= Tetris.ACTUAL_ROWS - Tetris.DISPLAY_ROWS ?
            <div key={`k${i}`} className='row'>
              {row.map((sq, j) => {
                return (
                  <Tile key={`k${i}${j}`} type={grid[i][j]}/>
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