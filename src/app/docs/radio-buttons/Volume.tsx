"use client";

import React, { useState } from 'react';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState(50); // Default volume

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-8">
      {/* Volume Percentage Display */}
      <div className="text-gray-700 mb-3 text-lg font-semibold select-none">

        {volume}% 

      </div>

      {/* Vertical Volume Slider - Exact replica of the design */}
      <label 
        className="slider relative cursor-pointer inline-flex flex-row-reverse items-center"
        style={{
          '--slider-width': '100%',
          '--slider-height': '50px',
          '--slider-bg': 'rgb(82, 82, 82)',
          '--slider-border-radius': '9px',
          '--level-color': '#fff',
          '--level-transition-duration': '0.1s',
          '--icon-margin': '15px',
          '--icon-color': 'rgb(82, 82, 82)',
          '--icon-size': '25px'
        } as React.CSSProperties}
      >
        <input
          type="range"
          className="level appearance-none overflow-hidden cursor-pointer"
          min={0}
          max={100}
          value={volume}
          onChange={handleChange}
          style={{
            width: 'var(--slider-width)',
            height: 'var(--slider-height)',
            background: 'var(--slider-bg)',
            borderRadius: 'var(--slider-border-radius)',
            transition: 'height var(--level-transition-duration)',
            transform: 'rotate(270deg)',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
        />
          <svg
          className="volume inline-block absolute left-0 pointer-events-none "
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 24 24"
          enableBackground="new 0 0 512 512" 
          style={{
            verticalAlign: 'top',
            marginRight: 'var(--icon-margin)',
            color: 'var(--icon-color)',
            width: 'var(--icon-size)',
            height: 'auto'
          }}
        >
          <g>
            <path
              d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
              fill="currentColor"
            />
            <path
              d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
              fill="currentColor"
            />
          </g>
        </svg>
        
      {/*
      tips: move to global/index css for better performance
      */}

        <style>{`
          .level::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 0;
            height: 0;
            -webkit-box-shadow: -200px 0 0 200px var(--level-color);
            box-shadow: -200px 0 0 200px var(--level-color);
          }
          .level::-moz-range-thumb {
            width: 0;
            height: 0;
            border-radius: 0;
            border: none;
            box-shadow: -200px 0 0 200px var(--level-color);
          }
        `}</style>
      </label>
    </div>
  );
};

export default Volume;