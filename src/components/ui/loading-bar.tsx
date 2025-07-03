"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingBarProps {
  isLoading: boolean;
  color?: string;
  height?: number;
  duration?: number;
  minLoadingTime?: number; // Minimum time to show loading bar
  maxLoadingTime?: number; // Maximum time before auto-complete
  smartDetection?: boolean; // Enable smart loading detection
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  isLoading,
  duration = 0.6,
  minLoadingTime = 300, // Show for at least 300ms
  maxLoadingTime = 8000, // Auto-complete after 8 seconds
  smartDetection = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  // Smart progress calculation based on actual loading time
  const calculateSmartProgress = useCallback((elapsedTime: number) => {
    // Dynamic progress based on elapsed time and performance
    if (elapsedTime < 200) return Math.min(elapsedTime / 200 * 25, 25); // 0-25% in first 200ms
    if (elapsedTime < 500) return 25 + Math.min((elapsedTime - 200) / 300 * 25, 25); // 25-50% in next 300ms
    if (elapsedTime < 1000) return 50 + Math.min((elapsedTime - 500) / 500 * 20, 20); // 50-70% in next 500ms
    if (elapsedTime < 2000) return 70 + Math.min((elapsedTime - 1000) / 1000 * 15, 15); // 70-85% in next 1000ms

    // Slow down progress after 2 seconds to prevent reaching 100% too early
    const remainingTime = Math.max(maxLoadingTime - elapsedTime, 1000);
    const remainingProgress = 15; // 85-100%
    const progressRate = remainingProgress / remainingTime;
    return Math.min(85 + (elapsedTime - 2000) * progressRate, 95);
  }, [maxLoadingTime]);

  useEffect(() => {
    if (isLoading) {
      const startTime = Date.now();
      setLoadingStartTime(startTime);
      setProgress(0);
      setIsVisible(true);

      let animationFrame: number;
      const intervals: NodeJS.Timeout[] = [];
      

      if (smartDetection) {
        // Smart progress animation based on real-time elapsed time
        const updateProgress = () => {
          const elapsedTime = Date.now() - startTime;

          const smartProgress = calculateSmartProgress(elapsedTime);
          setProgress(smartProgress);

          // Continue animation if still loading and under max time
          if (elapsedTime < maxLoadingTime) {
            animationFrame = requestAnimationFrame(updateProgress);
          }
        };

        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        // Original YouTube-style progress for fallback
        const intervals: NodeJS.Timeout[] = [];
        intervals.push(setTimeout(() => setProgress(30), 100));
        intervals.push(setTimeout(() => setProgress(50), 300));
        intervals.push(setTimeout(() => setProgress(70), 600));

        const slowInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 5;
          });
        }, 200);
        intervals.push(slowInterval);
      }

      // Auto-complete after max loading time
      const maxTimeTimeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setIsVisible(false);
        }, 400);
      }, maxLoadingTime);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        intervals.forEach(clearTimeout);
        clearTimeout(maxTimeTimeout);
      };
    } else {
      // Handle loading completion
      const endTime = Date.now();
      const totalLoadingTime = loadingStartTime ? endTime - loadingStartTime : 0;

      // Only show completion if loading was visible for minimum time
      if (totalLoadingTime >= minLoadingTime || isVisible) {
        setProgress(100);
        const timeout = setTimeout(() => {
          setProgress(0);
          setIsVisible(false);
          setLoadingStartTime(null);
        }, 400);
        return () => clearTimeout(timeout);
      } else {
        // Loading was too fast, hide immediately
        setProgress(0);
        setIsVisible(false);
        setLoadingStartTime(null);
      }
    }
  }, [isLoading, minLoadingTime, maxLoadingTime, smartDetection, loadingStartTime, calculateSmartProgress, isVisible]);

  return (
    <div className="loading-bar-container">
      <AnimatePresence>
        {(isLoading || isVisible) && (
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div
              className="loading-bar"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: isLoading ? duration : 0.3,
                ease: isLoading ? "easeOut" : "easeInOut",
              }}
            >
              {/* Enhanced glass reflection effect */}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ width: "40%" }}
                />
              )}

              {/* Top highlight for enhanced glass effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              {/* Bottom subtle shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
