"use client";
import { useRef, useEffect, useCallback } from "react";

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;
const CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()-_{}[]:;<>,.?/";
class Particle {
  x: number;
  y: number;
  char: string;
  initialColor: string;
  currentColor: string;
  targetColor: string;
  colorProgress: number;

  constructor(
    x: number,
    y: number,
    char: string,
    color: string,
    targetColor: string
  ) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.initialColor = color;
    this.currentColor = color;
    this.targetColor = targetColor;
    this.colorProgress = 1.0; // Start fully at the initial color
  }

  // Draws the particle on the canvas
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.currentColor;
    ctx.fillText(this.char, this.x, this.y);
  }

  // Assigns a new random character
  randomizeCharacter() {
    this.char = CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
  }

  // Sets a new target color to transition towards
  setNewTargetColor(newColor: string, smooth: boolean) {
    if (!smooth) {
      this.currentColor = newColor;
      this.targetColor = newColor;
      this.colorProgress = 1.0;
    } else {
      this.initialColor = this.currentColor;
      this.targetColor = newColor;
      this.colorProgress = 0.0;
    }
  }

  // Updates the color transition if needed
  updateColorTransition(): boolean {
    if (this.colorProgress >= 1) return false;

    this.colorProgress = Math.min(this.colorProgress + 0.05, 1);

    const start = ColorUtils.hexToRgb(this.initialColor);
    const end = ColorUtils.hexToRgb(this.targetColor);

    if (start && end) {
      this.currentColor = ColorUtils.interpolateRgb(
        start,
        end,
        this.colorProgress
      );
    }
    return true; // Indicates a change was made
  }
}

// ================================================================================
// Utility Functions
// A collection of pure helper functions.
// ================================================================================
interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const ColorUtils = {
  // A different implementation of hex-to-rgb conversion
  hexToRgb(hex: string): RgbColor | null {
    if (!hex || hex.charAt(0) !== "#") return null;
    const cleanHex = hex.substring(1);

    // Handle 3-digit hex
    const fullHex =
      cleanHex.length === 3
        ? cleanHex
            .split("")
            .map((c: string) => c + c)
            .join("")
        : cleanHex;

    if (fullHex.length !== 6) return null;

    return {
      r: parseInt(fullHex.substring(0, 2), 16),
      g: parseInt(fullHex.substring(2, 4), 16),
      b: parseInt(fullHex.substring(4, 6), 16),
    };
  },
  // Interpolates between two RGB colors
  interpolateRgb(start: RgbColor, end: RgbColor, factor: number): string {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  },
  // Picks a random color from the provided array
  getRandomColor(colors: string[]): string {
    return colors[Math.floor(Math.random() * colors.length)];
  },
};

interface AnimationOptions {
  colors?: string[];
  speed?: number;
  smooth?: boolean;
}

const useMatrixAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: AnimationOptions
) => {
  const {
    colors = ["#2b4539", "#61dca3", "#61b3dc"],
    speed = 50,
    smooth = true,
  } = options;

  // Using refs to store animation state without causing re-renders
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Memoize the getRandomColor function to ensure stability
  const getRandomColorMemoized = useCallback(
    () => ColorUtils.getRandomColor(colors),
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    contextRef.current = context;

    let grid = { cols: 0, rows: 0 };

    // This function initializes or re-initializes the particle grid
    const setup = (width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      context.font = `${FONT_SIZE}px monospace`;
      context.textBaseline = "top";

      grid.cols = Math.ceil(width / CHAR_WIDTH);
      grid.rows = Math.ceil(height / CHAR_HEIGHT);

      particlesRef.current = [];
      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
          const x = col * CHAR_WIDTH;
          const y = row * CHAR_HEIGHT;
          const char =
            CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
          const color = getRandomColorMemoized();
          const targetColor = getRandomColorMemoized();
          particlesRef.current.push(
            new Particle(x, y, char, color, targetColor)
          );
        }
      }
    };

    // The main animation loop
    const animate = (timestamp: number) => {
      let needsRedraw = false;
      const elapsed = timestamp - lastUpdateTime.current;

      // Update a batch of particles based on the speed setting
      if (elapsed > speed) {
        const updateCount = Math.max(
          1,
          Math.floor(particlesRef.current.length * 0.05)
        );
        for (let i = 0; i < updateCount; i++) {
          const index = Math.floor(Math.random() * particlesRef.current.length);
          const particle = particlesRef.current[index];
          if (particle) {
            particle.randomizeCharacter();
            particle.setNewTargetColor(getRandomColorMemoized(), smooth);
          }
        }
        lastUpdateTime.current = timestamp;
        needsRedraw = true;
      }

      // Handle smooth color transitions for any active particles
      if (smooth) {
        particlesRef.current.forEach((p) => {
          if (p.updateColorTransition()) {
            needsRedraw = true;
          }
        });
      }

      // Only redraw the canvas if something has changed
      if (needsRedraw) {
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        particlesRef.current.forEach((p) => p.draw(context));
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Use ResizeObserver for efficient resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setup(width, height);
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Start the animation
    animate(0);

    // Cleanup function to stop the animation and observer
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
    };
  }, [colors, speed, smooth, canvasRef, getRandomColorMemoized]); // Dependencies for the effect
};

interface LetterGlitchProps {
  glitchColors: string[];
  glitchSpeed: number;
  smooth: boolean;
  centerVignette?: boolean;
  outerVignette?: boolean;
}

const LetterGlitch = ({
  glitchColors,
  glitchSpeed,
  smooth,
  centerVignette = false,
  outerVignette = true,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The custom hook handles all the complex animation logic
  useMatrixAnimation(canvasRef, {
    colors: glitchColors,
    speed: glitchSpeed,
    smooth: smooth,
  });

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Vignette overlays for visual effect */}
      {outerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>
      )}
      {centerVignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
      )}
    </div>
  );
};

// ================================================================================
// Wrapper / Example Implementation
// This component demonstrates how to use the MatrixRain component.
// ================================================================================
export default function LetterGlitchWrapper() {
  return (
    <div className="w-full h-[400px]">
      <LetterGlitch
        glitchColors={[
          "#32a852", // green
          "#4287f5", // blue
          "#d942f5", // purple
          "#f54242", // red
          "#f5e342", // yellow
          "#42f5f5", // cyan
          "#f5a142", // orange
        ]}
        glitchSpeed={50}
        smooth={true}
        outerVignette={true}
        centerVignette={false}
      />
    </div>
  );
}
