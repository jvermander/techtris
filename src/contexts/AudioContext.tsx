import React, { useState, useContext, useEffect, useCallback } from 'react';

export type SongState = 'active' | 'paused' | 'inactive';
export type  AudioType = 'song'

export type AudioContextType = [
  playAudio: (type: AudioType, src: string) => void, // todo: handle all audio here
  isPermitted: boolean,
  setIsPermitted: React.Dispatch<React.SetStateAction<boolean>>,
  songState: SongState,
  toggleMute: (src: string) => void
];

;

export const AudioContext = React.createContext<AudioContextType>({} as AudioContextType);

type props = {
  children: React.ReactNode;
}

const AudioProvider: React.FC<props> = ({ children }) => {
  const [music, setMusic] = useState<HTMLAudioElement>(new Audio());
  const [isPermitted, setIsPermitted] = useState<boolean>(false);
  const [songState, setSongState] = useState<SongState>('inactive');

  const toggleMute = (src: string) => {
    if(songState === 'paused') {
      music.play();
      setSongState('active');
    } else if(songState === 'active') {
      music.pause();
      setSongState('paused');
    } else if(songState === 'inactive') {
      playAudio('song', src);
    }
  }

  const playAudio = useCallback((type: AudioType, src: string = '') => {
    console.log('Requested audio of type', type, 'and source', src);
    if(type === 'song') {
      music.src = src;
      setSongState('active');
    }
  }, []);

  useEffect(() => {
    music.src = '';
    music.autoplay = true;
    music.volume = 0.5;
    music.onended = () => {
      setSongState('inactive');
    }
  }, [])

  return (
    <AudioContext.Provider 
      value={[playAudio, 
              isPermitted, 
              setIsPermitted, 
              songState, 
              toggleMute]}>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;