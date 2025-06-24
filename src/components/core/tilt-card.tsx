"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

interface TiltCardProps {
  range?: number;
  depth?: number;
  containerClassName?: string;
  children: React.ReactNode;
}

export const TiltCard = ({
  range = 32,
  depth = 80,
  containerClassName,
  children,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
  const zSpring = useSpring(z, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * range;
    const mouseY = (e.clientY - rect.top) * range;

    const rotationX = (mouseY / height - range / 2) * -1;
    const rotationY = mouseX / width - range / 2;

    x.set(rotationX);
    y.set(rotationY);
  };

  const handleMouseEnter = () => {
    z.set(depth);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    z.set(3);
  };

  const shadow = useTransform(
    zSpring,
    (z) => `0 ${z / 2}px ${z}px rgba(0, 0, 0, 0.15)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: xSpring,
        rotateY: ySpring,
      }}
      className="relative h-96 w-72 rounded-2xl bg-zinc-200 dark:bg-zinc-700 shadow-md border border-zinc-300 dark:border-zinc-600"
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          translateZ: zSpring,
          boxShadow: shadow,
        }}
        className={cn(
          "absolute inset-4 rounded-xl bg-white overflow-hidden [transform-style:preserve-3d]",
          containerClassName
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
