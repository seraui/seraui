"use client";
import React, { useRef, useEffect, useCallback, useMemo } from "react";

// Type declarations for OffscreenCanvas (may not be available in all environments)
declare global {
  interface Window {
    OffscreenCanvas?: {
      new (width: number, height: number): OffscreenCanvas;
    };
  }
}

interface OffscreenCanvas {
  width: number;
  height: number;
  getContext(
    contextId: "2d",
    options?: CanvasRenderingContext2DSettings
  ): OffscreenCanvasRenderingContext2D | null;
}

interface OffscreenCanvasRenderingContext2D {
  canvas: OffscreenCanvas;
  clearRect(x: number, y: number, w: number, h: number): void;
  fillText(text: string, x: number, y: number): void;
  createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ): CanvasGradient;
  font: string;
  textBaseline: CanvasTextBaseline;
  fillStyle: string | CanvasGradient | CanvasPattern;
  globalAlpha: number;
}

interface HexColor {
  r: number;
  g: number;
  b: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface GridDimensions {
  cols: number;
  rows: number;
}

interface MatrixAnimationOptions {
  glitchColor?: string;
  glitchRadius?: number;
  performanceMode?: "high" | "balanced" | "low";
}

interface LetterGlitchProps {
  glitchColor?: string;
  glitchRadius?: number;
  interactionRef: React.RefObject<HTMLDivElement | null>;
  performanceMode?: "high" | "balanced" | "low";
}

interface GlitchVaultProps {
  children: React.ReactNode;
  className?: string;
  glitchColor?: string;
  glitchRadius?: number;
  performanceMode?: "high" | "balanced" | "low";
  disabled?: boolean;
  theme?: "light" | "dark" | "auto";
}

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;
const CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()-_{}[]:;<>,.?/";
const PARTICLE_POOL_SIZE = 5000; // Pre-allocate particles
const RENDER_THROTTLE = 16; // Throttle rendering to ~60fps

// Theme-specific color

function hexToRgb(hex: string): HexColor | null {
  if (!hex) return null;
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(
    shorthandRegex,
    (_: string, r: string, g: string, b: string) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

class Particle {
  x = 0;
  y = 0;
  char = "";
  opacity = 0;
  targetOpacity = 0;
  opacityVelocity = 0;
  lastUpdate = 0;
  isActive = false;
  isDirty = false;

  reset(x: number, y: number, char: string): void {
    this.x = x;
    this.y = y;
    this.char = char;
    this.opacity = 0;
    this.targetOpacity = 0;
    this.opacityVelocity = 0;
    this.lastUpdate = performance.now();
    this.isActive = true;
    this.isDirty = false;
  }

  update(deltaTime: number): boolean {
    if (!this.isActive || Math.abs(this.opacity - this.targetOpacity) < 0.01) {
      if (this.opacity !== this.targetOpacity) {
        this.opacity = this.targetOpacity;
      }
      return false;
    }

    const diff = this.targetOpacity - this.opacity;
    this.opacityVelocity = diff * 0.15; // Smooth easing
    this.opacity += this.opacityVelocity * (deltaTime / 16);

    if (Math.abs(this.opacity - this.targetOpacity) < 0.01) {
      this.opacity = this.targetOpacity;
    }

    this.isDirty = true;
    return true;
  }

  setTargetOpacity(target: number): void {
    if (this.targetOpacity !== target) {
      this.targetOpacity = target;
      if (target > 0 && this.opacity === 0) {
        this.randomizeCharacter();
      }
    }
  }

  randomizeCharacter(): void {
    this.char = CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
    this.isDirty = true;
  }
}

class ParticlePool {
  pool: Particle[] = [];
  activeParticles = new Set<Particle>();

  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      this.pool.push(new Particle());
    }
  }

  acquire(x: number, y: number, char: string): Particle | null {
    const particle = this.pool.pop();
    if (particle) {
      particle.reset(x, y, char);
      this.activeParticles.add(particle);
      return particle;
    }
    // console.warn("Particle pool depleted.");
    return null;
  }

  release(particle: Particle): void {
    particle.isActive = false;
    this.activeParticles.delete(particle);
    this.pool.push(particle);
  }

  getActiveParticles(): Particle[] {
    return Array.from(this.activeParticles);
  }

  clear(): void {
    this.activeParticles.forEach((p) => this.release(p));
  }
}

class RenderingEngine {
  ctx: CanvasRenderingContext2D;
  offscreenCanvas: OffscreenCanvas | null = null;
  offscreenCtx: OffscreenCanvasRenderingContext2D | null = null;
  lastRenderTime = 0;
  renderThrottle: number;

