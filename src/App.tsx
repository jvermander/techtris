import React, { useEffect, useState, useRef, LegacyRef } from 'react'
import { Grid, Greeting } from 'components'
import { GameStage } from 'data/types';
import './App.css'

function App() {
  const [stage, setStage] = useState<GameStage>('setup');
  const ref = useRef<HTMLDivElement>();

  return (
    <>
      <div ref={ref as LegacyRef<HTMLDivElement>} id='bg'/>
      <div className='root' onClick={(e) => setStage('play')}>
        <Greeting st={[ stage, setStage ]} display={stage === 'setup' ? 'flex' : 'none'} />
        <Grid st={[stage, setStage ]} />
      </div>
    </>
  );
}

export default App
