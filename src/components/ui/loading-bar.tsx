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

      // More realistic YouTube-style progress
      const intervals: NodeJS.Timeout[] = [];

      // Fast initial progress
      intervals.push(setTimeout(() => setProgress(30), 100));
      intervals.push(setTimeout(() => setProgress(50), 300));
      intervals.push(setTimeout(() => setProgress(70), 600));

      // Slower progress towards the end
      const slowInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 5;
        });
      }, 200);
      intervals.push(slowInterval);

      return () => {
        intervals.forEach(clearTimeout);
        clearInterval(slowInterval);
      };
    } else {
      // Complete the loading
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 400);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnimatePresence>
        {(isLoading || progress > 0) && (
          <motion.div
            className="w-full"
            style={{ height: `${height}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="h-full relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: isLoading ? duration : 0.3,
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
                  0 0 15px rgb(34 197 94 / 0.3),
                  0 0 30px rgb(34 197 94 / 0.1),
                  inset 0 1px 0 rgb(255 255 255 / 0.2)
                `,
              }}
            >
              {/* Glass reflection effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: isLoading ? ["-100%", "200%"] : "200%",
                }}
                transition={{
                  duration: 1.5,
                  repeat: isLoading ? Infinity : 0,
                  ease: "easeInOut",
                }}
                style={{ width: "40%" }}
              />

              {/* Top highlight for glass effect */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
