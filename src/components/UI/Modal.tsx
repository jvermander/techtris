/*  XVkxzcvk;lxzcv;lkzx?

  They say that Tetris is so elegant a game that even an extra-terrestrial could quickly
  figure out all its rules without any instruction. The same cannot be said for many of
  our other high-skill games, like chess.

  For fun, let's pretend you are an alien who has stumbled upon a strange human game.
  Let's see if you can figure out the rules on your own. 
  
  We'll skip the tedious part and tell you the controls:

  Rotate - Drop - Move

  >> Easy Peasy. <<

*/

import React, { useState, useRef, useEffect } from "react";
import 'styles/Modal.css';

type props = {
  display?: string,
  className?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode,
}

const Modal: React.FC<props> = ({ display, className, style, children }) => {
  return (
    <div
      style={{ ...style, display }}
      className={'modal-ctn' + ` ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

export default Modal;