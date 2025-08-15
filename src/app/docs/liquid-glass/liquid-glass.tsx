"use client";
import React, { useEffect, useRef, useState, useId, useMemo } from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// utility
const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

// Helper hook to detect dark mode
const useDarkMode = (): boolean => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
};

// ---- Glass variants (presets) ----
// Variants tweak the "feel" of the glass by changing effect props.
// You can add more (outline, tinted, success, warning, etc.) later.
const GLASS_PRESETS = {
  subtle: {
    backgroundOpacity: 0.06,
    saturation: 1.1,
    brightness: 55,
    blur: 8,
    displace: 0.3,
    distortionScale: -80,
    redOffset: -2,
    greenOffset: 6,
    blueOffset: 12,
    mixBlendMode: "difference",
  },
  default: {
    backgroundOpacity: 0.1,
    saturation: 1.4,
    brightness: 55,
    blur: 10,
    displace: 0.5,
    distortionScale: -160,
    redOffset: 0,
    greenOffset: 8,
    blueOffset: 16,
    mixBlendMode: "difference",
  },
  bold: {
    backgroundOpacity: 0.18,
    saturation: 1.8,
    brightness: 60,
    blur: 12,
    displace: 0.8,
    distortionScale: -240,
    redOffset: 6,
    greenOffset: 12,
    blueOffset: 24,
    mixBlendMode: "screen",
  },
  ghost: {
    backgroundOpacity: 0,
    saturation: 1,
    brightness: 55,
    blur: 6,
    displace: 0,
    distortionScale: 0,
    redOffset: 0,
    greenOffset: 0,
    blueOffset: 0,
    mixBlendMode: "difference",
  },
};

type GlassVariant = keyof typeof GLASS_PRESETS;

// Default props if nothing is provided
const GLASS_DEFAULTS = {
  width: "auto",
  height: "auto",
  borderRadius: 20,
  borderWidth: 0.07,
  opacity: 0.93,
  xChannel: "R",
  yChannel: "G",
};

interface GlassProps {
  variant?: GlassVariant;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";
  mixBlendMode?: string;
}

