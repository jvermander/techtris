import React, { useEffect, useState, useRef, LegacyRef } from 'react'
import { Grid } from 'components'
import './App.css'

function App() {
  const ref = useRef<HTMLDivElement>();

  return (
    <>
    <div ref={ref as LegacyRef<HTMLDivElement>} id='bg'/>
      <div className='root'>
          <Grid />
      </div>
    </>
  );
}

export default App
