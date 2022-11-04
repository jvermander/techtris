import React, { useState, useEffect, useCallback } from 'react';
import { Tetris, tile } from 'Tetris';
import { Tile, FallingTetro } from 'components';
import 'styles/Grid.css';


const initGrid = () => {
  var grid : tile[][] = new Array<Array<tile>>(Tetris.ACTUAL_ROWS);

  for(var i = 0; i < Tetris.ACTUAL_ROWS; i++) {
    grid[i] = new Array<tile>(Tetris.COLS).fill('_'); 
  }

  grid[7][3] = 'O';
  grid[10][9] = 'O';
  grid[17][5] = 'O';
  grid[17][3] = 'O';

  return grid;
}

function Grid() {
  const [grid, setGrid] = useState<tile[][]>(initGrid());
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    if(!level)
      return;
    console.log(`Now on level ${level}`);
  }, [level])
  
  return(
    <>
      <FallingTetro gr={[grid, setGrid]} level={level}/>
      <div className='board' onClick={() => setLevel(1) }>
        {grid.map((row, i) => {
          return ( i >= Tetris.ACTUAL_ROWS - Tetris.DISPLAY_ROWS ?
            <div key={`k${i}`} className='row'>
              {row.map((sq, j) => {
                return (
                  <Tile key={`k${i}${j}`} value={grid[i][j]}/>
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