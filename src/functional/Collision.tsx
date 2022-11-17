import { coord, tile, Tetris } from 'Tetris';

/*
  Returns true if a given coordinate already belongs to another tile in the grid or is not in the grid at all.
  If the coordinate already belongs to another tile, but is in the falling tetro's position,
  then this is not considered a collision, returning false (a tetro cannot collide with itself).

  Can optionally skip the above check by providing null in place of the position.
*/
export const isCollision = (toCheck: coord, grid: tile[][], position: coord[] | null): boolean => {
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
/*
  For the Y-axis, returns the shortest distance that can be travelled before a 
  collision is encountered for a given tetromino position.
*/
export const findYCollisionDist = (grid: tile[][], position: coord[]): number => {
  var candidates = new Array<coord>(); // first find all points in the position which are candidates for vertical collision
  for(const p of position) {
    var idx = candidates.findIndex((c) => c.x === p.x && c.y != p.y);
    if(idx != -1 && candidates[idx].y < p.y) {
      candidates.splice(idx, 1);
      candidates.push(p);
    } else if(idx == -1) {
      candidates.push(p);
    }
  }

  console.log('Candidates', candidates);

  var collisions = new Array<coord>();
  for(const c of candidates) { // for each candidate, search down its column for a non-empty tile
    var y = c.y + 1;
    while(y < Tetris.ACTUAL_ROWS && grid[y][c.x] === Tetris.EMPTY_TILE)
      y++;
    collisions.push({ x: c.x, y });
  }

  console.log('Collisions: ', collisions);

  // for each candidate and collision pair, return the shortest distance between the two, minus one
  var shortest = collisions[0].y - candidates[0].y;
  for(var i = 1; i < candidates.length; i++) {
    var dist = collisions[i].y - candidates[i].y;
    if(dist < shortest)
      shortest = dist; 
  }
  return shortest - 1;
}

// Deprecated:
// Check if there is a rotation blockage between two tiles, relative to some pivot
// This will only work for a max distance of 2 tiles from the pivot (as required).
const isRotationBlocked = (a: coord, b: coord, pivot: coord, grid: tile[][], position: coord[]) => {
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
