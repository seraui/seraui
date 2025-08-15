"use client"
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  FC,
  PointerEvent,
  useCallback,
  CSSProperties,
} from "react";

interface CanvasCurvedLoopProps {
  text?: string;
  speed?: number;
  className?: string;
  curveHeight?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: CSSProperties["fontWeight"];
  height?: number;
  gap?: number;
  easing?: number;
  onDirectionChange?: (direction: "left" | "right") => void;
}

const CanvasCurvedLoop: FC<CanvasCurvedLoopProps> = ({
  text = "",
  speed = 1,
  className = "",
  curveHeight = 50,
  direction = "left",
  interactive = true,
  fontSize = 48,
  fontFamily = "system-ui, -apple-system, sans-serif",
  fontWeight = "bold",
  height = 200,
  gap = 0.5,
  easing = 0.05,
  onDirectionChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const directionRef = useRef(direction);
  const lastTimeRef = useRef(0);
  
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [textWidth, setTextWidth] = useState(0);

  const processedText = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return "";
    return trimmed + " ".repeat(Math.ceil(fontSize * gap / 10));
  }, [text, fontSize, gap]);

  useEffect(() => {
    const updateDimensions = () => {
      if (!canvasRef.current?.parentElement) return;
      
      const rect = canvasRef.current.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      setDimensions({
        width: rect.width * dpr,
        height: height * dpr,
      });
    };

    updateDimensions();
    
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (canvasRef.current?.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }
    
    return () => resizeObserver.disconnect();
  }, [height]);

  useEffect(() => {
    const measureText = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !processedText) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      try {
        await document.fonts.ready;
      } catch (e: unknown) {
          if (e instanceof Error) {
        console.error(e.message);
        }
      }

      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(processedText);
      
      setTextWidth(metrics.width);
      setIsReady(true);
    };

    measureText();
  }, [processedText, fontSize, fontFamily, fontWeight]);

  const drawCurvedText = useCallback((ctx: CanvasRenderingContext2D, offset: number) => {
    const { width, height: canvasHeight } = dimensions;
    if (!width || !canvasHeight || !textWidth || !processedText || !canvasRef.current) return;

    ctx.clearRect(0, 0, width, canvasHeight);

    ctx.save();
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = getComputedStyle(canvasRef.current).color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const repeatCount = Math.ceil(width / textWidth) + 2;

    let normalizedOffset = offset % textWidth;
    if (normalizedOffset > 0) normalizedOffset -= textWidth;

    for (let i = 0; i < repeatCount; i++) {
      const baseX = normalizedOffset + (i * textWidth);
      
      let charX = baseX;
      for (let j = 0; j < processedText.length; j++) {
        const char = processedText[j];
        const charMetrics = ctx.measureText(char);
        const charWidth = charMetrics.width;
        
        if (charX + charWidth < 0 || charX > width) {
          charX += charWidth;
          continue;
        }
        
        const normalizedX = charX / width;
        const t = normalizedX;
        const curveY = canvasHeight / 2 - curveHeight * Math.sin(t * Math.PI);
        
        const angleT = Math.max(0, Math.min(1, normalizedX));
        const derivative = -curveHeight * Math.PI * Math.cos(angleT * Math.PI) / width;
        const angle = Math.atan(derivative);

        ctx.save();
        ctx.translate(charX + charWidth / 2, curveY);
        ctx.rotate(angle);
        ctx.fillText(char, 0, 0);
        ctx.restore();

        charX += charWidth;
      }
    }

    ctx.restore();
  }, [dimensions, textWidth, processedText, fontSize, fontFamily, fontWeight, curveHeight]);

  useEffect(() => {
    if (!isReady || !canvasRef.current || !dimensions.width || !textWidth) return;

    const ctx = canvasRef.current.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.1) {
          targetOffsetRef.current += velocityRef.current;
          velocityRef.current *= 0.95; 
        } else {
          const speedMultiplier = deltaTime > 0 ? deltaTime / 16.67 : 1;
          const delta = directionRef.current === "right" ? speed : -speed;
          targetOffsetRef.current += delta * speedMultiplier;
        }
      }

      offsetRef.current += (targetOffsetRef.current - offsetRef.current) * easing;

      if (offsetRef.current > textWidth) {
        offsetRef.current -= textWidth;
        targetOffsetRef.current -= textWidth;
      } else if (offsetRef.current < -textWidth) {
        offsetRef.current += textWidth;
        targetOffsetRef.current += textWidth;
      }

      drawCurvedText(ctx, offsetRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, drawCurvedText, speed, textWidth, easing, dimensions.width]);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [interactive]);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || !isDraggingRef.current) return;
    
    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = dx * 0.5;
    targetOffsetRef.current += dx;
    offsetRef.current += dx;
  }, [interactive]);

  const handlePointerUp = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    
    isDraggingRef.current = false;
    
    if (Math.abs(velocityRef.current) > 1) {
      const newDirection = velocityRef.current > 0 ? "right" : "left";
      if (newDirection !== directionRef.current) {
        directionRef.current = newDirection;
        onDirectionChange?.(newDirection);
      }
    }
    
    (e.currentTarget as HTMLCanvasElement).releasePointerCapture(e.pointerId);
  }, [interactive, onDirectionChange]);

  const cursorStyle = interactive
    ? isDraggingRef.current ? "grabbing" : "grab"
    : "default";

  const canvasStyle: CSSProperties = {
    height: `${height}px`,
    cursor: cursorStyle,
    touchAction: "none",
    imageRendering: "crisp-edges",
  };

  return (
    <div className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full block"
        style={canvasStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50">Loading...</div>
        </div>
      )}
    </div>
  );
};

CanvasCurvedLoop.displayName = "CanvasCurvedLoop";
export default CanvasCurvedLoop;