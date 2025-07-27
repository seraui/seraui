"use client";
import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(
  ({
    children,
    className = "",

    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],

    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",

      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>

        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";

export default function AuroraView() {
  return (
    <>
      <style>{`
        @keyframes aurora {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* The animation duration is now set via inline styles, so we don't need the --duration variable here. */
        .animate-aurora {
          animation-name: aurora;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-aurora { animation: none; }
        }
      `}</style>

      {/* demo ---------------------------------------------------------------- */}
      <main className="flex items-center justify-center font-sans text-black dark:text-white">
        <h1 className="text-6xl font-bold">
          Create{" "}
          <AuroraText speed={1} colors={["#38BDF8", "#3B82F6", "#EC4899"]}>
            beautiful
          </AuroraText>{" "}
          things
        </h1>
      </main>
    </>
  );
}
