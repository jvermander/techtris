import React, { useEffect, useState, useRef, LegacyRef } from 'react'
import { Greeting, HUD } from 'components'
import { GameStage } from 'data/types';
import reactlogo from 'assets/images/react.png';
import './App.css'

function App() {
  const [stage, setStage] = useState<GameStage>('setup');
  const ref = useRef<HTMLDivElement>();

  return (
    <>
      <div ref={ref as LegacyRef<HTMLDivElement>} id='bg'/>
      <div className='root'>
        <Greeting st={[ stage, setStage ]} />
        <HUD st={[ stage, setStage ]} />
        {/* <Summary /> */}
      </div>
      <div className='watermark'>Powered by React<img width='20px' style={{marginLeft: '0.3em'}} src={reactlogo} /></div>
    </>
  );
}

export default App
