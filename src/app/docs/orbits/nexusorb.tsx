"use client";

import React, { useState } from "react";
import {
  GrayGridsLogo,
  NextJsTemplatesLogo,
  PimjoLogo,
  SaasBoldLogo,
  StaticRunLogo,
  TailAdminLogo,
  TailgridsLogo,
  UideckLogo,
} from "./icons";

// Wrapper for individual icons to give them the glassy container style and hover effects
const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
}) => (
  <div
    className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300
        ${
          isHighlighted
            ? "dark:bg-gray-700/50 bg-gray-100/80 border border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
            : `dark:bg-white/5 bg-white/60 border border-gray-200/50 dark:border-white/10 ${!isHovered && "animate-float"}`
        }
        ${
          isHovered
            ? "dark:bg-gray-600/50 bg-gray-200/80 border-blue-400/60 scale-110 dark:shadow-blue-400/30 shadow-blue-400/40 shadow-2xl"
            : "dark:hover:bg-white/10 hover:bg-gray-100/80 dark:hover:border-white/20 hover:border-gray-300/60"
        }
        ${className}
    `}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

// The grid of icons, now with animations and precise SVG connecting lines
const IconGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const outerIcons = [
    { id: 1, component: <GrayGridsLogo /> },
    { id: 2, component: <TailAdminLogo /> },
    { id: 3, component: <NextJsTemplatesLogo /> },
    { id: 4, component: <StaticRunLogo /> },
    { id: 5, component: <TailgridsLogo /> },
    { id: 6, component: <UideckLogo /> },
    { id: 7, component: <SaasBoldLogo /> },
  ];

  // Constants for layout calculation
  const radius = 160;
  const centralIconRadius = 48; // w-24 is 96px, radius is 48px
  const outerIconRadius = 40; // w-20 is 80px, radius is 40px
  const svgSize = 380;
  const svgCenter = svgSize / 2;

  return (
    // Use scale to make the entire component responsive
    <div className="relative w-[380px] h-[380px] scale-75 md:scale-100">
      {/* SVG container for all connecting lines, drawn underneath the icons */}
      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <g>
          {outerIcons.map((icon, i) => {
            // Calculate the angle for each icon
            const angleInDegrees = -150 + i * 60;
            const angleInRadians = angleInDegrees * (Math.PI / 180);

            // Calculate start and end points for the line
            const startX =
              svgCenter + centralIconRadius * Math.cos(angleInRadians);
            const startY =
              svgCenter + centralIconRadius * Math.sin(angleInRadians);
            const endX =
              svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
            const endY =
              svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);

            return (
              <line
                key={`line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={hoveredId === icon.id ? "#3B82F6" : "#6B7280"}
                strokeWidth="2"
                className="transition-all duration-300 dark:stroke-gray-600"
                style={{
                  opacity: hoveredId === icon.id ? 1 : 0.3,
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* The main container that acts as the center for the circle */}
      <div className="absolute top-1/2 left-1/2">
        {/* Center Icon */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper
            className="w-24 h-24"
            isHighlighted={true}
            animationDelay={0}
          >
            <PimjoLogo />
          </IconWrapper>
        </div>

        {/* Mapping over the outer icons to place them */}
        {outerIcons.map((icon, i) => {
          const angleInDegrees = -150 + i * 60;
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          const iconStyle = {
            transform: `translate(${x}px, ${y}px)`,
          };

          return (
            <div
              key={icon.id}
              className="absolute z-10"
              style={iconStyle}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <IconWrapper
                  className="w-20 h-20"
                  isHovered={hoveredId === icon.id}
                  animationDelay={i * 0.2}
                >
                  {icon.component}
                </IconWrapper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// The main App component that brings everything together
export default function NexusOrb() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-8 overflow-hidden">
      {/* Style block to define the animations. */}
      <style>
        {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }

                @keyframes breathing-glow {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
                }
                @keyframes breathing-glow-light {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
                }
                .animate-breathing-glow {
                    animation: breathing-glow 3s ease-in-out infinite;
                }
                .dark .animate-breathing-glow {
                    animation: breathing-glow 3s ease-in-out infinite;
                }
                :not(.dark) .animate-breathing-glow {
                    animation: breathing-glow-light 3s ease-in-out infinite;
                }
            `}
      </style>

      {/* Enhanced background with a radial gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 container mx-auto flex items-center justify-center">
        <IconGrid />
      </div>
    </div>
  );
}
