import React, { useEffect, useState, useRef, LegacyRef } from 'react'
import { Grid } from 'components'
import './App.css'

function App() {
  const [tetrisCount, setTetrisCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if(!ref || !ref.current || !tetrisCount)
      return;

      ref.current.style.transition = 'left 10s, top 10s, transform 10s';
    if(tetrisCount % 2 === 0) {
      ref.current.style.left = '-450vw';
      ref.current.style.top = '-450vh';
    } else {
      ref.current.style.left = '-550vw';
      ref.current.style.top = '-550vh';
    }
  }, [tetrisCount])

  const onTetrisEnd = () => {
    if(ref && ref.current) {
      ref.current.style.animation = 'space_float';
      ref.current.style.animationDuration = '1600s';
      ref.current.style.animationIterationCount = 'infinite';
    }
  }

  return (
    <>
    <div ref={ref as LegacyRef<HTMLDivElement>} onTransitionEnd={onTetrisEnd} id='bg'/>
      <div className='root'>
          <Grid setTetrisCount={setTetrisCount} />
      </div>
    </>
  );
}

export default App
