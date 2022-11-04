import { coord, tile } from 'Tetris';

export const getRotation = (type: tile, p: coord, i: number) => {
  switch(type) {
    case 'I': return getIRotation(p, i);
    case 'J': return getJRotation(p, i);
    case 'L': return getLRotation(p, i);
    default: return [];
  }
}

// I rotates around position[2]
const getIRotation = (p: coord, i: number) => {
  switch(i) {
    case 0:
      return [
        { x: p.x - 2, y: p.y },
        { x: p.x - 1, y: p.y },
        { ...p },
        { x: p.x + 1, y: p.y }
      ];
    case 1:
      return [
        { x: p.x, y: p.y - 2 },
        { x: p.x, y: p.y - 1 },
        { ...p },
        { x: p.x, y: p.y + 1 }
      ];
    default:
      return [];
  }
};

// J rotates around position[1]
const getJRotation = (p: coord, i: number) => {
  switch(i) {
    case 0:
      return [
        { x: p.x - 1, y: p.y },
        { ...p },
        { x: p.x + 1, y: p.y },
        { x: p.x + 1, y: p.y + 1 }
      ];
    case 1:
      return [
        { x: p.x, y: p.y - 1 },
        { ...p },
        { x: p.x, y: p.y + 1 },
        { x: p.x - 1, y: p.y + 1 }
      ];
    case 2:
      return [
        { x: p.x + 1, y: p.y },
        { ...p },
        { x: p.x - 1, y: p.y },
        { x: p.x - 1, y: p.y - 1 }
      ];
    case 3:
      return [
        { x: p.x, y: p.y + 1 },
        { ...p },
        { x: p.x, y: p.y - 1 },
        { x: p.x + 1, y: p.y - 1 }
      ];
    default:
      return [];
  }
}

// L rotates around position[2]
const getLRotation = (p: coord, i: number) => {
  switch(i) {
    case 0:
      return [
        { x: p.x - 1, y: p.y + 1 },
        { x: p.x - 1, y: p.y },
        { ...p },
        { x: p.x + 1, y: p.y }
      ];
    case 1:
      return [
        { x: p.x - 1, y: p.y - 1 },
        { x: p.x, y: p.y - 1 },
        { ...p },
        { x: p.x, y: p.y + 1 }
      ];
    case 2:
      return [
        { x: p.x + 1, y: p.y - 1 },
        { x: p.x + 1, y: p.y },
        { ...p },
        { x: p.x - 1, y: p.y }
      ];
    case 3:
      return [
        { x: p.x + 1, y: p.y + 1 },
        { x: p.x, y: p.y + 1 },
        { ...p },
        { x: p.x, y: p.y - 1 }
      ]
    default:
      return [];
  }
}

