import React, { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import "./player.scss";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const Player = () => {
  const { song } = useSong();

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const previousVolume = useRef(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  /* ---------------- LOAD NEW SONG ---------------- */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;

    const loadAndPlay = async () => {
      try {
        audio.pause();
        audio.currentTime = 0;

        audio.src = song.url;

        audio.playbackRate = speed;
        audio.volume = volume;

        const playPromise = audio.play();

        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setCurrentTime(0);
        }
      } catch (err) {
        console.warn("Autoplay blocked:", err);
        setIsPlaying(false);
      }
    };

    loadAndPlay();
  }, [song]);

  /* ---------------- TIME UPDATE ---------------- */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, []);

  /* ---------------- PLAY / PAUSE ---------------- */

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  /* ---------------- SKIP ---------------- */

  const skip = (secs) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.min(
      Math.max(audio.currentTime + secs, 0),
      duration
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /* ---------------- METADATA ---------------- */

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
  };

  /* ---------------- PROGRESS BAR ---------------- */

  const handleProgressClick = (e) => {
    const bar = progressRef.current;
    const audio = audioRef.current;

    if (!bar || !audio) return;

    const rect = bar.getBoundingClientRect();

    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /* ---------------- SPEED ---------------- */

  const handleSpeedChange = (s) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = s;
    setSpeed(s);
    setShowSpeed(false);
  };

  /* ---------------- VOLUME ---------------- */

  const handleVolume = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const val = parseFloat(e.target.value);

    audio.volume = val;
    setVolume(val);

    if (val === 0) {
      setIsMuted(true);
    } else {
      previousVolume.current = val;
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = previousVolume.current;
      setVolume(previousVolume.current);
      setIsMuted(false);
    } else {
      previousVolume.current = volume;
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  /* ---------------- SONG END ---------------- */

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song) return null;

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {/* INFO */}

      <div className="player__info">
        <img
          className="player__poster"
          src={song.posterUrl}
          alt={song.title}
        />

        <div className="player__meta">
          <p className="player__title">{song.title}</p>
          <span className="player__mood">{song.mood}</span>
        </div>
      </div>

      {/* PROGRESS */}

      <div className="player__progress-wrap">
        <span className="player__time">{formatTime(currentTime)}</span>

        <div
          className="player__progress"
          ref={progressRef}
          onClick={handleProgressClick}
        >
          <div
            className="player__progress-fill"
            style={{ width: `${progress}%` }}
          />

          <div
            className="player__progress-thumb"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="player__time">{formatTime(duration)}</span>
      </div>

      {/* CONTROLS */}

      <div className="player__controls">
        <div className="player__speed-wrap">
          <button
            className="player__btn player__btn--speed"
            onClick={() => setShowSpeed(!showSpeed)}
          >
            {speed}×
          </button>

          {showSpeed && (
            <div className="player__speed-menu">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={`player__speed-option ${
                    s === speed ? "active" : ""
                  }`}
                  onClick={() => handleSpeedChange(s)}
                >
                  {s}×
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="player__btn player__btn--skip"
          onClick={() => skip(-5)}
        >
          5s
        </button>

        <button
          className="player__btn player__btn--play"
          onClick={togglePlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          className="player__btn player__btn--skip"
          onClick={() => skip(5)}
        >
          5s
        </button>

        <div className="player__volume">
          <button
            className="player__btn player__btn--vol"
            onClick={toggleMute}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Player);