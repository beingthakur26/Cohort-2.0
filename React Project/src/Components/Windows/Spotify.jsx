import React from "react";
import MacWindow from "./MacWindow";

const Spotify = ({windowName, activeWindow, setActiveWindow}) => {
  return (
    <MacWindow windowName={windowName} activeWindow={activeWindow} setActiveWindow={setActiveWindow}>
      <div className="spotify-window">
        <iframe
          data-testid="embed-iframe"
          className="spotify-iframe"
          src="https://open.spotify.com/embed/playlist/32yPQT3XncmqrR5ekhiwfr?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </MacWindow>
  );
};

export default Spotify;
