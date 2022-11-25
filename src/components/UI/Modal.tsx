import React, { useState, useRef, useEffect } from "react";

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