'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MorphingTextProps {
  words?: string[];
  duration?: number;
  className?: string;
}

const MorphingText: React.FC<MorphingTextProps> = ({
  words = ["Innovation", "Excellence", "Creativity", "Future", "Success"],
  duration = 3000,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.8,
            rotateX: -90
          }}
          animate={{ 
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            rotateX: 0
          }}
          exit={{ 
            opacity: 0,
            filter: "blur(10px)",
            scale: 1.2,
            rotateX: 90
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: { duration: 0.6 },
            scale: { duration: 0.6 },
            rotateX: { duration: 0.8 }
          }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function MorphingView() {
  return (
      <MorphingText />
  );
}