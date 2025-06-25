"use client";

import { motion } from "motion/react";
import { CallToAction } from "./call-to-action";

export const Hero = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {/* Base Grid Background - Very Low Opacity */}
      <div className="absolute inset-0 grid-bg-hero" />
      
      {/* Black Color Masking from Top - Very Subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/2 to-transparent dark:from-black/12 dark:via-black/3" />
      
      {/* Additional Top Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent dark:from-black/70 dark:via-black/15" />
      
      {/* Subtle color overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/3 via-transparent to-purple-50/3 dark:from-blue-950/1 dark:via-transparent dark:to-purple-950/1" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20 mb-8 backdrop-blur-sm"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ✨ Now with enhanced components
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6"
          >
            <span className="block">
              Build{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                stunning
              </span>
            </span>
            <span className="block">
              websites with ease
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            className="text-base md:text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed"
          >
            A modern React UI library that combines beautiful design with powerful functionality. 
            Create accessible, customizable applications without the complexity.
          </motion.p>

          <CallToAction />
        </div>
      </div>
    </div>
  );
};
