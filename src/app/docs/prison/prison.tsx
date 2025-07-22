"use client";
import React, { useRef, useEffect, useCallback, useMemo } from "react";

interface Letter {
  char: string;
  color: string;
  glitchEndsAt: number;
}

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  leftWing: string[];
  body: string[];
  rightWing: string[];
  flapPhase: number;
}

interface Grid {
  columns: number;
  rows: number;
  charWidth: number;
  charHeight: number;
}

interface ButterflyGlitchProps {
  glitchColors?: string[];
  fontSize?: number;
  butterflySpeed?: number;
  glitchDuration?: number;
  glitchIntensity?: number;
  outerVignette?: boolean;
}

const ButterflyGlitch: React.FC<ButterflyGlitchProps> = ({
  glitchColors = ["#8E44AD", "#3498DB", "#E74C3C", "#F1C40F"],
  fontSize = 14,
  butterflySpeed = 1.5,
  glitchDuration = 400,
  glitchIntensity = 0.7,
  outerVignette = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const grid = useRef<Grid>({
    columns: 0,
    rows: 0,
    charWidth: 0,
    charHeight: 0,
  });
  const letters = useRef<Letter[]>([]);
  const butterfly = useRef<Butterfly | null>(null);

  const characterSet = useMemo(
    () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&()*+-=[]{}",
    []
  );

  const getRandomChar = useCallback(() => {
    return characterSet[Math.floor(Math.random() * characterSet.length)];
  }, [characterSet]);

  const getRandomColor = useCallback(() => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  }, [glitchColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      if (!canvas) return;
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

      ctx.font = `${fontSize}px monospace`;
      const charMetrics = ctx.measureText("M");

      grid.current = {
        columns: Math.ceil(rect.width / charMetrics.width),
        rows: Math.ceil(rect.height / (fontSize * 1.2)),
        charWidth: charMetrics.width,
        charHeight: fontSize * 1.2,
      };

      const totalLetters = grid.current.columns * grid.current.rows;
      letters.current = Array.from(
        { length: totalLetters },
        (): Letter => ({
          char: getRandomChar(),
          color: "rgba(200, 200, 200, 0.3)", // placeholder
          glitchEndsAt: 0,
        })
      );

      butterfly.current = {
        x: grid.current.columns / 2,
        y: grid.current.rows / 2,
        vx: (Math.random() - 0.5) * butterflySpeed,
        vy: (Math.random() - 0.5) * butterflySpeed,
        leftWing: ["<"],
        body: ["("],
        rightWing: [">"],
        flapPhase: 0,
      };

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const animate = (timestamp: number) => {
      animationFrameId.current = requestAnimationFrame(animate);

      const isDark = document.documentElement.classList.contains("dark");
      const bgColor = isDark ? "#000000" : "#FFFFFF";
      const baseTextColor = isDark
        ? "rgba(200, 200, 200, 0.3)"
        : "rgba(50, 50, 50, 0.3)";
      const butterflyColor = isDark ? "#FFFFFF" : "#000000";

      const b = butterfly.current;
      if (b) {
        b.x += b.vx;
        b.y += b.vy;
        b.vx += (Math.random() - 0.5) * 0.1;
        b.vy += (Math.random() - 0.5) * 0.1;
        b.vx = Math.max(-butterflySpeed, Math.min(butterflySpeed, b.vx));
        b.vy = Math.max(-butterflySpeed, Math.min(butterflySpeed, b.vy));
        if (b.x < 2 || b.x > grid.current.columns - 2) b.vx *= -1;
        if (b.y < 1 || b.y > grid.current.rows - 1) b.vy *= -1;
        b.flapPhase += 0.2;
        b.body = Math.sin(b.flapPhase) > 0 ? ["("] : ["o"];
        b.leftWing = Math.sin(b.flapPhase) > 0.5 ? ["<"] : ["-"];
        b.rightWing = Math.sin(b.flapPhase) > 0.5 ? [">"] : ["-"];
      }

      const butterflyCol = Math.floor(b?.x || 0);
      const butterflyRow = Math.floor(b?.y || 0);

      letters.current.forEach((letter, index) => {
        const col = index % grid.current.columns;
        const row = Math.floor(index / grid.current.columns);
        const dx = col - butterflyCol;
        const dy = row - butterflyRow;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 3 && timestamp > letter.glitchEndsAt) {
          letter.glitchEndsAt = timestamp + glitchDuration;
        }
        if (timestamp < letter.glitchEndsAt) {
          if (Math.random() > glitchIntensity) {
            letter.char = getRandomChar();
          }
          letter.color = getRandomColor();
        } else {
          letter.color = baseTextColor;
        }
      });

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      letters.current.forEach((letter, index) => {
        const x = (index % grid.current.columns) * grid.current.charWidth;
        const y =
          Math.floor(index / grid.current.columns) * grid.current.charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });

      if (b) {
        ctx.fillStyle = butterflyColor;
        const butterflyX = butterflyCol * grid.current.charWidth;
        const butterflyY = butterflyRow * grid.current.charHeight;
        ctx.fillText(
          b.leftWing.join(""),
          butterflyX - grid.current.charWidth,
          butterflyY
        );
        ctx.fillText(b.body.join(""), butterflyX, butterflyY);
        ctx.fillText(
          b.rightWing.join(""),
          butterflyX + grid.current.charWidth,
          butterflyY
        );
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
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
  }, [
    glitchColors,
    fontSize,
    butterflySpeed,
    glitchDuration,
    glitchIntensity,
    getRandomChar,
    getRandomColor,
  ]);

  return (
    <div className="relative w-full h-full bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_transparent_70%,_white_100%)] dark:bg-[radial-gradient(circle,_transparent_70%,_black_100%)]" />
      )}
    </div>
  );
};

export default function ButterflyGlitchView() {
  return (
    <div className="relative w-full">
      <ButterflyGlitch />
    </div>
  );
}
