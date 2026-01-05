"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "gradient" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showValue = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    const variants = {
      default: "bg-primary",
      gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      error: "bg-rose-500",
    };

    const sizes = {
      sm: "h-1",
      md: "h-2",
      lg: "h-4",
    };

    return (
      <div className="w-full space-y-1">
        {showValue && (
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>{Math.round(percentage)}%</span>
            <span>{value} / {max}</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-secondary/30 backdrop-blur-sm",
            sizes[size],
            className
          )}
          {...props}
        >
          <motion.div
            className={cn("h-full rounded-full", variants[variant])}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={
              animated
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 0 }
            }
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
