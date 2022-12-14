import React, { useEffect, useState, useRef } from 'react';
import { TileType, Coordinate } from 'data/types';
import { Tetris } from 'data/Tetris';

const Kaboom = {
  DURATION: ['1000ms', '1000ms', '1000ms', '1500ms'],
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

const TileAnimator: React.FC<props> = ({ type, magnitude }) => {
  const [threads, setThreads] = useState<(JSX.Element | null)[]>([null, null]);
  const threadsRef = useRef<(JSX.Element | null)[]>(threads);
  const [randomized, setRandomized] = useState<Velocity[]>([]);
  threadsRef.current = threads;
  
  useEffect(() => {
    var update = new Array<Velocity>(4);
    for(var i = 0; i < update.length; i++) {
      update[i] = { x: getRandVelocity('x', i + 1), y: getRandVelocity('y', i + 1) }
    }
    setRandomized(update);
  }, [])

  useEffect(() => {
    if(!magnitude)
      return;
    
    var delay = magnitude === 4 ? Tetris.TETRIS_DURATION : 0; 
    setTimeout(() => {
      allocate(!threadsRef.current[0] ? 0 : 1, type, magnitude);
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
            '--kaboom-duration': Kaboom.DURATION[magnitude - 1]
          } as React.CSSProperties}
          onAnimationEnd={(e) => { if(e.animationName == 'kaboom') deallocate(i)} }
        />
    var update = [...threadsRef.current];
    update[i] = animation;
    setThreads(update);
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
  
  // useEffect(() => {
  //   console.log('Queue', queue)
  //   console.log('Threads', threads)
  // })

  return (
    <div>
      {threads.map((animation) => animation)}
    </div>
  );
}

export default TileAnimator;