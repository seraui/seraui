"use client";
import { cn } from "@/lib/utils";
import { RotateCw, Expand, Monitor, Tablet, Smartphone } from "lucide-react";
import { cloneElement, useState, useRef, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const changeKey = () => {
    setKey(Date.now());
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
        return "w-full max-w-4xl mx-auto";
      case "tablet":
        return "w-full max-w-2xl mx-auto";
      case "mobile":
        return "w-full max-w-sm mx-auto";
      default:
        return "w-full max-w-4xl mx-auto";
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
      )}
      <div
        ref={previewRef}
        className={cn("flex items-center justify-center w-full", isFullscreen && getViewportClasses(viewportSize))}
      >
        {reTrigger ? cloneElement(component, { key }) : component}
      </div>
    </div>
  );
}
