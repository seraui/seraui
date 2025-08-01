'use client';
import React, { useRef, useCallback } from 'react';

interface RadialPositionControlProps {
  position: { x: number; y: number };
  onChange: (position: { x: number; y: number }) => void;
  isDark: boolean;
}

export function RadialPositionControl({ position, onChange }: RadialPositionControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointer = useCallback(
    (e: PointerEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      onChange({ x: Math.round(x), y: Math.round(y) });
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
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Radial Center</span>
      <div
        ref={containerRef}
        onPointerDown={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative w-32 h-32 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-900/20 dark:via-[#040609] dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 cursor-crosshair select-none touch-none shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <div
          className="absolute w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {position.x}%, {position.y}%
      </div>
    </div>
  );
}
