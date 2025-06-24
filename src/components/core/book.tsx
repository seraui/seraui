"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface BookProps {
  content: React.ReactNode;
  cover: React.ReactNode;
  backOfCover?: React.ReactNode;
  rotate?: number;
  coverRotate?: number;
  color?: string;
  className?: string;
}

export const Book = ({
  content,
  cover,
  backOfCover,
  rotate = -30,
  coverRotate = -100,
  className,
  color = "#e30012",
}: BookProps) => {
  const rotatePage = useMotionValue(0);
  const rotateSpring = useSpring(rotatePage, {
    stiffness: 100,
    damping: 40,
  });

  const handleMouseEnter = () => rotatePage.set(coverRotate);
  const handleMouseLeave = () => rotatePage.set(0);

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY: rotate,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={cn("relative w-52 h-80 transform-3d", className)}
      >
        <motion.div
          style={{
            rotateY: rotateSpring,
            z: 15,
          }}
          className="z-10 shadow-2xl w-full h-full absolute transform-3d origin-left"
        >
          <div
            style={{ transform: "rotateY(180deg)" }}
            className={cn(
              "absolute w-full h-full top-0 left-0 overflow-hidden rounded-r-xs bg-zinc-900 backface-hidden"
            )}
          >
            {backOfCover}
          </div>

          <div
            className={cn(
              "absolute w-full h-full top-0 left-0 overflow-hidden rounded-l-xs backface-hidden"
            )}
          >
            {cover}
          </div>
        </motion.div>

        <motion.div
          style={{ z: 14 }}
          className="absolute z-20 top-[1%] left-0 w-[calc(100%-3%)] h-[calc(100%-2%)] bg-zinc-50 overflow-hidden"
        >
          {content}
        </motion.div>

        <div className="absolute top-[1%] -right-[4%] h-[calc(100%-2%)] w-[29px] transform rotate-y-90  bg-gradient-to-r from-zinc-50 via-zinc-300 to-zinc-50 bg-[length:5%_100%] bg-repeat-x shadow-2xl" />

        <div
          style={{ background: color }}
          className="absolute top-0 left-0 h-full w-[30px] transform -rotate-y-90 -translate-x-[50%]  bg-red-600"
        />

        <motion.div
          style={{ z: -15, background: color }}
          className="absolute top-0 left-0 w-full rounded-r-xs h-full bg-red-600 shadow-lg "
        />
      </motion.div>
    </div>
  );
};
