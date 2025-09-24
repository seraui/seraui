"use client";
import React, { useState } from "react";
import {
  GrayGridsLogo,
  LineIconsLogo,
  NextJsTemplatesLogo,
  PimjoLogo,
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
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300 border
        ${
          isHighlighted
            ? "dark:bg-gray-700/50 bg-gray-100/80 border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
            : `dark:bg-white/5 bg-white/60 dark:border-white/20 border-gray-300/60 ${!isHovered && "animate-float"}`
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

// The grid of icons, now with a "spider net" connecting line system
const IconGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const outerIcons = [
    { id: 1, component: <TailAdminLogo /> },
    { id: 2, component: <TailgridsLogo /> },
    { id: 3, component: <UideckLogo /> },
    { id: 4, component: <GrayGridsLogo /> },
    { id: 5, component: <StaticRunLogo /> },
    { id: 6, component: <NextJsTemplatesLogo /> },
    { id: 7, component: <LineIconsLogo /> },
  ];

  // Constants for layout calculation
  const radius = 160;
  const centralIconRadius = 48; // w-24 is 96px, radius is 48px
  const outerIconRadius = 32; // w-16 is 64px, radius is 32px
  const svgSize = 400;
  const svgCenter = svgSize / 2;

  return (
    // Use scale to make the entire component responsive
    <div className="relative w-[400px] h-[400px] scale-75 md:scale-90 lg:scale-100">
      {/* SVG container for all connecting lines, drawn underneath the icons */}
      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {/* Draw lines between outer icons (the "web") */}
          {outerIcons.map((icon, i) => {
            const nextIndex = (i + 1) % outerIcons.length;
            const nextIcon = outerIcons[nextIndex];

            const angle1 =
              (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
            const x1 =
              svgCenter + (radius - outerIconRadius) * Math.cos(angle1);
            const y1 =
              svgCenter + (radius - outerIconRadius) * Math.sin(angle1);

            const angle2 =
              (-90 + nextIndex * (360 / outerIcons.length)) * (Math.PI / 180);
            const x2 =
              svgCenter + (radius - outerIconRadius) * Math.cos(angle2);
            const y2 =
              svgCenter + (radius - outerIconRadius) * Math.sin(angle2);

            const isLineActive =
              hoveredId === icon.id || hoveredId === nextIcon.id;

            return (
              <line
                key={`web-line-${icon.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isLineActive ? "#3B82F6" : "#6B7280"}
                strokeWidth="1.5"
                className="transition-all duration-300 dark:stroke-gray-600"
                style={{ opacity: isLineActive ? 0.8 : 0.25 }}
                filter={isLineActive ? "url(#glow)" : "none"}
              />
            );
          })}

          {/* Draw lines from center to outer icons (the "spokes") */}
          {outerIcons.map((icon, i) => {
            const angleInDegrees = -90 + i * (360 / outerIcons.length);
            const angleInRadians = angleInDegrees * (Math.PI / 180);

            const startX =
              svgCenter + centralIconRadius * Math.cos(angleInRadians);
            const startY =
              svgCenter + centralIconRadius * Math.sin(angleInRadians);
            const endX =
              svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
            const endY =
              svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);
            const isSpokeActive = hoveredId === icon.id;

            return (
              <line
                key={`spoke-line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isSpokeActive ? "#3B82F6" : "#6B7280"}
                strokeWidth="1.5"
                className="transition-all duration-300 dark:stroke-gray-600"
                style={{ opacity: isSpokeActive ? 1 : 0.25 }}
                filter={isSpokeActive ? "url(#glow)" : "none"}
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
          const angleInDegrees = -90 + i * (360 / outerIcons.length);
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          const iconStyle = {
            transform: `translate(${x}px, ${y}px)`,
          };
          const isHovered = hoveredId === icon.id;

          return (
            <div
              key={icon.id}
              className="absolute z-10"
              style={iconStyle}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 relative">
                {/* Spotlight effect */}
                <div
                  className={`absolute inset-[-20px] bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-2xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                ></div>

                <IconWrapper
                  className="w-16 h-16"
                  isHovered={isHovered}
                  animationDelay={i * 0.15}
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
export default function Spider() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-4 sm:p-8 overflow-hidden">
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
