import { Tetris } from 'data/Tetris';
import { TileType, Coordinate } from 'data/types';

/*
  Returns true if a given coordinate already belongs to another tile in the grid or is not in the grid at all.
  If the coordinate already belongs to another tile, but is in the falling tetro's position,
  then this is not considered a collision, returning false (a tetro cannot collide with itself).

*/
export const isCollision = (toCheck: Coordinate, grid: TileType[][], chkSpawn: boolean = false): boolean => {
  if(!chkSpawn && (toCheck.y < 0 || toCheck.y >= Tetris.ACTUAL_ROWS || toCheck.x < 0 || toCheck.x >= Tetris.COLS))
    return true;

  return grid[toCheck.y][toCheck.x] != Tetris.EMPTY_TILE;
}

/* 
  Along the Y-axis, returns the nearest collision tiles for the given position. 
*/
export const findYCollisions = (grid: TileType[][], position: Coordinate[]) => {
  var candidates = findDistinct('x', position); // find all points in the position which are candidates for vertical collision

  var collisions = new Array<Coordinate>();
  for(const c of candidates) { // for each candidate, search down its column for a non-empty tile
    var y = c.y + 1;
    while(y < Tetris.ACTUAL_ROWS && grid[y][c.x] === Tetris.EMPTY_TILE)
      y++;
    collisions.push({ x: c.x, y });
  }
  return collisions;
}

/*
  Along the Y-axis, returns the shortest distance that can be travelled before a 
  collision is encountered for a given tetromino position.
*/
export const findYCollisionDist = (grid: TileType[][], position: Coordinate[]): number => {
  var candidates = findDistinct('x', position); 
  var collisions = findYCollisions(grid, position);

  // for each candidate and collision pair, return the shortest distance between the two, minus one
  var shortest = collisions[0].y - candidates[0].y;
  for(var i = 1; i < candidates.length; i++) {
    var dist = collisions[i].y - candidates[i].y;
    if(dist < shortest)
      shortest = dist; 
  }
  return shortest - 1;
}

/*
  For some axis Z and position P,
  return all coordinates in P that have a distinct Z value.

  If two coordinates have the same Z value, 
  include the one with the greater value on the other axis.
*/
const findDistinct = (axis: 'x' | 'y', position: Coordinate[]): Coordinate[] => {
  var candidates = new Array<Coordinate>();
  for(const p of position) {
    var idx = candidates.findIndex((c) => { // find duplicates
      return axis === 'x' ? 
        c.x === p.x && c.y != p.y :
        c.y === p.y && c.x != p.x
    });
    if(idx != -1 && 
      ((axis === 'x' && candidates[idx].y < p.y) || 
      (axis === 'y' && candidates[idx].x < p.x))) { // discard duplicates
      candidates.splice(idx, 1);
      candidates.push(p);
    } else if(idx == -1) {
      candidates.push(p);
    }
  }
  return candidates;
}

/*
  Returns an array of row numbers that are made complete by the given position.
  This array is sorted in decreasing order to enable easy splices on the whole grid.
*/
export const findCompleteRows = (grid: TileType[][], position: Coordinate[]): number[] => {
  var complete = new Array<number>();
  var candidates = findDistinct('y', position);
  for(const c of candidates) {
    var x = 0;
    while(x < Tetris.COLS && 
      (grid[c.y][x] !== Tetris.EMPTY_TILE || 
       position.findIndex((p) => (p.y === c.y && p.x === x)) !== -1)) {
      x++;
    }
    // sorted insertion
    if(x === Tetris.COLS) {
      var i = 0;
      while(i < complete.length && complete[i] >= c.y) {
        i++;
      }
      if(i === complete.length)
        complete.push(c.y);
      else
        complete.splice(i, 0, c.y);
    }
  }
  return complete;
}
