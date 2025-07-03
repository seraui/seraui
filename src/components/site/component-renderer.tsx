"use client";
import { cn } from "@/lib/utils";
import { RotateCw, Expand, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cloneElement, useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

interface HTMLElementWithFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

interface DocumentWithFullscreen extends Document {
  webkitExitFullscreen?: () => Promise<void>;
}

type ComponentPreviewProps = {
  component: React.ReactElement;
  reTrigger?: boolean;
  className?: string;
};

type ViewportSize = "desktop" | "tablet" | "mobile";

export function ComponentRenderer({
  component,
  className,
  reTrigger = false,
}: ComponentPreviewProps) {
  const [key, setKey] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Use react-responsive for better media query detection
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });

  // Auto-detect viewport size based on actual screen size
  useEffect(() => {
    if (isDesktop) {
      setViewportSize("desktop");
    } else if (isTablet) {
      setViewportSize("tablet");
    } else if (isMobile) {
      setViewportSize("mobile");
    }
  }, [isDesktop, isTablet, isMobile]);

  const changeKey = () => {
    setKey(Date.now());
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        const element = containerRef.current as HTMLElementWithFullscreen;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      }
    } else {
      const doc = document as DocumentWithFullscreen;
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const getViewportClasses = (size: ViewportSize) => {
    switch (size) {
      case "desktop":
        return "w-full max-w-full mx-auto";
      case "tablet":
        return "w-full max-w-2xl mx-auto";
      case "mobile":
        return "w-full max-w-sm mx-auto";
      default:
        return "w-full max-w-4xl mx-auto";
    }
  };

  const getViewportStyles = (size: ViewportSize) => {
    switch (size) {
      case "desktop":
        return {
          width: "100%",
          maxWidth: "100%",
          minHeight: "auto"
        };
      case "tablet":
        return {
          width: "768px",
          maxWidth: "768px",
          height: "1024px",
          minHeight: "1024px"
        };
      case "mobile":
        return {
          width: "375px",
          maxWidth: "375px",
          height: "667px",
          minHeight: "667px"
        };
      default:
        return {
          width: "100%",
          maxWidth: "100%",
          minHeight: "auto"
        };
    }
  };

  const getViewportInfo = (size: ViewportSize) => {
    switch (size) {
      case "desktop":
        return { width: "Full Width", height: "Auto" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      case "mobile":
        return { width: "375px", height: "667px" };
      default:
        return { width: "Auto", height: "Auto" };
    }
  };

  useEffect(() => {
    function updateWidth() {
      if (previewRef.current) {
        setPreviewWidth(previewRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isFullscreen, viewportSize]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex min-h-[350px] w-full items-center justify-center rounded-lg p-4 relative not-prose grid-bg bg-zinc-50 dark:bg-zinc-950",
        isFullscreen && "min-h-screen",
        className
      )}
    >
      <button
        onClick={handleFullscreen}
        className="absolute top-3 right-4 z-20 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Toggle fullscreen"
        type="button"
      >
        <Expand size={20} className="text-zinc-700 dark:text-zinc-300" />
      </button>
      {reTrigger && (
        <div className="absolute top-3 right-12">
          <button
            onClick={changeKey}
            className="cursor-pointer p-1 flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100 text-zinc-700 dark:text-zinc-300"
          >
            <RotateCw size={16} />
          </button>
        </div>
      )}
      {isFullscreen && (
        <>
          <div className="absolute top-3 left-4 z-20 flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-lg p-2 shadow-lg border border-zinc-200 dark:border-zinc-700 min-w-[120px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewportSize("desktop")}
                className={cn(
                  "p-2 rounded transition-colors relative group",
                  viewportSize === "desktop"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 ring-2 ring-blue-400"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                )}
                aria-label="Desktop view"
                type="button"
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setViewportSize("tablet")}
                className={cn(
                  "p-2 rounded transition-colors relative group",
                  viewportSize === "tablet"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 ring-2 ring-blue-400"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                )}
                aria-label="Tablet view"
                type="button"
              >
                <Tablet size={16} />
              </button>
              <button
                onClick={() => setViewportSize("mobile")}
                className={cn(
                  "p-2 rounded transition-colors relative group",
                  viewportSize === "mobile"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 ring-2 ring-blue-400"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                )}
                aria-label="Mobile view"
                type="button"
              >
                <Smartphone size={16} />
              </button>
            </div>
            {previewWidth !== null && (
              <span className="ml-2 px-2 py-1 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                {previewWidth}px
              </span>
            )}
          </div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-lg p-2 shadow-lg border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className={cn(
                "p-2 rounded transition-colors",
                zoomLevel <= 50
                  ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              )}
              aria-label="Zoom out"
              type="button"
            >
              <ZoomOut size={16} />
            </button>
            <span className="px-3 py-1 rounded text-sm font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className={cn(
                "p-2 rounded transition-colors",
                zoomLevel >= 200
                  ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              )}
              aria-label="Zoom in"
              type="button"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-2 rounded transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              aria-label="Reset zoom"
              type="button"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          {/* Add responsive info display */}
          <div className="absolute bottom-3 left-4 z-20 bg-white dark:bg-zinc-900 rounded-lg p-2 shadow-lg border border-zinc-200 dark:border-zinc-700">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Device:</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {viewportSize === "desktop" ? "Desktop" : viewportSize === "tablet" ? "iPad" : "iPhone"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Viewport:</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {getViewportInfo(viewportSize).width} × {getViewportInfo(viewportSize).height}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Orientation:</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {isLandscape ? "Landscape" : "Portrait"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        ref={previewRef}
        className={cn(
          "flex items-center justify-center w-full",
          isFullscreen && getViewportClasses(viewportSize)
        )}
        style={{
          transform: isFullscreen ? `scale(${zoomLevel / 100})` : undefined,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-in-out'
        }}
      >
        <div
          className={cn(
            "relative transition-all duration-300 ease-in-out",
            viewportSize !== "desktop" && "border-2 border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg bg-white dark:bg-zinc-900"
          )}
          style={{
            ...getViewportStyles(viewportSize),
            overflow: viewportSize !== "desktop" ? "hidden" : "visible"
          }}
        >
          {/* Device frame indicator */}
          {viewportSize !== "desktop" && (
            <div className="absolute -top-8 left-0 right-0 text-center">
              <span className="inline-block px-3 py-1 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black text-xs font-medium rounded-t-lg">
                {viewportSize === "tablet" ? "iPad" : "iPhone"} - {getViewportInfo(viewportSize).width} × {getViewportInfo(viewportSize).height}
              </span>
            </div>
          )}
          
          {/* Content container with proper constraints */}
          <div 
            className={cn(
              "w-full h-full flex items-center justify-center",
              viewportSize !== "desktop" && "overflow-auto"
            )}
            style={{
              width: "100%",
              height: viewportSize !== "desktop" ? "100%" : "auto"
            }}
          >
            {reTrigger ? cloneElement(component, { key }) : component}
          </div>
        </div>
      </div>
    </div>
  );
}
