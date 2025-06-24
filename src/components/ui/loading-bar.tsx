"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingBarProps {
  isLoading: boolean;
  color?: string;
  height?: number;
  duration?: number;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  isLoading,
  height = 2,
  duration = 0.6,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) return prev;
          return prev + Math.random() * 20;
        });
      }, 150);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 600);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnimatePresence>
        {(isLoading || progress > 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-black/5 dark:bg-white/5 backdrop-blur-sm"
            style={{ height: `${height}px` }}
          >
            <motion.div
              className="h-full relative overflow-hidden rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: isLoading ? duration : 0.4,
                ease: isLoading ? "easeOut" : "easeInOut",
              }}
              style={{
                background: `linear-gradient(90deg,
                  rgb(16 185 129) 0%,
                  rgb(34 197 94) 30%,
                  rgb(74 222 128) 50%,
                  rgb(34 197 94) 70%,
                  rgb(16 185 129) 100%)`,
                boxShadow: `
                  0 0 20px rgb(34 197 94 / 0.4),
                  0 0 40px rgb(34 197 94 / 0.2),
                  inset 0 1px 0 rgb(255 255 255 / 0.3)
                `,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Glass reflection effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                animate={{
                  x: isLoading ? ["-100%", "200%"] : "200%",
                }}
                transition={{
                  duration: 2,
                  repeat: isLoading ? Infinity : 0,
                  ease: "easeInOut",
                }}
                style={{ width: "50%" }}
              />

              {/* Top highlight for glass effect */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
