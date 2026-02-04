import React from "react";
import { Rnd } from "react-rnd";

const MacWindow = ({ children }) => {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 900,
        height: 600,
      }}
      minWidth={500}
      minHeight={400}
      bounds="window"
    >
      <div className="window ">
        <div className="nav">
          <div className="dots">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="title">
            <p>manassingh - zsh</p>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </Rnd>
  );
};

export default MacWindow;
