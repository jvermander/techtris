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

  TETRIS_DURATION: 250,
  TETRIS_MODE_DURATION: 10000,
  TETRIS_MODE_EXIT_TRANSITION: 250,
  FALLING_TRANSITION_DURATION: 200,

  INIT_GRAVITY: 150,

  BASE_PLACEMENT_SCORE: 11
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

export const gravityByLevel = [ //todo animation speed
  800,
  717,
  633,
  550,
  467,
  383,
  320,
  280,
  200,
  150,
  100,
  80,
  50,
  30,
]

export const scoreMultiplierByLines = [
  0,
  40,
  100,
  300,
  1200
]

const colorByLevel = {
  colorA: ['purple', 'purple', 'cyan', '#01b701', '#ff3b5c', '#E3B448', '#6fff6f', 'gold', 'red', '#4646ff', 'orange', 'silver', 'silver', 'red' ],
  colorB: ['#2d002d', '#2d002d', 'blue', 'darkgreen', 'purple', '#3A6B35', '#de0094', '#4d004d', 'darkslategrey', '#67000c', 'blue', 'red', '#063232', 'black']
}

export const colorByTypeByLevel = {
  'I': colorByLevel.colorA,
  'Z': colorByLevel.colorB,
}
