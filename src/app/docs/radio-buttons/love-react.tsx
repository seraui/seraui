"use client";

import React, { useState } from "react";

interface LoveReactProps {
  color?: string;
  size?: number;
}

const LoveReact: React.FC<LoveReactProps> = ({
  color = "rgb(255, 91, 137)",
  size = 50,
}) => {
  const [isLiked] = useState(false);
  const [isAnimating] = useState(false);

  return (
    <div
      className="relative transition duration-300 group select-none"
      title={isLiked ? "Unlike" : "Like"}
      style={{
        ["--heart-color" as string]: color,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Animations */}
      <style>
        {`
          @keyframes heart-fill {
            0% { transform: scale(0.8); }
            40% { transform: scale(1.3); filter: brightness(1.3); }
            70% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }

          @keyframes heart-unfill {
            0% { transform: scale(1); }
            50% { transform: scale(0.8); }
            100% { transform: scale(1); }
          }

          @keyframes heart-celebrate {
            0% { transform: scale(0.6); opacity: 1; }
            50% { transform: scale(1.3); opacity: 1; filter: brightness(1.4); }
            100% { transform: scale(1.8); opacity: 0; }
          }

          .animate-heart-fill { animation: heart-fill 0.5s ease forwards; }
          .animate-heart-unfill { animation: heart-unfill 0.3s ease forwards; }
          .animate-heart-celebrate { animation: heart-celebrate 0.7s ease forwards; }
        `}
      </style>

      <div className="w-full h-full flex justify-center items-center">
        {/* Outline Heart (default) */}
        {!isLiked && (
          <svg
            viewBox="0 0 24 24"
            className="fill-transparent stroke-[var(--heart-color)] stroke-2 absolute transition-transform duration-300 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
          </svg>
        )}

        {isLiked && (
          <svg
            viewBox="0 0 24 24"
            className="fill-[var(--heart-color)] absolute transition-transform duration-300 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
          </svg>
        )}

        {isLiked && isAnimating && (
          <div className="absolute w-[100px] h-[100px] animate-heart-celebrate pointer-events-none">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              className="stroke-[var(--heart-color)] fill-transparent stroke-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="50" x2="30" y2="50" />
              <line x1="70" y1="50" x2="90" y2="50" />
              <line x1="50" y1="10" x2="50" y2="30" />
              <line x1="50" y1="70" x2="50" y2="90" />
              <line x1="20" y1="20" x2="35" y2="35" />
              <line x1="65" y1="65" x2="80" y2="80" />
              <line x1="20" y1="80" x2="35" y2="65" />
              <line x1="65" y1="35" x2="80" y2="20" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveReact;