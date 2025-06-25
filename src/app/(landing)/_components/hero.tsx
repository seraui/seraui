"use client";

import { motion } from "motion/react";

export const Hero = () => {
  return (
    <div className="items-center my-40">
      <div className="flex-1 flex flex-col items-center text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="font-bold flex flex-col text-5xl md:text-6xl tracking-tight leading-[1.15]"
        >
          <span>
            Make <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">beautiful</span> websites
          </span>
          <span>regardless of your design experience.</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
          className="text-base md:text-xl font-medium text-zinc-600 dark:text-zinc-400 mt-8 max-w-xl"
        >
          Beautiful, fast and modern React UI library for building accessible and customizable web applications.
        </motion.p>
      </div>
    </div>
  );
};
