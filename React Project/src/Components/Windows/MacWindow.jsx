import React from "react";
import { Rnd } from "react-rnd";

const MacWindow = ({ children, width=900, height=600, windowName, activeWindow, setActiveWindow }) => {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: width,
        height: height,
      }}
      minWidth={500}
      minHeight={400}
      bounds="window"
    >
      <div className="window ">
        <div className="nav">
          <div className="dots">
            <div className="dot red" onClick={() => setActiveWindow({ [windowName]: false })}></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="title">
            <p>{windowName} - zsh</p>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </Rnd>
  );
};

export default MacWindow;
