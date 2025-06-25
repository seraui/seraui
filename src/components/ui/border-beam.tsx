"use client";

import { cn } from "@/lib/utils";
import { motion, MotionStyle, Transition } from "motion/react";
import { forwardRef, useMemo } from "react";

interface BorderBeamProps {
  /**
   * The size of the border beam in pixels.
   * @default 50
   */
  size?: number;
  /**
   * The duration of the border beam animation in seconds.
   * @default 6
   */
  duration?: number;
  /**
   * The delay before the animation starts in seconds.
   * @default 0
   */
  delay?: number;
  /**
   * The starting color of the border beam gradient.
   * @default "#ffaa40"
   */
  colorFrom?: string;
  /**
   * The ending color of the border beam gradient.
   * @default "#9c40ff"
   */
  colorTo?: string;
  /**
   * The motion transition configuration for the border beam.
   */
  transition?: Transition;
  /**
   * Additional CSS classes to apply to the border beam.
   */
  className?: string;
  /**
   * Additional inline styles to apply to the border beam.
   */
  style?: React.CSSProperties;
  /**
   * Whether to reverse the animation direction.
   * @default false
   */
  reverse?: boolean;
  /**
   * The initial offset position as a percentage (0-100).
   * @default 0
   */
  initialOffset?: number;
  /**
   * Whether the animation should be paused.
   * @default false
   */
  paused?: boolean;
  /**
   * The border radius to apply to the beam path.
   * @default "auto" (inherits from parent)
   */
  borderRadius?: number | "auto";
  /**
   * The opacity of the border beam.
   * @default 1
   */
  opacity?: number;
}

export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    {
      className,
      size = 50,
      delay = 0,
      duration = 6,
      colorFrom = "#ffaa40",
      colorTo = "#9c40ff",
      transition,
      style,
      reverse = false,
      initialOffset = 0,
      paused = false,
      borderRadius = "auto",
      opacity = 1,
    },
    ref,
  ) => {
    // Memoize the offset path to prevent unnecessary recalculations
    const offsetPath = useMemo(() => {
      const radius = borderRadius === "auto" ? size : borderRadius;
      return `rect(0 auto auto 0 round ${radius}px)`;
    }, [borderRadius, size]);

    // Memoize the animation values
    const animationValues = useMemo(() => {
      const start = `${initialOffset}%`;
      const end = reverse
        ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
        : [`${initialOffset}%`, `${100 + initialOffset}%`];
      return { start, end };
    }, [initialOffset, reverse]);

    // Memoize the transition configuration
    const transitionConfig = useMemo(() => ({
      repeat: paused ? 0 : Infinity,
      ease: "linear" as const,
      duration,
      delay: -delay,
      ...transition,
    }), [paused, duration, delay, transition]);

    return (
      <div
        ref={ref}
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        role="presentation"
        aria-hidden="true"
      >
        <motion.div
          className={cn(
            "absolute aspect-square",
            "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
            className,
          )}
          style={
            {
              width: size,
              offsetPath,
              "--color-from": colorFrom,
              "--color-to": colorTo,
              opacity,
              ...style,
            } as MotionStyle
          }
          initial={{ offsetDistance: animationValues.start }}
          animate={{
            offsetDistance: animationValues.end,
          }}
          transition={transitionConfig}
        />
      </div>
    );
  },
);

BorderBeam.displayName = "BorderBeam"; 