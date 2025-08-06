"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right" | "auto";
  delay?: number;
  disabled?: boolean;
  className?: string;
  arrow?: boolean;
  maxWidth?: string;
  variant?:
    | "default"
    | "dark"
    | "light"
    | "info"
    | "success"
    | "warning"
    | "error";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
  delay = 300,
  disabled = false,
  className = "",
  arrow = true,
  maxWidth = "200px",
  variant = "default",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const getVariantStyles = (variant: string) => {
    const variants = {
      default: "bg-gray-900 text-white border-gray-700",
      dark: "bg-black text-white border-gray-800",
      light: "bg-white text-gray-900 border-gray-200 shadow-lg",
      info: "bg-blue-600 text-white border-blue-500",
      success: "bg-green-600 text-white border-green-500",
      warning: "bg-yellow-600 text-white border-yellow-500",
      error: "bg-red-600 text-white border-red-500",
    };
    return variants[variant as keyof typeof variants] || variants.default;
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsVisible(false);
    }
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
      top: "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-current",
      bottom:
        "after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-current",
      left: "after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-current",
      right:
        "after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-current",
    };
    return arrows[pos as keyof typeof arrows] || "";
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
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
                        ${getPositionClasses(actualPosition)}
                        ${getVariantStyles(variant)}
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
