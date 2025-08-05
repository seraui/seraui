'use client';
import React from 'react';

const NoiseText = ({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) => (
  <span
    className={`
      relative inline-block w-fit rounded-lg px-4 py-2
      backdrop-blur-md

      /* Glass background */
      bg-white/60  dark:bg-white/10

      /* Border */
      border border-black/10 dark:border-white/20

      /* Shadow */
      shadow-lg shadow-black/10 dark:shadow-black/40
      ${className}
    `}
  >
    {/* noise overlay */}
    <span
      aria-hidden
      style={{ opacity: 0.06 }}
      className="
        absolute inset-0 pointer-events-none
        bg-[url('https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/11/tv-static-gif-7.gif')]
        mix-blend-overlay dark:mix-blend-soft-light
      "
    />

    {/* actual payload */}
    <span className="relative z-10 text-slate-900 dark:text-white font-medium text-sm">
      {children}
    </span>
  </span>
);

export default NoiseText;
