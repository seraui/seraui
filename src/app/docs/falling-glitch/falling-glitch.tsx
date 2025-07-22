"use client";
import React, { useRef, useEffect, useCallback, useMemo } from "react";

const FallingGlitch = ({
  // --- Style & Appearance ---
  glitchColors = ["#ff7cce", "#7cf0ff", "#fcf07c", "#8E44AD", "#3498DB"],
  fontSize = 14,
  backgroundColor = "#080A12",

  // --- Animation Behavior ---
  glitchSpeed = 50, // How often the background glitches
  glitchIntensity = 0.05, // % of background to change
  fallSpeed = 0.75, // How fast the characters fall

  // --- Vignette Effects ---
  outerVignette = true,

  // --- Children Prop ---
  children,
}: {
  glitchColors?: string[];
  fontSize?: number;
  backgroundColor?: string;
  glitchSpeed?: number;
  glitchIntensity?: number;
  fallSpeed?: number;
  outerVignette?: boolean;
  children?: React.ReactNode;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // --- Animation State Refs ---
  const grid = useRef({ columns: 0, rows: 0, charWidth: 0, charHeight: 0 });
  const letters = useRef<
    Array<{
      char: string;
      x: number;
      y: number;
      color: string;
    }>
  >([]);
  const lastGlitchTime = useRef(0);

  const characterSet = useMemo(() => '.:*+=#%@",', []);
  const getRandomChar = useCallback(
    () => characterSet[Math.floor(Math.random() * characterSet.length)],
    [characterSet]
  );
  const getRandomColor = useCallback(
    () => glitchColors[Math.floor(Math.random() * glitchColors.length)],
    [glitchColors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    // --- Canvas & Grid Setup ---
    const setup = () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.scale(dpr, dpr);

      ctx.font = `${fontSize}px monospace`;
      const charMetrics = ctx.measureText("M");
      grid.current = {
        columns: Math.floor(canvasWidth / charMetrics.width),
        rows: Math.floor(canvasHeight / (fontSize * 1.2)),
        charWidth: charMetrics.width,
        charHeight: fontSize * 1.2,
      };

      // Create enough letters to fill a space twice the screen height for a seamless loop.
      const extendedRows = grid.current.rows * 2;
      const totalLetters = grid.current.columns * extendedRows;
      letters.current = Array.from({ length: totalLetters }, (_, i) => {
        const col = i % grid.current.columns;
        const row = Math.floor(i / grid.current.columns);
        return {
          char: getRandomChar(),
          x: col * grid.current.charWidth,
          // Start letters off-screen at the top
          y:
            row * grid.current.charHeight -
            grid.current.rows * grid.current.charHeight,
          color: getRandomColor(),
        };
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // --- The Main Animation Loop ---
    const animate = (timestamp: number) => {
      animationFrameId.current = requestAnimationFrame(animate);

      // --- 1. Update States ---
      if (timestamp - lastGlitchTime.current > glitchSpeed) {
        lastGlitchTime.current = timestamp;
        const updateCount = Math.floor(
          letters.current.length * glitchIntensity
        );
        for (let i = 0; i < updateCount; i++) {
          const index = Math.floor(Math.random() * letters.current.length);
          if (letters.current[index]) {
            letters.current[index].char = getRandomChar();
            letters.current[index].color = getRandomColor();
          }
        }
      }

      // **CHANGE**: Update letter positions to make them fall
      const totalFieldHeight = grid.current.rows * grid.current.charHeight * 2;
      letters.current.forEach((letter) => {
        letter.y += fallSpeed;
        // If a letter goes off the bottom, wrap it to the top of the entire field
        if (letter.y > canvasHeight) {
          letter.y -= totalFieldHeight;
        }
      });

      // --- 2. Draw Frame ---
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      letters.current.forEach((letter) => {
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, letter.x, letter.y);
      });
    };

    // --- Event Handling & Cleanup ---
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setup, 150);
    };
    window.addEventListener("resize", handleResize);
    setup();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    glitchColors,
    fontSize,
    backgroundColor,
    glitchSpeed,
    glitchIntensity,
    fallSpeed,
    getRandomChar,
    getRandomColor,
  ]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      {outerVignette && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,_transparent_70%,_black_100%)]"></div>
      )}
      {/* Container for children, positioned above the canvas */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default function FallingGlitchAn() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        `}
      </style>
      <FallingGlitch>
        <div className="text-center">
          <h1
            className="text-7xl md:text-9xl font-bold text-white"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Sera UI
          </h1>
        </div>
      </FallingGlitch>
    </div>
  );
}
