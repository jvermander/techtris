export type TileType = 'I' | 'O' | 'J' | 'L' | 'S' | 'Z' | 'T' | '_';
export type Coordinate = {
  x: number, 
  y: number
};
export type GameStage = 'greeting' | 'setup' | 'play' | 'game_over';