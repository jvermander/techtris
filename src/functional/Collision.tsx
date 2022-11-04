import { coord, tile, Tetris } from 'Tetris';

// Returns true if a given coordinate already belongs to another tile in the grid,
// provided the tile does not belong to the falling tetromino; false otherwise.
// Can specify null in place of position if it is already known that the checked coord is not in the falling tetromino.
export const isCollision = (toCheck: coord, grid: tile[][], position: coord[] | null) => {
  if(toCheck.y < 0 || toCheck.y >= Tetris.ACTUAL_ROWS || toCheck.x < 0 || toCheck.x >= Tetris.COLS)
    return true;

  if(position) {
    for(const p of position) {
      if(toCheck.y == p.y && toCheck.x == p.x)
        return false;
    }
  }

  return grid[toCheck.y][toCheck.x] != Tetris.EMPTY_TILE;
}

// Check if there is a rotation blockage between two tiles, relative to some pivot
// This will only work for a max distance of 2 tiles from the pivot (as required).
export const isRotationBlocked = (a: coord, b: coord, pivot: coord, grid: tile[][], position: coord[]) => {
  const a_x_diff = a.x - pivot.x;
  const a_y_diff = a.y - pivot.y;
  const b_x_diff = b.x - pivot.x;
  const b_y_diff = b.y - pivot.y;

  // acquire the non-zero differences relative to the pivot
  const xDiff = a_x_diff ? a_x_diff : b_x_diff;
  const yDiff = a_y_diff ? a_y_diff : b_y_diff;
  const xTile = a_x_diff ? a : b;
  const yTile = a_y_diff ? a : b;

  return (

    (xDiff > 0 && yDiff > 0 &&
    (isCollision({ x: xTile.x, y: xTile.y + 1 }, grid, position) || 
     isCollision({ x: yTile.x + 1, y: yTile.y }, grid, position) ))

    ||

    (xDiff > 0 && yDiff < 0 &&
    (isCollision({ x: xTile.x, y: xTile.y - 1 }, grid, position) ||
     isCollision({ x: yTile.x + 1, y: yTile.y }, grid, position) ))

    ||

    (xDiff < 0 && yDiff > 0 &&
    (isCollision({ x: xTile.x, y: xTile.y + 1 }, grid, position) || 
     isCollision({ x: yTile.x - 1, y: yTile.y }, grid, position) ))

    ||

    (xDiff < 0 && yDiff < 0 &&
    (isCollision({ x: xTile.x, y: xTile.y - 1 }, grid, position) ||
     isCollision({ x: yTile.x - 1, y: yTile.y }, grid, position) ))

  );
}
