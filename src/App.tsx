import React, { useEffect, useState, useRef, LegacyRef } from 'react'
import { GreetingDialog, HUD } from 'components'
import { GameStage } from 'data/types';
import reactlogo from 'assets/images/react.png';
import './App.css'

function App() {
  const [stage, setStage] = useState<GameStage>('greeting');

  return (
    <>
      <div id='bg'/>
      <div className='root'>
        <GreetingDialog st={[ stage, setStage ]} />
        <HUD st={[ stage, setStage ]} />
      </div>
      <div className='watermark'>Powered by React<img width='20px' style={{marginLeft: '0.3em'}} src={reactlogo} /></div>
    </>
  );
}

export default App
