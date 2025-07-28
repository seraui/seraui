"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface SelectionHandleProps {
  position: string;
}

const SelectionHandle = ({ position }: SelectionHandleProps) => {
  return (
    <div
      className={`absolute w-4 h-4 bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-sm ${position}`}
    ></div>
  );
};

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [words, duration]);

  const wordContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "tween" as const,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(8px)",
      transition: {
        type: "tween" as const,
        ease: [0.4, 0, 0.6, 1],
        duration: 0.4,
      },
    },
  };

  const currentWord = words[index];

  return (
    <div
      className={`inline-block align-middle overflow-hidden h-[1.2em] leading-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block whitespace-nowrap"
        >
          {currentWord.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={letterVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ResizeHandle = () => {
  const phrases = [
    "AWESOME",
    "BEAUTIFUL",
    "STUNNING",
    "COOL",
    "ELEGANT",
    "AMAZING",
    "VIBRANT",
    "DYNAMIC",
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@700&display=swap');
          .font-phudu {
            font-family: 'Phudu', cursive;
          }
        `}
      </style>
      <div className="flex flex-col items-center justify-center font-sans p-4 text-center overflow-hidden">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative inline-block my-2"
        >
          <div className="font-phudu text-5xl md:text-7xl font-bold tracking-tight text-gray-800 dark:text-gray-200 py-1 px-4 flex items-center justify-center uppercase relative">
            <FlipWords words={phrases} duration={3000} />
          </div>

          <div className="absolute inset-0 border-2 border-blue-500 dark:border-blue-400 rounded-lg pointer-events-none"></div>

          <SelectionHandle position="-top-2 -left-2" />
          <SelectionHandle position="-top-2 -right-2" />
          <SelectionHandle position="-bottom-2 -left-2" />
          <SelectionHandle position="-bottom-2 -right-2" />
        </motion.div>
      </div>
    </>
  );
};

export default ResizeHandle;
