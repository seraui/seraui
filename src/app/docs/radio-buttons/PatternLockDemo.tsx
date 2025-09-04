"use client";

import React, { useState, useEffect } from "react";
import PatternLock from "./PatternLock";
import { BatteryFull, Wifi, Signal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PatternLockDemo: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [patternError, setPatternError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update the clock every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handlePatternComplete = (success: boolean) => {
    if (success) {
      setIsUnlocked(true);
      setPatternError(false);
    } else {
      setPatternError(true);
      setTimeout(() => setPatternError(false), 800);
    }
  };

  const handleLockPhone = () => {
    setIsUnlocked(false);
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div
        className="relative w-[412px] h-[915px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-black bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/ZCK2vzPP/d-plus-fun-background.png')",
        }}
      >
        {/* Unlocked Screen Content */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-center p-8"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Mahmud!</h1>
              <p className="mt-2 text-gray-600">
                Your phone is now unlocked.
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your domain is <span className="font-semibold">{`devplus.fun`}</span>
              </p>
              <button
                onClick={handleLockPhone}
                className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              >
                Lock Phone
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lock Screen Overlay */}
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-md flex flex-col justify-between p-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-between px-6 py-2 text-xs bg-gray-500/30">
                <span>{formattedTime}</span>
                <div className="flex items-center space-x-2">
                  <Signal size={16} />
                  <Wifi size={16} />
                  <BatteryFull size={16} />
                </div>
              </div>

              {/* Time and Date */}
              <div className="text-center pt-16">
                <h1 className="text-7xl font-light tracking-tight">{formattedTime}</h1>
                <p className="text-lg font-medium">{formattedDate}</p>
                <p className="text-sm text-gray-400/90">Mahmud&#39;s Android</p>
              </div>

              {/* Pattern Lock Area */}
              <motion.div
                className="w-full flex flex-col items-center"
                // Shake animation on error
                animate={patternError ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PatternLock
                  mode="unlock"
                  initialPattern={[ 1, 2, 3, 4]}
                  onUnlock={handlePatternComplete}
                />
                <p className={`mt-4 h-6 text-sm transition-colors duration-300 ${patternError ? 'text-red-400' : 'text-gray-200'}`}>
                  {patternError ? "Wrong Pattern, Try Again" : "Draw your unlock pattern"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PatternLockDemo;