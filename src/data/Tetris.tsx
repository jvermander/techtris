import { TileType } from "./types";

export const Tetris = {
  DISPLAY_ROWS: 20,
  ACTUAL_ROWS: 23,
  COLS: 10,
  NUM_TETROS: 7,
  TETRO_SIZE: 4,
  SPAWN_COL: 5,
  SPAWN_ROW: 3,

  I_TILE: 'I' as TileType,
  O_TILE: 'O' as TileType,
  J_TILE: 'J' as TileType,
  L_TILE: 'L' as TileType,
  S_TILE: 'S' as TileType,
  Z_TILE: 'Z' as TileType,
  T_TILE: 'T' as TileType,
  EMPTY_TILE: '_' as TileType,

  O_PIVOT_IDX: 0,
  O_NUM_ROTATIONS: 1,

  I_PIVOT_IDX: 2,
  I_NUM_ROTATIONS: 2,

  L_PIVOT_IDX: 2,
  L_NUM_ROTATIONS: 4,

  J_PIVOT_IDX: 1,
  J_NUM_ROTATIONS: 4,

  S_PIVOT_IDX: 2,
  S_NUM_ROTATIONS: 2,

  Z_PIVOT_IDX: 1,
  Z_NUM_ROTATIONS: 2,

  T_PIVOT_IDX: 1,
  T_NUM_ROTATIONS: 4,

};

// for randomization
export const roulette = [ 
  Tetris.I_TILE, 
  Tetris.J_TILE,
  Tetris.L_TILE,
  Tetris.O_TILE,
  Tetris.S_TILE,
  Tetris.T_TILE,
  Tetris.Z_TILE
];