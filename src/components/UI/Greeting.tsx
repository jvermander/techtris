import React from 'react';
import { Button } from 'components';
import { GameStage } from 'data/types';
import 'styles/Dialog.css';
// const alien = require('assets/images/alien_008.svg');
import Alien from 'assets/images/alien.svg';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
  display: string;
}

const Greeting: React.FC<props> = ({ st, display }) => {
  return (
    <div className={'greeting-ctn'} style={{ display }}>
        Techtris
        <img className='alien-head' src={Alien} />
        <Button label='Let me play.' style={{ marginBottom: '0.5em', marginTop: '5em' }} />
        <Button label={'How do I play?'} style={{ marginTop: '0.5em' }} />
    </div>
  );
}

export default Greeting;