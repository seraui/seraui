"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

// The core MatrixRain component remains largely the same,
// accepting theme-related props.
interface MatrixRainProps {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  streamSpeed?: number;
}

interface Stream {
  x: number;
  y: number;
  speed: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  // --- Style & Appearance ---
  backgroundColor = "rgba(0, 0, 0, 0.1)", // Default background
  textColor = "#00ff41", // Default text color
  fontSize = 16,

  // --- Animation & Behavior ---
  streamSpeed = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const characterSet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:",.<>?/'.split("");

  // The core drawing logic, memoized for performance.
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, streams: Stream[]) => {
      // Draw a semi-transparent rectangle to create the fading trail effect.
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Set properties for the falling characters.
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px monospace`;

      // Draw each character in the stream.
      streams.forEach((stream) => {
        const char =
          characterSet[Math.floor(Math.random() * characterSet.length)];
        ctx.fillText(char, stream.x, stream.y);
        stream.y += stream.speed;

        // Reset the stream if it goes off-screen.
        if (stream.y > ctx.canvas.height + Math.random() * 10000) {
          stream.y = 0;
          stream.speed = Math.random() * streamSpeed + 2;
        }
      });

      // Continue the animation loop.
      animationFrameId.current = requestAnimationFrame(() =>
        draw(ctx, streams)
      );
    },
    [backgroundColor, textColor, fontSize, characterSet, streamSpeed]
  );

  // Setup and resize handling for the canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let streams: Stream[] = [];

    const setup = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      const columnWidth = fontSize;
      const columnCount = Math.floor(canvas.width / dpr / columnWidth);

      streams = Array.from({ length: columnCount }, (_, i) => ({
        x: i * columnWidth,
        y: Math.random() * -canvas.height,
        speed: Math.random() * streamSpeed + 2,
      }));

      draw(ctx, streams);
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setup, 150);
    };

    window.addEventListener("resize", handleResize);
    setup();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [draw, fontSize, streamSpeed]);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};

// The main App component now uses Tailwind's dark mode system.
export default function App() {
  // State to hold the dynamic colors for the canvas, which cannot be styled by CSS.
  const [canvasColors, setCanvasColors] = useState({
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Default to light mode
    textColor: "#333333",
  });

  // This effect detects changes to Tailwind's dark mode class on the <html> element.
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        // Set colors for dark mode
        setCanvasColors({
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          textColor: "#20C20E",
        });
      } else {
        // Set colors for light mode
        setCanvasColors({
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#333333",
        });
      }
    };

    // Check the theme when the component mounts.
    checkDarkMode();

    // Use a MutationObserver to watch for class changes on the <html> element.
    // This makes the component react instantly to external theme changes.
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup the observer when the component unmounts.
    return () => observer.disconnect();
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return (
    // Use Tailwind's dark: variant to switch the background color.
    <div className="relative w-full overflow-hidden bg-white dark:bg-black">
      <MatrixRain
        backgroundColor={canvasColors.backgroundColor}
        textColor={canvasColors.textColor}
        fontSize={18}
        streamSpeed={5}
      />
      {/* Vignette for light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0)_60%,_rgba(255,255,255,1)_100%)] dark:hidden pointer-events-none"></div>
      {/* Vignette for dark mode */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)] dark:block pointer-events-none"></div>
    </div>
  );
}
