import React, { useState } from 'react';
import { Button } from 'components';
import { GameStage } from 'data/types';
import 'styles/Dialog.css';
import logo from 'assets/images/logoclean.png';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
}

const GreetingDialog: React.FC<props> = ({ st }) => {
  const [stage, setStage] = st;
  const [tutorial, setTutorial] = useState<boolean>(false);

  return (
    <div className={'greeting-ctn'} style={{ display: stage === 'greeting' ? 'flex' : 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: 'opacity 1s ease', opacity: tutorial ? '0' : '1', zIndex: 1, pointerEvents: tutorial ? 'none' : 'auto'}}>
        <img className='logo' src={logo} />
        <Button label='Let me play.' style={{ marginBottom: '0.5em', marginTop: '4em' }} onClick={(e) => setStage('setup')} />
        <Button label={'How do I play?'} style={{ marginTop: '0.5em' }} 
          onClick={(e) => {
            var board = document.getElementById('board');
            if(board) {
                board.style.transform = 'scaleX(3.5)';
            }
            setTutorial(true);
          } } />
      </div>
      <div id='tutorial' style={{ visibility: tutorial ? 'visible' : 'hidden', opacity: tutorial ? '1' : '0', zIndex: 2 }} >
        <div style={{ marginBottom: '3em' }}>
          They say that <span style={{ color: 'purple' }}>Tetris</span> is elegant enough such that an extra-terrestrial could quickly learn all its rules without any instruction.
        </div>
        <div style={{ marginBottom: '2em' }}>
        For fun, let's pretend you are an alien who has stumbled upon a strange human game.
        Let's see if you can figure out the rules on your own.
        </div>
        <br/>
        <div>
        We'll skip the tedious part and tell you the controls, though.
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '3em'}}>
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '33%', justifyContent: 'center', alignItems: 'center', marginRight: '5em'}}>
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
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '33%', justifyContent: 'center', alignItems: 'center', marginLeft: '5em'}}>
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