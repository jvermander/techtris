import React, { useState, useRef, useEffect } from "react";
import { Button } from 'components';
import { GameStage } from 'data/types';
import { gravityByLevel } from 'data/Tetris';

type props = {
  st: [ stage: GameStage, setStage: React.Dispatch<React.SetStateAction<GameStage>> ]
  lv: [ level: number, setStage: React.Dispatch<React.SetStateAction<number>> ]
}


const LevelSelector: React.FC<props> = ({ st, lv }) => {
  const [stage, setStage] = st;
  const [level, setLevel] = lv;

  return (
    <div id='level-selector' style={{ display: stage === 'setup' ? 'flex' : 'none' }}>
      <div style={{textAlign: 'center'}}>Choose a starting level</div>
      <div style={{ display: "flex", flexDirection: 'row' }}>
        {gravityByLevel.map((gravity, level) => (
          level > 0 && level <= 4 ?
          <Button 
            key={level} 
            label={`${level}`} 
            onClick={(e) => { setLevel(level); setStage('play')}} 
            className='level-selector-btn' />
          : null
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: 'row' }}>
        {gravityByLevel.map((gravity, level) => (
          level >= 5 && level < 9 ?          
          <Button 
            key={level} 
            label={`${level}`} 
            onClick={(e) => { setLevel(level); setStage('play')}} 
            className='level-selector-btn' />
        : null
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: 'row' }}>
        {gravityByLevel.map((gravity, level) => (
          level >= 9 && level < 13 ? 
          <Button 
            key={level} 
            label={`${level}`} 
            onClick={(e) => { setLevel(level); setStage('play')}} 
            className='level-selector-btn' />
          : null
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
        {gravityByLevel.map((gravity, level) => (
          level >= 13 ? 
          <Button 
            key={level} 
            label={`${level}`} 
            onClick={(e) => { setLevel(level); setStage('play')}} 
            className='level-selector-btn' />
          : null
        ))}
      </div>
    </div>
  );
}

export default LevelSelector;