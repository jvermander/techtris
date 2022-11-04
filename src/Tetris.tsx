export type tile = 'I' | 'O' | 'J' | 'L' | 'S' | 'Z' | 'T' | '_';
export type coord = {
  x: number, 
  y: number
};

export const Tetris = {
  DISPLAY_ROWS: 20,
  ACTUAL_ROWS: 23,
  COLS: 10,
  TETROMINO_SIZE: 4,
  SPAWN_COL: 5,
  SPAWN_ROW: 3,

  I_TILE: 'I' as tile,
  O_TILE: 'O' as tile,
  J_TILE: 'J' as tile,
  L_TILE: 'L' as tile,
  S_TILE: 'S' as tile,
  Z_TILE: 'Z' as tile,
  T_TILE: 'T' as tile,
  EMPTY_TILE: '_' as tile,

  I_PIVOT_IDX: 2,
  I_NUM_ROTATIONS: 2,

  J_PIVOT_IDX: 1,
  J_NUM_ROTATIONS: 4,

  L_PIVOT_IDX: 2,
  L_NUM_ROTATIONS: 4

};