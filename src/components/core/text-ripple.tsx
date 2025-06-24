"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface TextRippleProps {
  children: string;
  className?: string;
  maxScale?: number;
  falloff?: number;
}

export const TextRipple = ({
  children,
  className,
  maxScale = 2,
  falloff = 0.3,
}: TextRippleProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chars = children.split("");

  const getScaleY = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1, maxScale - distance * falloff);
  };

  return (
    <div className={cn("relative font-bold text-2xl", className)}>
      {chars.map((s, index) => (
        <motion.span
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="inline-block origin-bottom leading-[0.7]"
          animate={{ scaleY: getScaleY(index) }}
          key={`${s}-${index}`}
        >
          {s === " " ? "\u00A0" : s}
        </motion.span>
      ))}
    </div>
  );
};