const Glass: React.FC<GlassProps> = (rawProps) => {
  const {
    // new
    variant = "default",
    // core
    children,
    className = "",
    style = {},
    // allow per-instance overrides (everything’s optional)
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    backgroundOpacity,
    saturation,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  } = rawProps;

  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const isDarkMode = useDarkMode();

  // Merge: defaults -> preset (by variant) -> overrides (props win)
  const v = useMemo(() => {
    const p = GLASS_PRESETS[variant] ?? GLASS_PRESETS.default;
    return {
      ...GLASS_DEFAULTS,
      ...p,
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(borderRadius !== undefined && { borderRadius }),
      ...(borderWidth !== undefined && { borderWidth }),
      ...(brightness !== undefined && { brightness }),
      ...(opacity !== undefined && { opacity }),
      ...(blur !== undefined && { blur }),
      ...(displace !== undefined && { displace }),
      ...(backgroundOpacity !== undefined && { backgroundOpacity }),
      ...(saturation !== undefined && { saturation }),
      ...(distortionScale !== undefined && { distortionScale }),
      ...(redOffset !== undefined && { redOffset }),
      ...(greenOffset !== undefined && { greenOffset }),
      ...(blueOffset !== undefined && { blueOffset }),
      ...(xChannel !== undefined && { xChannel }),
      ...(yChannel !== undefined && { yChannel }),
      ...(mixBlendMode !== undefined && { mixBlendMode }),
    };
  }, [
    variant,
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    backgroundOpacity,
    saturation,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  ]);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize =
      Math.min(actualWidth, actualHeight) * (v.borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${v.borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${v.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${v.mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${
      actualWidth - edgeSize * 2
    }" height="${
      actualHeight - edgeSize * 2
    }" rx="${v.borderRadius}" fill="hsl(0 0% ${v.brightness}% / ${
      v.opacity
    })" style="filter:blur(${v.blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    if (feImageRef.current) {
      feImageRef.current.setAttribute("href", generateDisplacementMap());
    }
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: v.redOffset },
      { ref: greenChannelRef, offset: v.greenOffset },
      { ref: blueChannelRef, offset: v.blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute(
          "scale",
          (v.distortionScale + offset).toString()
        );
        ref.current.setAttribute("xChannelSelector", v.xChannel);
        ref.current.setAttribute("yChannelSelector", v.yChannel);
      }
    });

    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute(
        "stdDeviation",
        v.displace.toString()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    v.width,
    v.height,
    v.borderRadius,
    v.borderWidth,
    v.brightness,
    v.opacity,
    v.blur,
    v.displace,
    v.distortionScale,
    v.redOffset,
    v.greenOffset,
    v.blueOffset,
    v.xChannel,
    v.yChannel,
    v.mixBlendMode,
    variant,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v.width, v.height]);

  const [svgFilterSupported, setSvgFilterSupported] = useState(true);
  const [backdropFilterSupported, setBackdropFilterSupported] =
    useState(true);

  useEffect(() => {
    const checkSupport = () => {
      const isWebkit =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);
      setSvgFilterSupported(!isWebkit && !isFirefox);
      setBackdropFilterSupported(CSS.supports("backdrop-filter", "blur(10px)"));
    };
    checkSupport();
  }, [filterId]);

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles = {
      ...style,
      width: typeof v.width === "number" ? `${v.width}px` : v.width,
      height: typeof v.height === "number" ? `${v.height}px` : v.height,
      borderRadius: `${v.borderRadius}px`,
      "--glass-frost": v.backgroundOpacity,
      "--glass-saturation": v.saturation,
    };

    if (svgFilterSupported) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `hsl(0 0% 0% / ${v.backgroundOpacity})`
          : `hsl(0 0% 100% / ${v.backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${v.saturation})`,
        boxShadow: isDarkMode
          ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
             0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`
          : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`,
      };
    } else {
      if (isDarkMode) {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
          };
        } else {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
            WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
          };
        }
      } else {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`,
          };
        } else {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
            WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`,
          };
        }
      }
    }
  };

  const glassClasses =
    "relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out";
  const focusVisibleClasses = isDarkMode
    ? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
    : "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2";

  return (
    <div
      ref={containerRef}
      className={cn(glassClasses, focusVisibleClasses, className)}
      style={getContainerStyles()}
    >
      <svg
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              ref={feImageRef}
              href={generateDisplacementMap() || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />

            <feDisplacementMap
              ref={redChannelRef}
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap
              ref={blueChannelRef}
              in="SourceGraphic"
              in2="map"
              id="bluechannel"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur
              ref={gaussianBlurRef}
              in="output"
              stdDeviation="0.7"
            />
          </filter>
        </defs>
      </svg>

      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

// --- Button sizes via cva (shadcn style) ---
const glassButtonSizes = cva("rounded-[inherit]", {
  variants: {
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
      icon: "p-2 size-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// --- GlassButton.jsx ---
// Supports: variant="subtle|default|bold|ghost", size="sm|md|lg|icon"
type GlassButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: GlassVariant;
  size?: "sm" | "md" | "lg" | "icon";
  textClassName?: string;
  disabled?: boolean;
} & Omit<GlassProps, "children" | "variant" | "className" | "style">;

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md",
  textClassName = "text-white font-semibold",
  disabled,
  ...surfaceOverrides // width/height/etc if you still want to override per instance
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // base button behaviors
        "relative inline-flex items-center justify-center cursor-pointer select-none",
        "transform active:scale-95 transition-transform duration-150 ease-in-out",
        "focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      <Glass
        variant={variant}
        className={cn(glassButtonSizes({ size }))}
        {...surfaceOverrides}
      >
        <span className={cn(textClassName)}>{children}</span>
      </Glass>
    </button>
  );
};

export default GlassButton;

