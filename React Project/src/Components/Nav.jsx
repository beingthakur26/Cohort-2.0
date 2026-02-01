import React from 'react'

const Nav = () => {
  return (
    <nav>
        <div className="left">
            <div className="apple-icon">
            <img src=".././public/navbar-icons/apple.svg" alt="apple" />
            </div>
            <div className="nav-item">
                <p>Manas Singh</p>
            </div>
            <div className="nav-item">
                <p>File</p>
            </div>
            <div className="nav-item">
                <p>Window</p>
            </div>
            <div className="nav-item">
                <p>Terminal</p>
            </div>
            
        </div>
        <div className="right">
            <div className="wifi-icon">
                <img src=".././public/navbar-icons/wifi.svg" alt="wifi" />
            </div>
        </div>
    </nav>
  )
}

export default Nav