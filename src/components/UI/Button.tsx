import React, { useState, useRef, useEffect, CSSProperties } from "react";
import 'styles/Dialog.css';
import hoverSfx from 'assets/sfx/button.mp3';
const buttonAudio = new Audio();
buttonAudio.autoplay = true;
buttonAudio.src = '';

type props = {
  label: string;
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent) => void
  className?: string;
}

const Button: React.FC<props> = ({ label, style, onClick, className }) => {

  const onMouseEnter = (e: any) => {
    buttonAudio.src = hoverSfx;
  }

  return (
    <div className={`btn-ctn ${className}`} style={style} onMouseEnter={onMouseEnter} onClick={onClick}>
      {label}
    </div>
  );
}

export default Button;