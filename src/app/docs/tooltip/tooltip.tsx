"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right" | "auto";
  className?: string;
  arrow?: boolean;
  maxWidth?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
  className = "",
  arrow = true,
  maxWidth = "200px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && position === "auto") {
      const calculateAutoPosition = () => {
        if (!tooltipRef.current || !triggerRef.current) {
          setActualPosition("top");
          return;
        }

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        // Check if tooltip fits in each position
        const fitsTop = triggerRect.top - tooltipRect.height > 0;
        const fitsBottom =
          triggerRect.bottom + tooltipRect.height < viewport.height;
        const fitsLeft = triggerRect.left - tooltipRect.width > 0;
        const fitsRight =
          triggerRect.right + tooltipRect.width < viewport.width;

        // Prefer top, then bottom, then sides
        if (fitsTop) setActualPosition("top");
        else if (fitsBottom) setActualPosition("bottom");
        else if (fitsRight) setActualPosition("right");
        else if (fitsLeft) setActualPosition("left");
        else setActualPosition("top"); // Fallback
      };

      calculateAutoPosition();
    } else if (position !== "auto") {
      setActualPosition(position);
    }
  }, [isVisible, position]);

  const getPositionClasses = (pos: string) => {
    const positions = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
      left: "right-full top-1/2 -translate-y-1/2 mr-1",
      right: "left-full top-1/2 -translate-y-1/2 ml-1",
    };
    return positions[pos as keyof typeof positions] || positions.top;
  };

  const getArrowClasses = (pos: string) => {
    if (!arrow) return "";

    const arrows = {
      top: "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900 dark:after:border-t-white",
      bottom:
        "after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-900 dark:after:border-b-white",
      left: "after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-gray-900 dark:after:border-l-white",
      right:
        "after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-gray-900 dark:after:border-r-white",
    };
    return arrows[pos as keyof typeof arrows] || "";
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && text && (
        <div
          ref={tooltipRef}
          role="tooltip"
          aria-label={text}
          className={`
                        absolute z-50 px-3 py-2 text-sm font-medium rounded-lg border
                        transition-all duration-200 ease-in-out
                        animate-in fade-in-0 zoom-in-95
                        bg-white text-gray-900 border-gray-200 shadow-lg
                        dark:bg-gray-900 dark:text-white dark:border-gray-700
                        ${getPositionClasses(actualPosition)}
                        ${getArrowClasses(actualPosition)}
                        ${className}
                    `}
          style={{ maxWidth }}
        >
          <span className="relative z-10 break-words">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
