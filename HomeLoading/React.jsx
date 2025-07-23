import React, { useEffect, useState } from "react";

const Loading = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

      body {
        font-family: 'Roboto Mono', monospace;
      }

      @keyframes pulseStroke {
        0%, 100% {
          stroke-opacity: 0.15;
          transform: scale(1);
        }
        50% {
          stroke-opacity: 0.4;
          transform: scale(1.05);
        }
      }

      @keyframes pulseCenter {
        0%, 100% {
          stroke-opacity: 0.3;
          transform: scale(1);
        }
        50% {
          stroke-opacity: 0.6;
          transform: scale(1.07);
        }
      }

      @keyframes pulseSmallCircle {
        0%, 100% {
          border-color: rgba(255, 255, 255, 0.3);
          transform: scale(1);
        }
        50% {
          border-color: rgba(255, 255, 255, 0.7);
          transform: scale(1.2);
        }
      }

      @keyframes pulseDot {
        0%, 100% {
          background-color: white;
          transform: scale(1);
        }
        50% {
          background-color: #d1d5db;
          transform: scale(1.5);
        }
      }

      @keyframes rotateRing {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes glowPulse {
        0%, 100% {
          stroke-opacity: 0.8;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
        }
        50% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 16px rgba(255,255,255,1));
        }
      }

      .outer {
        animation: pulseStroke 4s ease-in-out infinite;
        transform-origin: center;
        transition: stroke 0.3s ease, stroke-opacity 0.3s ease, filter 0.3s ease;
        stroke: rgba(255 255 255 / 0.15);
        stroke-width: 1;
      }

      .outer:nth-child(1) { animation-delay: 0s; }
      .outer:nth-child(2) { animation-delay: 0.5s; }
      .outer:nth-child(3) { animation-delay: 1s; }
      .outer:nth-child(4) { animation-delay: 1.5s; }
      .outer:nth-child(5) { animation-delay: 2s; }
      .outer:nth-child(6) { animation-delay: 2.5s; }

      .center {
        animation: pulseCenter 4s ease-in-out infinite;
        transform-origin: center;
        stroke: rgba(255 255 255 / 0.3);
        stroke-width: 1.5;
      }

      .side-light {
        stroke-opacity: 0.15;
      }

      .main-container:hover svg circle.side-light,
      .main-container:hover ~ .small-birds-container .small-bird {
        stroke-opacity: 1 !important;
        stroke: rgba(255 255 255 / 0.8) !important;
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
        animation: glowPulse 1.5s ease-in-out infinite !important;
      }

      .small-circle {
        animation: pulseSmallCircle 3s ease-in-out infinite;
        transform-origin: center;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 9999px;
        width: 2rem;
        height: 2rem;
        position: absolute;
        bottom: 2.5rem;
        right: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .small-circle-dot {
        animation: pulseDot 3s ease-in-out infinite;
        width: 2px;
        height: 2px;
        background-color: white;
        border-radius: 9999px;
      }

      .small-birds-container {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 600px;
        height: 600px;
        pointer-events: none;
        animation: rotateRing 20s linear infinite;
        transform: translate(-50%, -50%);
      }

      .small-bird {
        stroke: rgba(255 255 255 / 0.15);
        stroke-width: 1;
        fill: transparent;
        animation: pulseStroke 4s ease-in-out infinite;
        transform-origin: center;
        transition: stroke 0.3s ease, stroke-opacity 0.3s ease, filter 0.3s ease;
      }

      .small-bird:nth-child(odd) {
        animation-delay: 0s;
      }
      .small-bird:nth-child(even) {
        animation-delay: 2s;
      }

      .loading-wrapper {
        background-color: #1b3764;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
        font-family: 'Roboto Mono', monospace;
      }

      .enter-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 10px;
        letter-spacing: 0.2em;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        text-transform: uppercase;
        user-select: none;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="main-container relative w-[400px] h-[400px] cursor-pointer">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden="true"
            role="img"
          >
            <circle className="outer" cx="200" cy="100" r="70" />
            <circle className="outer side-light" cx="270" cy="150" r="70" />
            <circle className="outer side-light" cx="270" cy="250" r="70" />
            <circle className="outer" cx="200" cy="300" r="70" />
            <circle className="outer side-light" cx="130" cy="250" r="70" />
            <circle className="outer side-light" cx="130" cy="150" r="70" />
            <circle className="center" cx="200" cy="200" r="60" />
          </svg>

          {/* Button to exit loading */}
          <button
            className="enter-button"
            onClick={() => setLoading(false)}
            aria-label="Click to enter"
          >
            CLICK TO ENTER
          </button>
        </div>

        <div className="small-circle">
          <div className="small-circle-dot"></div>
        </div>

        <svg
          className="small-birds-container"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
          role="img"
        >
          <g transform="translate(300,300)">
            {[
              [260, 0, 18],
              [210, 130, 14],
              [160, 210, 20],
              [90, 250, 12],
              [0, 260, 16],
              [-90, 250, 14],
              [-160, 210, 18],
              [-210, 130, 13],
              [-260, 0, 20],
              [-210, -130, 15],
              [-160, -210, 12],
              [-90, -250, 18],
              [0, -260, 14],
              [90, -250, 16],
            ].map(([cx, cy, r], i) => (
              <circle key={i} className="small-bird" cx={cx} cy={cy} r={r} />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  // Once loading is false, render children
  return <>{children}</>;
};

export default Loading;
