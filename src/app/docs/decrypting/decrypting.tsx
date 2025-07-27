"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-+=[]{}|;:,.<>?";

interface DecryptingTextProps {
  targetText: string;
  speed?: number;
}

const DecryptingText: React.FC<DecryptingTextProps> = ({
  targetText,
  speed = 8,
}) => {
  const [currentText, setCurrentText] = useState<string>("");

  useEffect(() => {
    let animationFrameId: number;
    let iteration = 0;
    let isMounted = true;

    const animationSpeed = Math.max(1, speed);

    const scramble = () => {
      if (!isMounted) return;

      const newText = targetText
        .split("")
        .map((char, index) => {
          if (iteration / animationSpeed > index) {
            return targetText[index];
          }
          if (char === " ") return " ";
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join("");

      setCurrentText(newText);

      if (iteration < targetText.length * animationSpeed) {
        iteration += 1;
        animationFrameId = requestAnimationFrame(scramble);
      } else {
        setCurrentText(targetText);
      }
    };

    scramble();

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetText, speed]);

  return (
    <motion.p
      className="text-2xl md:text-4xl lg:text-5xl font-bold text-center break-words z-10 text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
    </motion.p>
  );
};

const DecryptingView: React.FC = () => {
  const demoLines = "In silence wakes the sleeping code";
  const demoLines2 = "A whisper through the circuit flowed";

  return (
    <div className="flex flex-col items-center justify-center font-mono p-4 gap-2 overflow-hidden relative">
      <div className="w-full max-w-4xl z-10 space-y-2">
        <DecryptingText targetText={demoLines} speed={3} />
        <DecryptingText targetText={demoLines2} speed={3} />
      </div>
    </div>
  );
};

export default DecryptingView;
