import React, { useState, useRef, useEffect, CSSProperties } from "react";
import 'styles/Dialog.css';

type props = {
  label: string;
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent) => void
}

const Button: React.FC<props> = ({ label, style, onClick }) => {

  const onMouseEnter = (e: any) => {
    e.target.style.transform = 'translate(5px, 5px)';
    e.target.style.boxShadow = 'none';
  }

  const onMouseLeave = (e: any) => {
    e.target.style.transform = 'translate(-5px, -5px)';
    e.target.style.boxShadow = '';
  }

  return (
    <div className='btn-ctn' style={style} onClick={onClick}>
      {label}
    </div>
  );
}

export default Button;