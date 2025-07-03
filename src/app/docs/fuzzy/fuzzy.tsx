'use client';
import React, { useEffect, useRef, useState, useCallback } from "react";


const getNumericFontSize = (fontSize: string | number): number => {
  if (typeof fontSize === "number") {
    return fontSize;
  }

  const temp = document.createElement("span");
  temp.style.fontSize = fontSize;
  temp.style.position = 'absolute'; // Prevent layout shift
  temp.style.visibility = 'hidden'; // Keep it off-screen
  document.body.appendChild(temp);
  const computedSize = window.getComputedStyle(temp).fontSize;
  document.body.removeChild(temp);
  return parseFloat(computedSize);
};



interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: string | number;
  fontWeight?: number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

// --- FuzzyText Component ---
const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = "clamp(2rem, 10vw, 10rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null); 
  const [isHovering, setIsHovering] = useState(false);
  const text = React.Children.toArray(children).join("");

  // Memoize the animation logic to prevent re-creation on every render
  const runAnimation = useCallback((
    ctx: CanvasRenderingContext2D,
    offscreenCanvas: HTMLCanvasElement,
    tightHeight: number,
    offscreenWidth: number
  ) => {
    let animationFrameId: number;

    const animate = () => {
      if (!ctx || !offscreenCanvas) return;

      const fuzzRange = 30; // How far the pixels can be displaced

      // Clear the previous frame with a buffer for the fuzz effect
      ctx.clearRect(
        -fuzzRange,
        -fuzzRange,
        offscreenWidth + 2 * fuzzRange,
        tightHeight + 2 * fuzzRange
      );

      // Determine the intensity of the fuzz effect based on hover state
      const intensity = isHovering ? hoverIntensity : baseIntensity;

      // Loop through each horizontal slice of the pre-rendered text
      for (let j = 0; j < tightHeight; j++) {
        // Calculate a random horizontal displacement for the slice
        const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
        
        // Draw the 1px-high slice from the offscreen canvas to the visible canvas
        // at the displaced position. This creates the "fuzzy" or "glitch" effect.
        ctx.drawImage(
          offscreenCanvas,
          0, j, // Source x, y
          offscreenWidth, 1, // Source width, height
          dx, j, // Destination x, y
          offscreenWidth, 1 // Destination width, height
        );
      }

      // Request the next frame to continue the animation loop
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    // Return a cleanup function to cancel the animation frame
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isHovering, baseIntensity, hoverIntensity]);


  // Effect for setting up and drawing on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isCancelled = false;
    let cleanupAnimation = () => {};

    const init = async () => {
      // Ensure custom fonts are loaded before we measure the text
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // --- Font & Text Measurement ---
      const resolvedFontFamily = fontFamily === "inherit"
        ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
        : fontFamily;
      const fontSizeStr = typeof fontSize === "number" ? `${fontSize}px` : fontSize;
      const numericFontSize = getNumericFontSize(fontSize);
      
      // Create an offscreen canvas for pre-rendering the text
      const offscreen = offscreenCanvasRef.current || document.createElement("canvas");
      offscreenCanvasRef.current = offscreen;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // Configure the offscreen context for text measurement
      offCtx.font = `${fontWeight} ${fontSizeStr} ${resolvedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);

      // Calculate tight bounding box for the text to avoid extra whitespace
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      // --- Pre-render Text to Offscreen Canvas ---
      const extraWidthBuffer = 10; // Small buffer for rendering artifacts
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;
      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      // Re-apply font settings as resizing the canvas can reset them
      offCtx.font = `${fontWeight} ${fontSizeStr} ${resolvedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, extraWidthBuffer / 2 - actualLeft, actualAscent);

      // --- Setup Main Canvas ---
      const horizontalMargin = 50; // Margin for the fuzz effect to not get clipped
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin); // Center the drawing area

      // Start the animation loop
      cleanupAnimation = runAnimation(ctx, offscreen, tightHeight, offscreenWidth);
    };

    init();

    return () => {
      isCancelled = true;
      cleanupAnimation();
    };
  }, [
    text,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    runAnimation,
  ]);

  // Effect for handling mouse and touch interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enableHover) return;

    const rect = canvas.getBoundingClientRect();

    const handleMove = (clientX: number, clientY: number) => {
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      // A simple check if the cursor is within the canvas bounds
      setIsHovering(x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleLeave = () => setIsHovering(false);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [enableHover]);

  return <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />;
};


// --- Main App Component to showcase FuzzyText ---
export default function Fuzzy() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 font-sans">
      <FuzzyText
        fontSize="clamp(3rem, 12vw, 12rem)"
        fontWeight={900}
        baseIntensity={0.15}
        hoverIntensity={0.6}
        color="#00ff99"
      >
        HOVER ME
      </FuzzyText>
    </div>
  );
}
