"use client";
import React, { useEffect, useRef, FC, ReactNode } from "react";

interface NoiseCardProps {
  width?: string;
  height?: string;
  children: ReactNode;
  className?: string;
  animated?: boolean;
  noiseOpacity?: number;
  grainSize?: number;
  bgColor?: string;
}

const NoiseCard: FC<NoiseCardProps> = ({
  width = "w-96",
  height = "h-72",
  children,
  className = "",
  animated = true,
  noiseOpacity = 0.1,
  grainSize = 1,
  bgColor = "bg-[#0014FF]",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const drawNoise = () => {
      const { width, height } = canvas;
      if (width === 0 || height === 0) return;

      if (grainSize === 1) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const opacity = Math.floor(noiseOpacity * 255);

        for (let i = 0; i < data.length; i += 4) {
          const randomValue = Math.floor(Math.random() * 255);
          data[i] = randomValue;
          data[i + 1] = randomValue;
          data[i + 2] = randomValue;
          data[i + 3] = opacity;
        }

        ctx.putImageData(imageData, 0, 0);
      } else {
        ctx.clearRect(0, 0, width, height);
        for (let y = 0; y < height; y += grainSize) {
          for (let x = 0; x < width; x += grainSize) {
            const randomValue = Math.floor(Math.random() * 255);
            ctx.fillStyle = `rgba(${randomValue}, ${randomValue}, ${randomValue}, ${noiseOpacity})`;
            ctx.fillRect(x, y, grainSize, grainSize);
          }
        }
      }
    };

    const loop = () => {
      drawNoise();
      animationFrameId = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        drawNoise();
      }
    });

    resizeObserver.observe(container);

    if (animated) {
      loop();
    } else {
      drawNoise();
    }

    return () => {
      if (animated) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
    };
  }, [animated, noiseOpacity, grainSize]);

  return (
    <div
      ref={containerRef}
      className={`${width} ${height} ${bgColor} rounded-xl p-8 relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10 text-white h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default NoiseCard;
