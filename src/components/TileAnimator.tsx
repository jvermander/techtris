import React, { useEffect, useState, useRef } from 'react';
import { TileType } from 'data/types';
import { Tetris } from 'data/Tetris';

const Kaboom = {
  DURATION: ['2500ms', '500ms', '500ms', '2000ms'],
  MIN_X: [200, 200, 200, 100],
  MAX_X: [400, 400, 400, 200],
  MIN_Y: [200, 200, 200, 100],
  MAX_Y: [400, 400, 400, 200]
}

type props = {
  type: TileType;
  magnitude: number;
}

/*
   Supports arbitrarily many concurrent animations for a tile,
   depending on what is requested by the grid.
   Proper care is taken to avoid memory leaks and excessive performance loss.
*/
const TileAnimator: React.FC<props> = ({ type, magnitude }) => {
  const [queue, setQueue] = useState<number[]>([0]);
  const [threads, setThreads] = useState<(JSX.Element | null)[]>([null]);
  const threadsRef = useRef<(JSX.Element | null)[]>(threads);
  const queueRef = useRef<number[]>(queue);
  threadsRef.current = threads;
  queueRef.current = queue;
  
  useEffect(() => {
    if(magnitude) {
      if(queue.length > 0) { // available threads
        allocate(queue[0], type, magnitude);
        var update = [...queue];
        update.splice(0, 1); // dequeue
        setQueue(update);
      } else { // all threads busy, must allocate another
        allocate(threads.length, type, magnitude, true);
      }
    }
  }, [magnitude])

  const deallocate = (i: number) => {
    var update = [...threadsRef.current];
    update[i] = null;
    setThreads(update);
    var idxUpdate = [...queueRef.current];
    idxUpdate.push(i); // enqueue
    setQueue(idxUpdate);
  }

  const allocate = (i: number, type: TileType, magnitude: number, more: boolean = false) => {
    var animation = 
        <div 
          key={`${i}`}
          className={`${type} tile kaboom`} 
          style={{
            '--distX': getRandVelocity('x', magnitude),
            '--distY': getRandVelocity('y', magnitude),
            '--duration': Kaboom.DURATION[magnitude - 1]
          } as React.CSSProperties}
          onAnimationEnd={(e) => deallocate(i)}
        />
    var update = [...threads];
    if(more)
      update.push(animation);
    else
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
  
  useEffect(() => {
    // if(magnitude)
      // console.log('Threads:', threads);
  }, [threads])

  return (
    <div>
      {threads.map((animation) => animation)}
    </div>
  );
}

export default TileAnimator;