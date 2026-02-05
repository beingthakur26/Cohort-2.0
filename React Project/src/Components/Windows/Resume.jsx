import React from 'react'
import MacWindow from './MacWindow'

const Resume = () => {
  return (
    <MacWindow>
        <div className="resume-window">
          <iframe src="/resume.pdf" frameBorder="0"></iframe>
        </div>
    </MacWindow>
  )
}

export default Resume