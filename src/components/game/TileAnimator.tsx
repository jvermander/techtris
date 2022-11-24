import React, { useEffect, useState, useRef } from 'react';
import { TileType, Coordinate } from 'data/types';
import { Tetris } from 'data/Tetris';

const Kaboom = {
  DURATION: ['750ms', '750ms', '750ms', '1500ms'],
  MIN_X: [20, 40, 100, 80],
  MAX_X: [60, 100, 150, 400],
  MIN_Y: [20, 40, 100, 80],
  MAX_Y: [40, 80, 150, 380],
  MIN_SPIN: 180,
  MAX_SPIN: 1080,
}

type props = {
  type: TileType;
  magnitude: number;
}

type Velocity = {
  x: string;
  y: string;
}

/*
   Supports arbitrarily many concurrent animations for a tile,
   depending on what is requested by the grid.
   Proper care is taken to avoid memory leaks and excessive performance loss.
*/
const TileAnimator: React.FC<props> = ({ type, magnitude }) => {
  const [threads, setThreads] = useState<(JSX.Element | null)[]>([null]);
  const threadsRef = useRef<(JSX.Element | null)[]>(threads);
  const [randomized, setRandomized] = useState<Velocity[]>([]);
  threadsRef.current = threads;
  
  useEffect(() => {
    var update = new Array<Velocity>(5);
    for(var i = 0; i < update.length - 1; i++) {
      update[i] = { x: getRandVelocity('x', i + 1), y: getRandVelocity('y', i + 1) }
    }
    update[update.length - 1] = { x: getRandSpin(), y: '0' };
    setRandomized(update);
  }, [])

  useEffect(() => {
    if(!magnitude)
      return;

    var delay = magnitude === 4 ? Tetris.TETRIS_DURATION : 0; 
    setTimeout(() => {
      allocate(0, type, magnitude);
    }, delay);
  }, [magnitude])

  const deallocate = (i: number) => {
    var update = [...threadsRef.current];
    update[i] = null;
    setThreads(update);
  }

  const allocate = (i: number, type: TileType, magnitude: number, more: boolean = false) => {
    var animation = 
        <div 
          key={`${i}`}
          className={`${type} tile kaboom`} 
          style={{
            '--distX': randomized[magnitude - 1].x,
            '--distY': randomized[magnitude - 1].y,
            '--spin': magnitude === 4 ? randomized[randomized.length - 1].x : '0deg',
            '--kaboom-duration': Kaboom.DURATION[magnitude - 1]
          } as React.CSSProperties}
          onAnimationEnd={(e) => { if(e.animationName == 'kaboom') deallocate(i)} }
        />
    var update = [...threadsRef.current];
    update[i] = animation;
    setThreads(update);
  }

  const getRandSpin = () => {
    var min = Kaboom.MIN_SPIN;
    var max = Kaboom.MAX_SPIN;
    var spin = Math.floor(Math.random() * (max - min) + min) * -1;
    return `${spin}deg`;
  }

  const getRandVelocity = (axis: 'x' | 'y', magnitude: number): string => {
    var velocity, min, max;
    min = axis === 'x' ? Kaboom.MIN_X[magnitude - 1] : Kaboom.MIN_Y[magnitude - 1];
    max = axis === 'x' ? Kaboom.MAX_X[magnitude - 1] : Kaboom.MAX_Y[magnitude - 1];
    velocity = Math.floor(Math.random() * (max - min) + min) * -1;
    if(axis === 'x')
      velocity *= Math.random() >= 0.5 ? 1 : -1;
    
    return `${velocity}px`;
  }
  
  useEffect(() => {

  }, [])

  return (
    <div>
      {threads.map((animation) => animation)}
    </div>
  );
}

export default TileAnimator;