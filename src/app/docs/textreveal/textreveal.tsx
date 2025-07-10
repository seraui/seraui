'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Main App Component
export default function TextReveal() {
  const textToAnimate = "Don’t wait for the perfect moment. Take the moment and make it perfect. Consistent effort, even when no one is watching, is what builds greatness over time.";
  const words = textToAnimate.split(" ");

  // Variants for the container to orchestrate the animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word to create a smoother smoke effect
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <div className="flex items-center justify-center font-sans p-4">
      <motion.div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: 'center' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-2xl font-bold text-center mask-r-from-0.5 max-w-5xl leading-relaxed"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ marginRight: "12px", marginTop: "10px" }} // Adjust spacing for paragraph
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
