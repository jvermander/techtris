import { TileType, Coordinate } from 'data/types';

export const getRotation = (type: TileType, p: Coordinate, i: number) => {
  switch(type) {
    case 'O': return getORotation(p, i);
    case 'I': return getIRotation(p, i);
    case 'L': return getLRotation(p, i);
    case 'J': return getJRotation(p, i);
    case 'S': return getSRotation(p, i);
    case 'Z': return getZRotation(p, i);
    case 'T': return getTRotation(p, i);
    default: return [];
  }
}

const getORotation = (p: Coordinate, i: number) => {
  return [
    { x: p.x - 1, y: p.y },
    { ...p },
    { x: p.x - 1, y: p.y + 1 },
    { x: p.x, y: p.y + 1 }
  ];
}

const getIRotation = (p: Coordinate, i: number) => {
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

const getLRotation = (p: Coordinate, i: number) => {
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

const getJRotation = (p: Coordinate, i: number) => {
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

const getSRotation = (p: Coordinate, i: number) => {
  switch(i) {
    case 0: 
      return [
        { x: p.x - 1, y: p.y + 1 },
        { x: p.x, y: p.y + 1 },
        { ...p },
        { x: p.x + 1, y: p.y }
      ];
    case 1:
      return [
        { x: p.x + 1, y: p.y + 1 },
        { x: p.x + 1, y: p.y },
        { ...p },
        { x: p.x, y: p.y - 1 }
      ]
    default: 
      return [];
  }
}

const getZRotation = (p: Coordinate, i: number) => {
  switch(i) {
    case 0:
      return [
        { x: p.x - 1, y: p.y },
        { ...p },
        { x: p.x, y: p.y + 1 },
        { x: p.x + 1, y: p.y + 1 }
      ];
    case 1:
      return [
        { x: p.x, y: p.y - 1 },
        { ...p },
        { x: p.x - 1, y: p.y },
        { x: p.x - 1, y: p.y + 1}
      ];
    default: 
      return [];
  }
}

const getTRotation = (p: Coordinate, i: number) => {
  switch(i) {
    case 0:
      return [
        { x: p.x - 1, y: p.y },
        { ...p },
        { x: p.x, y: p.y + 1 },
        { x: p.x + 1, y: p.y }
      ];
    case 1:
      return [
        { x: p.x, y: p.y - 1 },
        { ...p },
        { x: p.x - 1, y: p.y },
        { x: p.x, y: p.y + 1 }
      ];
    case 2:
      return [
        { x: p.x + 1, y: p.y },
        { ...p },
        { x: p.x, y: p.y - 1 },
        { x: p.x - 1, y: p.y }
      ];
    case 3:
      return [
        { x: p.x, y: p.y + 1},
        { ...p },
        { x: p.x + 1, y: p.y },
        { x: p.x, y: p.y - 1}
      ];
    default: 
      return [];
  }
}