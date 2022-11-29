import React, { useState, useContext, useEffect } from 'react';
import { AudioContext } from 'contexts';
import {
  floatingSong,
  calypsoSong,
  showdownSong,
  alexiSong,
  biohazardSong,
  gamingSynthSong,
  journeySong,
  moonSong
} from 'assets/music';
import rewind from 'assets/images/rewind.svg';
import forward from 'assets/images/forward.svg';
import play from 'assets/images/play.svg';
import pause from 'assets/images/pause.svg';

type Song = {
  src: string;
  artist: string;
  title: string;
}


var songList: Song[]  = [
  { src: moonSong, artist: 'M.O.O.N.', title: 'Dust' },
  { src: floatingSong, artist: 'Karl Casey @ White Bat Audio', title: 'Floating' },
  { src: calypsoSong, artist: 'Karl Casey @ White Bat Audio', title: 'Calypso' },
  { src: showdownSong, artist: 'Karl Casey @ White Bat Audio', title: 'Showdown' },
  { src: journeySong, artist: 'Freesol', title: 'Retro Action Movie Synthwave' },
  { src: biohazardSong, artist: 'Lesion X', title: 'Biohazard' },
  { src: gamingSynthSong, artist: 'Mokka Music / Sega', title: '8-Bit Gaming Synthwave' },
  { src: alexiSong, artist: 'Alexi Action', title: 'Hero 80s' }
]

function shuffleSongs(list: Song[]) {
  for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
  }
}
shuffleSongs(songList);

type props = {}

const MusicPlayer: React.FC<props> = ({}) => {
  const [songIdx, setSongIdx] = useState<number>(0);
  const [playAudio, isPermitted, setIsPermitted, songState, toggleMute] = useContext(AudioContext);

  useEffect(() => {
    if(isPermitted)
      playAudio('song', songList[songIdx].src);
  }, [isPermitted])

  useEffect(() => {
    if(isPermitted)
      playAudio('song', songList[songIdx].src);
  }, [songIdx])

  useEffect(() => {
    if(songState == 'inactive' && isPermitted)
      setSongIdx(prev => (prev + 1) % songList.length);
  }, [songState])


  return (
    <div id='music-player' onClick={(e) => { if(!isPermitted) setIsPermitted(true) }}>
      <div>{isPermitted ? songList[songIdx].title : '--'}</div>
      <div>{isPermitted ? songList[songIdx].artist : '--'}</div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: '0.5em' }}>
        <img className='music-btn' src={rewind} onClick={ (e) => setSongIdx(prev => (prev - 1 + songList.length) % songList.length )} />
        <img className='music-btn' src={songState === 'paused' || !isPermitted ? play : pause} onClick={(e) => { if(isPermitted) toggleMute(songList[songIdx].src) }}/>
        <img className='music-btn' src={forward} onClick={(e) => setSongIdx(prev => (prev + 1) % songList.length)}/>
      </div>

    </div>
  )
}

export default MusicPlayer;