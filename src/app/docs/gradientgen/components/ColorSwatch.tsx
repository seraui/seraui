'use client';
import React from 'react';

interface ColorSwatchProps {
  color: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function ColorSwatch({ color, onChange, onRemove, canRemove }: ColorSwatchProps) {
  return (
    <div className="relative group">
      <label
        className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-700 shadow-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-indigo-200 dark:hover:ring-indigo-400 hover:ring-offset-white dark:hover:ring-offset-gray-800 block transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: color }}
      >
        <input
          type="color"
          className="sr-only"
          value={color}
          onChange={e => onChange(e.target.value)}
        />
      </label>
      {canRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex transition-all duration-200 shadow-md"
        >
          &times;
        </button>
      )}
    </div>
  );
}
