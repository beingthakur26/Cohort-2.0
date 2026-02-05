import React from 'react'

const Doc = ({activeWindow, setActiveWindow}) => {
  return (
    <footer className="dock">
        <div 
          onClick={() => setActiveWindow({github: true, note: false, resume: false, spotify: false, cli: false})}
          className="icon github">
            <img src=".././public/Doc-Icons/github.svg" alt="" />
        </div>
        <div 
          onClick={() => setActiveWindow({github: false, note: true, resume: false, spotify: false, cli: false})}
          className="icon note">
            <img src=".././public/Doc-Icons/note.svg" alt="" />
        </div>
        <div 
          onClick={() => setActiveWindow({github: false, note: false, resume: true, spotify: false, cli: false})}
          className="icon pdf">
          <img src=".././public/Doc-Icons/pdf.svg" alt="" />
        </div>
        <div 
          onClick={() => {window.open("https://calendar.google.com/calendar/u/0/r", "_blank")}}
          className="icon calender">
          <img src=".././public/Doc-Icons/calender.svg" alt="" />
        </div>
        <div 
          onClick={() => setActiveWindow({github: false, note: false, resume: false, spotify: true, cli: false})}
          className="icon spotify">
          <img src=".././public/Doc-Icons/spotify.svg" alt="" />
        </div>
        <div 
          onClick={() => {window.open("https://mail.google.com/mail/u/0/?tab=rm&ogbl", "_blank")}}
          className="icon mail">
            <img src=".././public/Doc-Icons/mail.svg" alt="" />
        </div>
        <div 
          onClick={() => {window.open("https://www.linkedin.com/in/manas-singh-62a206322", "_blank")}}
          className="icon link">
            <img src=".././public/Doc-Icons/link.svg" alt="" />
        </div>
        <div 
          onClick={() => setActiveWindow({github: false, note: false, resume: false, spotify: false, cli: true})}
          className="icon cli">
            <img src=".././public/Doc-Icons/cli.svg" alt="" />
        </div>
    </footer>
  )
}

export default Doc