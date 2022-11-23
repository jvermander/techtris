import React, { useState, useRef, useEffect, CSSProperties } from "react";
import 'styles/Dialog.css';

type props = {
  label: string;
  style?: React.CSSProperties;
}

const Button: React.FC<props> = ({ label, style }) => {
  return (
    <div className='btn-ctn' style={style}>
      {label}
    </div>
  );
}

export default Button;