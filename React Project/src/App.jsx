import React from 'react'
import './App.scss'
import Doc from './Components/Doc'
import Nav from './Components/Nav'
import Github from './Components/Windows/Github'
import Note from './Components/Windows/Note'
import Resume from './Components/Windows/Resume'
import Spotify from './Components/Windows/Spotify'
import Cli from './Components/Windows/Cli'

const App = () => {
  return (
    <main>
      <Nav/>
      <Doc/>
      <Github/>
      <Note/>
      <Resume/>
      <Spotify/>
      <Cli/>
    </main>
  )
}

export default App 