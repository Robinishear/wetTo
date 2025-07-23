import React, { useEffect } from "react";

const CarFillPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Embedded CSS */}
      <style>{`
        .car-outline {
          fill: none;
          stroke: #60a5fa;
          stroke-width: 4;
          stroke-linejoin: round;
          stroke-linecap: round;
          filter: drop-shadow(0 0 6px #3b82f6);
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: outlineDraw 3s ease forwards;
        }

        .car-fill {
          fill: #3b82f6;
          clip-path: inset(0 100% 0 0);
          animation: fillReveal 3s ease forwards;
          animation-delay: 3s;
        }

        .wheel {
          fill: #1e40af;
          filter: drop-shadow(0 0 4px #1e40af);
          transform-origin: center;
          animation: wheelSpin 3s linear infinite;
        }

        @keyframes outlineDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fillReveal {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes wheelSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Page Content */}
      <div className="flex items-center justify-center">
        <svg
          className="w-[300px] h-[150px] relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
          viewBox="0 0 300 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car fill shape */}
          <path
            className="car-fill"
            d="M20 100 L50 60 L120 60 L160 40 L220 40 L260 80 L280 80 L280 110 L20 110 Z"
          ></path>

          {/* Car outline */}
          <path
            className="car-outline"
            d="M20 100 L50 60 L120 60 L160 40 L220 40 L260 80 L280 80 L280 110 L20 110 Z"
          ></path>

          {/* Left wheel */}
          <circle className="wheel" cx="70" cy="110" r="20" />
          <circle cx="70" cy="110" r="10" fill="#60a5fa" />

          {/* Right wheel */}
          <circle className="wheel" cx="230" cy="110" r="20" />
          <circle cx="230" cy="110" r="10" fill="#60a5fa" />
        </svg>
      </div>
    </div>
  );
};

export default CarFillPage;
