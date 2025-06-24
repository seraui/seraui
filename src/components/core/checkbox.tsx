"use client";
import { motion } from "motion/react";

interface CheckBoxProps {
  checked: boolean;
  onClick: () => void;
  size?: number;
  color?: string;
  duration?: number;
}

export const CheckBox = ({
  checked,
  onClick,
  size = 32,
  color = "#00e599",
  duration = 1,
}: CheckBoxProps) => {
  return (
    <div className="select-none cursor-pointer" onClick={onClick}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <motion.path
          d="M 2.45 24.95 V 33.95 C 2.45 35.9382 4.0618 37.55 6.05 37.55 H 33.95 C 35.9382 37.55 37.55 35.9382 37.55 33.95 V 6.05 C 37.55 4.0618 35.9382 2.45 33.95 2.45 H 6.05 C 4.0618 2.45 2.45 4.0618 2.45 6.05 V 22.0617 C 2.45 23.0443 2.8516 23.9841 3.5616 24.6633 L 10.0451 30.8649 C 11.5404 32.2952 13.9308 32.1735 15.2731 30.5988 L 36.2 6.05"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={3}
          animate={{
            strokeDasharray: checked ? 150 : 132,
            strokeDashoffset: checked ? -134 : 0,
          }}
          transition={{
            duration,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};
