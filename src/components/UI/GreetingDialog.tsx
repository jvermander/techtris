import React, { useState, useContext } from 'react';
import { Button } from 'components';
import { GameStage } from 'data/types';
import { AudioContext } from 'contexts';
import 'styles/Dialog.css';
import logo from 'assets/images/logoclean.png';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
}

const GreetingDialog: React.FC<props> = ({ st }) => {
  const [stage, setStage] = st;
  const [tutorial, setTutorial] = useState<boolean>(false);
  const [playAudio, isPermitted, setIsPermitted] = useContext(AudioContext);

  return (
    <div className={'greeting-ctn'} style={{ display: stage === 'greeting' ? 'flex' : 'none' }}>
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          transition: 'opacity 1s ease', 
          opacity: tutorial ? '0' : '1', 
          zIndex: 1, pointerEvents: 
          tutorial ? 'none' : 'auto',
        }}
      >
        <img className='logo' src={logo} />
        <Button label='Let me play.' style={{ marginBottom: '0.5em', marginTop: '4em' }} 
          onClick={(e) => { setStage('setup'); setIsPermitted(true); }}/>
        <Button className='keyboard-btn'  label={'How do I play?'} style={{ marginTop: '0.5em' }} 
          onClick={(e) => {
            var board = document.getElementById('board');
            if(board) {
                board.style.transform = 'scaleX(3.75)';
            }
            setTutorial(true);
            setIsPermitted(true);
          } } />
        <Button className='mobile-btn'  label={'Mobile Support Coming Soon!'} style={{ marginTop: '0.5em' }} onClick={(e) => (e.preventDefault())} />
      </div>
      <div id='tutorial' style={{ visibility: tutorial ? 'visible' : 'hidden', opacity: tutorial ? '1' : '0', zIndex: 2 }} >
        <div className='tutorial-p' style={{ marginBottom: '3em'}}>
          They say that <span style={{ color: 'purple' }}>Tetris</span> is so elegant that an alien could quickly learn it without any instruction.
        </div>
        <div className='tutorial-p' style={{ marginBottom: '1em' }}>
          For fun, let's pretend you are an alien who has stumbled upon a strange human game.
        </div>
        <div className='tutorial-p' style={{ marginBottom: '3em' }}>
          Let's see if you can figure out its rules on your own.
        </div>
        <div className='tutorial-p'>
          We'll skip the tedious part and tell you the controls, though.
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '80vw', justifyContent: 'center', marginTop: '3em'}}>
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '33%', justifyContent: 'center', alignItems: 'center', marginRight: '5vw'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1em'}}>
              <div className='tutorial-key' style={{margin: '1em 0.5em 1em 1em'}}>Z</div>
              <div className='tutorial-key' style={{margin: '1em 1em 1em 0.5em'}}>X</div>
              or
              <div className='tutorial-key' style={{margin: '1em 1em 1em 1em'}}>🠉</div>
            </div>
            Rotate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '33%', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1em'}}>
              <div className='tutorial-key' style={{margin: '1em', width: 'fit-content', paddingLeft: '4em', paddingRight: '4em'}}>Spacebar</div>
            </div>
            Drop
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '33%', justifyContent: 'center', alignItems: 'center', marginLeft: '5vw'}}>
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1em'}}>
              <div className='tutorial-key' style={{margin: '1em 0.5em 1em 1em'}}>🠈</div>
              <div className='tutorial-key' style={{margin: '1em 0.5em 1em 0.5em'}}>🠋</div>
              <div className='tutorial-key' style={{margin: '1em 1em 1em 0.5em'}}>🠊</div>
            </div>
            Move
          </div>
        </div>
        <Button label={'Easy Peasy.'} style={{ marginTop: '3em' }} 
          onClick={(e) => { 
            var board = document.getElementById('board');
            var tutorial = document.getElementById('tutorial');
            if(board && tutorial) {
                board.style.transform = 'scaleX(1)';
                tutorial.style.opacity = '0';
                tutorial.style.pointerEvents = 'none';
            }
            setTimeout(() => {
              setStage('play');
            }, 2100)
          }} />
      </div>
    </div>
  );
}

export default GreetingDialog;