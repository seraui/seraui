'use client';
import React from 'react';
import clsx from 'clsx';

interface GradientTypeTabsProps {
  active: string;
  onChange: (type: string) => void;
  isDark: boolean;
}

export function GradientTypeTabs({ active, onChange, isDark }: GradientTypeTabsProps) {
  const tabs = ['linear', 'radial', 'conic'] as const;
  const darkBg = '#040609';

  return (
    <div
      className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full"
      style={{ backgroundColor: isDark ? darkBg : '#f3f4f6' }}
    >
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200',
            active === t
              ? 'bg-white text-indigo-600 dark:text-indigo-400 shadow-md border border-gray-200 dark:border-gray-600'
              : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
          )}
          style={active === t ? { backgroundColor: isDark ? darkBg : 'white' } : undefined}
          onMouseEnter={e => {
            if (active !== t) {
              e.currentTarget.style.backgroundColor = isDark
                ? `${darkBg}80`
                : 'rgba(255,255,255,0.5)';
            }
          }}
          onMouseLeave={e => {
            if (active !== t) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
