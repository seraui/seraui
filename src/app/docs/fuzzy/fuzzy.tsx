"use client";
import React, { useRef, useEffect, useMemo } from "react";

interface HoverGlitchProps {
  text: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  baseIntensity?: number;
  hoverIntensity?: number;
  letterSpacing?: string;
  wordSpacing?: string;
}

const HoverGlitch: React.FC<HoverGlitchProps> = ({
  text,
  fontFamily = "'Major Mono Display', monospace",
  fontSize = "10rem",
  fontWeight = 400,
  color = "#33ffcc",
  baseIntensity = 1,
  hoverIntensity = 15,
  letterSpacing = "0px",
  wordSpacing = "0px",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const currentIntensity = useRef(baseIntensity);

  const font = useMemo(
    () => `${fontWeight} ${fontSize} ${fontFamily}`,
    [fontWeight, fontSize, fontFamily]
  );

  useEffect(() => {
    currentIntensity.current = baseIntensity;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isCancelled = false;

    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!offscreenCtx) return;

    const setupAndAnimate = async () => {
      await document.fonts.ready;
      if (isCancelled) return;

      offscreenCtx.font = font;
      const metrics = offscreenCtx.measureText(text);
      const textWidth = Math.ceil(metrics.width);
      const textHeight = Math.ceil(
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      );

      const horizontalPadding = hoverIntensity * 2;
      const verticalPadding = 20;
      const canvasWidth = textWidth + horizontalPadding;
      const canvasHeight = textHeight + verticalPadding;

      canvas.width = offscreenCanvas.width = canvasWidth;
      canvas.height = offscreenCanvas.height = canvasHeight;

      offscreenCtx.font = font;
      offscreenCtx.fillStyle = color;
      offscreenCtx.textBaseline = "top";
      offscreenCtx.fillText(text, horizontalPadding / 2, verticalPadding / 2);

      const sourceImageData = offscreenCtx.getImageData(
        0,
        0,
        canvasWidth,
        canvasHeight
      );
      const sourcePixels = sourceImageData.data;

      const renderLoop = () => {
        if (isCancelled || !ctx) return;

        const destinationImageData = ctx.createImageData(
          canvasWidth,
          canvasHeight
        );
        const destinationPixels = destinationImageData.data;

        for (let y = 0; y < canvasHeight; y++) {
          const rowOffset = (Math.random() - 0.5) * currentIntensity.current;
          for (let x = 0; x < canvasWidth; x++) {
            const sourceX = Math.round(x + rowOffset);
            if (sourceX >= 0 && sourceX < canvasWidth) {
              const destIndex = (y * canvasWidth + x) * 4;
              const sourceIndex = (y * canvasWidth + sourceX) * 4;

              destinationPixels[destIndex] = sourcePixels[sourceIndex];
              destinationPixels[destIndex + 1] = sourcePixels[sourceIndex + 1];
              destinationPixels[destIndex + 2] = sourcePixels[sourceIndex + 2];
              destinationPixels[destIndex + 3] = sourcePixels[sourceIndex + 3];
            }
          }
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(destinationImageData, 0, 0);
        animationFrameId.current = requestAnimationFrame(renderLoop);
      };

      renderLoop();
    };

    const handleMouseEnter = () => {
      currentIntensity.current = hoverIntensity;
    };
    const handleMouseLeave = () => {
      currentIntensity.current = baseIntensity;
    };

    const handleTouchStart = () => {
      currentIntensity.current = hoverIntensity;
    };
    const handleTouchEnd = () => {
      currentIntensity.current = baseIntensity;
    };

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    setupAndAnimate();

    return () => {
      isCancelled = true;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    text,
    font,
    color,
    baseIntensity,
    hoverIntensity,
    letterSpacing,
    wordSpacing,
  ]);

  return <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />;
};

export default function FuzzyText() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 text-center font-mono select-none">
      <HoverGlitch
        text="HOVER"
        fontFamily="'Major Mono Display', monospace"
        fontSize="clamp(5rem, 20vw, 17rem)"
        fontWeight={700}
        color="#D7D00F"
        baseIntensity={6}
        hoverIntensity={20}
        letterSpacing="-0.05em"
        wordSpacing="-0.1em"
      />
    </div>
  );
}
