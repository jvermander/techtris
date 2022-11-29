import React, { useEffect, useState, useRef, LegacyRef, useContext } from 'react'
import { GreetingDialog, HUD, MusicPlayer } from 'components'
import { AudioProvider } from 'contexts';
import { GameStage } from 'data/types';
import reactlogo from 'assets/images/react.png';
import './App.css'

function App() {
  const [stage, setStage] = useState<GameStage>('greeting');

  useEffect(() => {
    document.documentElement.ontouchmove = (e) => { e.preventDefault() }
    document.title = 'Techtris'
  }, [])

  return (
    <AudioProvider>
      <div className='root'>
        <div id='bg' />
        <GreetingDialog st={[stage, setStage]} />
        <HUD st={[stage, setStage]} />
        <MusicPlayer />
      </div>
      <div className='watermark'>Powered by React <img src={reactlogo} style={{ width: '2em', marginLeft: '0.5em'}}/></div>
    </AudioProvider>
  );
}

export default App
