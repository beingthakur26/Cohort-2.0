import React from 'react'
import MacWindow from './MacWindow'

const Resume = ({windowName, activeWindow, setActiveWindow}) => {
  return (
    <MacWindow windowName={windowName} activeWindow={activeWindow} setActiveWindow={setActiveWindow}>
        <div className="resume-window">
          <iframe src="/resume.pdf" frameBorder="0"></iframe>
        </div>
    </MacWindow>
  )
}

export default Resume