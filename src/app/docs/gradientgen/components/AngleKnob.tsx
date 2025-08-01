'use client';
import React, { useRef, useCallback } from 'react';

interface AngleKnobProps {
  angle: number;
  onChange: (angle: number) => void;
}

export function AngleKnob({ angle, onChange }: AngleKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);

  const handlePointer = useCallback(
    (e: PointerEvent | TouchEvent) => {
      if (!knobRef.current) return;
      const knob = knobRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - (knob.left + knob.width / 2);
      const y = clientY - (knob.top + knob.height / 2);
      const deg = Math.round((Math.atan2(y, x) * 180) / Math.PI + 90);
      onChange((deg + 360) % 360);
    },
    [onChange]
  );

  const handleInteraction = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      e.preventDefault();
      handlePointer(e.nativeEvent);
      const move = (ev: PointerEvent | TouchEvent) => handlePointer(ev);
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('touchmove', move);
        window.removeEventListener('touchend', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('touchmove', move);
      window.addEventListener('touchend', up);
    },
    [handlePointer]
  );

  return (
    <div className="flex items-center gap-4 justify-center">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Angle</span>
      <div
        ref={knobRef}
        onPointerDown={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-900/20 dark:via-[#040609] dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 cursor-pointer select-none flex items-center justify-center touch-none shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <div
          className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 absolute shadow-sm"
          style={{
            top: '8px',
            left: 'calc(50% - 4px)',
            transform: `rotate(${angle}deg)`,
            transformOrigin: '4px 40px',
          }}
        />
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{angle}°</span>
      </div>
    </div>
  );
}
