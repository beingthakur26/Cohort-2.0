import React, { useState } from 'react'
import './App.scss'
import Doc from './Components/Doc'
import Nav from './Components/Nav'
import Github from './Components/Windows/Github'
import Note from './Components/Windows/Note'
import Resume from './Components/Windows/Resume'
import Spotify from './Components/Windows/Spotify'
import Cli from './Components/Windows/Cli'

const App = () => {

  const [activeWindow, setActiveWindow] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
  })

  return (
    <main>
      <Nav/>
      <Doc activeWindow={activeWindow} setActiveWindow={setActiveWindow}/>
      {activeWindow.github && <Github activeWindow={activeWindow} setActiveWindow={setActiveWindow} windowName="github"/>}
      {activeWindow.note && <Note activeWindow={activeWindow} setActiveWindow={setActiveWindow} windowName="note"/>}
      {activeWindow.resume && <Resume activeWindow={activeWindow} setActiveWindow={setActiveWindow} windowName="resume"/>}
      {activeWindow.spotify && <Spotify activeWindow={activeWindow} setActiveWindow={setActiveWindow} windowName="spotify"/>}
      {activeWindow.cli && <Cli activeWindow={activeWindow} setActiveWindow={setActiveWindow} windowName="cli"/>}
    </main>
  )
}

export default App 