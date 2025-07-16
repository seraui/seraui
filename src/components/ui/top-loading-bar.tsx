"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadingBar } from '@/contexts/loading-bar-context';

interface TopLoadingBarProps {
  className?: string;
  color?: string;
  height?: number;
  showSpinner?: boolean;
  animationDuration?: number;
}

export function TopLoadingBar({
  className = '',
  color = '#8C52FF',
  height = 3,
  showSpinner = false,
  animationDuration = 0.3,
}: TopLoadingBarProps) {
  const { isLoading, progress } = useLoadingBar();
  const [isVisible, setIsVisible] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Handle visibility and progress updates
  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setDisplayProgress(progress);
    } else if (progress >= 100) {
      // Complete the progress bar, then hide it
      setDisplayProgress(100);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setDisplayProgress(0);
      }, animationDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress, animationDuration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration }}
          className={`fixed top-0 left-0 right-0 z-[9999] ${className}`}
          style={{ height: `${height}px` }}
        >
          {/* Main progress bar */}
          <motion.div
            className="h-full relative overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          >
            {/* Progress fill */}
            <motion.div
              className="h-full relative"
              style={{ backgroundColor: color }}
              initial={{ width: '0%' }}
              animate={{ width: `${displayProgress}%` }}
              transition={{
                duration: animationDuration,
                ease: displayProgress >= 100 ? 'easeOut' : 'easeInOut',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: isLoading ? Infinity : 0,
                  ease: 'linear',
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute right-0 top-0 h-full w-20"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  filter: 'blur(10px)',
                  opacity: 0.6,
                }}
                animate={{
                  opacity: isLoading ? [0.3, 0.8, 0.3] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isLoading ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Optional spinner */}
          {showSpinner && isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <div
                className="w-4 h-4 border-2 border-transparent rounded-full animate-spin"
                style={{
                  borderTopColor: color,
                  borderRightColor: color,
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Preset configurations for different use cases
export const LoadingBarPresets = {
  default: {
    color: '#8C52FF',
    height: 3,
    showSpinner: false,
  },
  thick: {
    color: '#8C52FF',
    height: 5,
    showSpinner: false,
  },
  withSpinner: {
    color: '#8C52FF',
    height: 3,
    showSpinner: true,
  },
  success: {
    color: '#10B981',
    height: 3,
    showSpinner: false,
  },
  warning: {
    color: '#F59E0B',
    height: 3,
    showSpinner: false,
  },
  error: {
    color: '#EF4444',
    height: 3,
    showSpinner: false,
  },
} as const;

// Component with preset
export function TopLoadingBarWithPreset({
  preset = 'default',
  ...props
}: Omit<TopLoadingBarProps, keyof typeof LoadingBarPresets.default> & {
  preset?: keyof typeof LoadingBarPresets;
}) {
  const presetConfig = LoadingBarPresets[preset];
  return <TopLoadingBar {...presetConfig} {...props} />;
}