  constructor(ctx: CanvasRenderingContext2D, throttle = RENDER_THROTTLE) {
    this.ctx = ctx;
    this.renderThrottle = throttle;
    this.setupOffscreenCanvas();
  }

  setupOffscreenCanvas(): void {
    if (typeof window !== "undefined" && window.OffscreenCanvas) {
      this.offscreenCanvas = new window.OffscreenCanvas(
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );
      this.offscreenCtx = this.offscreenCanvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      });

      if (this.offscreenCtx) {
        this.offscreenCtx.font = `${FONT_SIZE}px monospace`;
        this.offscreenCtx.textBaseline = "top";
      }
    }
  }

  render(
    particles: Particle[],
    glitchColor: string,
    forceRender = false
  ): void {
    const now = performance.now();
    if (!forceRender && now - this.lastRenderTime < this.renderThrottle) {
      return;
    }

    this.lastRenderTime = now;
    const renderCtx = this.offscreenCtx || this.ctx;
    const baseColor = hexToRgb(glitchColor);
    if (!baseColor) return; // Exit if the color is invalid

    renderCtx.clearRect(0, 0, renderCtx.canvas.width, renderCtx.canvas.height);

    const opacityBuckets = new Map<number, Particle[]>();

    particles.forEach((particle) => {
      if (particle.opacity > 0.01) {
        const bucketKey = Math.round(particle.opacity * 20) / 20; // Group in 5% increments
        if (!opacityBuckets.has(bucketKey)) {
          opacityBuckets.set(bucketKey, []);
        }
        opacityBuckets.get(bucketKey)!.push(particle);
      }
    });

    opacityBuckets.forEach((bucket, opacity) => {
      renderCtx.globalAlpha = opacity;

      bucket.forEach((particle) => {
        const gradient = renderCtx.createRadialGradient(
          particle.x + CHAR_WIDTH / 2,
          particle.y + CHAR_HEIGHT / 2,
          0,
          particle.x + CHAR_WIDTH / 2,
          particle.y + CHAR_HEIGHT / 2,
          CHAR_WIDTH * 1.5
        );

        gradient.addColorStop(
          0,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1)`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.5)`
        );
        gradient.addColorStop(
          1,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0)`
        );

        renderCtx.fillStyle = gradient;
        renderCtx.fillText(particle.char, particle.x, particle.y);
      });
    });

    if (this.offscreenCanvas && this.offscreenCtx) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(
        this.offscreenCanvas as unknown as CanvasImageSource,
        0,
        0
      );
    }
  }

  resize(width: number, height: number): void {
    if (this.offscreenCanvas) {
      this.offscreenCanvas.width = width;
      this.offscreenCanvas.height = height;
      if (this.offscreenCtx) {
        this.offscreenCtx.font = `${FONT_SIZE}px monospace`;
        this.offscreenCtx.textBaseline = "top";
      }
    }
  }
}

const useMatrixAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  interactionRef: React.RefObject<HTMLDivElement | null>,
  options: MatrixAnimationOptions
) => {
  const {
    glitchColor = "#00ffff",
    glitchRadius = 100,
    performanceMode = "balanced",
  } = options;

  const particlePoolRef = useRef<ParticlePool | null>(null);
  const renderingEngineRef = useRef<RenderingEngine | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosRef = useRef<MousePosition | null>(null);
  const lastFrameTime = useRef(0);
  const gridRef = useRef<GridDimensions>({
    cols: 0,
    rows: 0,
  });

  const performanceSettings = useMemo(() => {
    switch (performanceMode) {
      case "high":
        return {
          updateInterval: 16,
          renderThrottle: 16,
          batchSize: 200,
        };
      case "low":
        return {
          updateInterval: 50,
          renderThrottle: 33,
          batchSize: 50,
        };
      default:
        return {
          updateInterval: 33,
          renderThrottle: 16,
          batchSize: 100,
        };
    }
  }, [performanceMode]);

  const handleMouseMove = useCallback(
    (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const interactionElement = interactionRef?.current;
      if (!interactionElement) return;

      const rect = interactionElement.getBoundingClientRect();
      mousePosRef.current = {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    },
    [interactionRef]
  );

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const interactionElement = interactionRef?.current || canvas;
    if (!canvas || !interactionElement) return;

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!context) return;

    particlePoolRef.current = new ParticlePool(PARTICLE_POOL_SIZE);
    renderingEngineRef.current = new RenderingEngine(
      context,
      performanceSettings.renderThrottle
    );

    const setup = (width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      context.font = `${FONT_SIZE}px monospace`;
      context.textBaseline = "top";

      gridRef.current.cols = Math.ceil(width / CHAR_WIDTH);
      gridRef.current.rows = Math.ceil(height / CHAR_HEIGHT);

      particlePoolRef.current?.clear();

      for (let row = 0; row < gridRef.current.rows; row++) {
        for (let col = 0; col < gridRef.current.cols; col++) {
          const x = col * CHAR_WIDTH;
          const y = row * CHAR_HEIGHT;
          const char =
            CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
          particlePoolRef.current?.acquire(x, y, char);
        }
      }

      renderingEngineRef.current?.resize(canvas.width, canvas.height);
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime.current;

      if (deltaTime >= performanceSettings.updateInterval) {
        const particles = particlePoolRef.current?.getActiveParticles() || [];
        const mousePos = mousePosRef.current;
        let needsRender = false;

        for (
          let i = 0;
          i < particles.length;
          i += performanceSettings.batchSize
        ) {
          const batch = particles.slice(i, i + performanceSettings.batchSize);

          batch.forEach((particle) => {
            let targetOpacity = 0;

            if (mousePos) {
              const dx = particle.x - mousePos.x + CHAR_WIDTH / 2;
              const dy = particle.y - mousePos.y + CHAR_HEIGHT / 2;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < glitchRadius) {
                targetOpacity = 1 - distance / glitchRadius;
              }
            }

            particle.setTargetOpacity(targetOpacity);
            if (particle.update(deltaTime)) {
              needsRender = true;
            }
          });
        }

        if (needsRender && renderingEngineRef.current) {
          renderingEngineRef.current.render(particles, glitchColor);
        }

        lastFrameTime.current = currentTime;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    interactionElement.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    interactionElement.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setup(width, height);
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    lastFrameTime.current = performance.now();
    animate(lastFrameTime.current);

    return () => {
      interactionElement.removeEventListener("mousemove", handleMouseMove);
      interactionElement.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
      particlePoolRef.current?.clear();
    };
  }, [
    glitchColor,
    glitchRadius,
    handleMouseMove,
    handleMouseLeave,
    canvasRef,
    interactionRef,
    performanceSettings,
  ]);
};

const LetterGlitch = React.memo<LetterGlitchProps>(
  ({
    glitchColor,
    glitchRadius,
    interactionRef,
    performanceMode = "balanced",
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useMatrixAnimation(canvasRef, interactionRef, {
      glitchColor,
      glitchRadius,
      performanceMode,
    });

    return <canvas ref={canvasRef} className="block w-full h-full" />;
  }
);

LetterGlitch.displayName = "LetterGlitch";

const GlitchVault = React.memo<GlitchVaultProps>(
  ({
    children,
    className,
    glitchColor = "#0AF0F0",
    glitchRadius = 120,
    performanceMode = "balanced",
    disabled = false,
  }) => {
    const interactionRef = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={interactionRef}
        className={`relative rounded-2xl overflow-hidden ${className}`}
      >
        {!disabled && (
          <div className="absolute inset-0 z-0">
            <LetterGlitch
              interactionRef={interactionRef}
              glitchColor={glitchColor}
              glitchRadius={glitchRadius}
              performanceMode={performanceMode}
            />
          </div>
        )}
        <div className="relative z-20"> {children} </div>
      </div>
    );
  }
);
GlitchVault.displayName = "GlitchVault";
export default GlitchVault;
