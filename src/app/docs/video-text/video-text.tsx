"use client";
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

const cn = (...inputs: (string | undefined | null | false)[]) =>
  inputs.filter(Boolean).join(" ");

export interface VideoTextProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: "start" | "middle" | "end";
  dominantBaseline?:
    | "auto"
    | "middle"
    | "hanging"
    | "alphabetic"
    | "ideographic"
    | "text-bottom"
    | "text-top";
  fontFamily?: string;
  as?: ElementType;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  onVideoLoad?: () => void;
  onVideoError?: (error: Event) => void;
  sources?: Array<{ src: string; type: string }>;
  poster?: string;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 18,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
  letterSpacing,
  textTransform = "none",
  onVideoLoad,
  onVideoError,
  sources = [],
  poster,
}: VideoTextProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isGif = src.toLowerCase().endsWith(".gif");

  const content = useMemo(() => {
    return React.Children.toArray(children)
      .map((child) =>
        typeof child === "string" || typeof child === "number" ? child : ""
      )
      .join("");
  }, [children]);

  const svgMask = useMemo(() => {
    const responsiveFontSize =
      typeof fontSize === "number" ? `${fontSize}vw` : fontSize;

    const escapedContent = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text
          x='50%'
          y='50%'
          font-size='${responsiveFontSize}'
          font-weight='${fontWeight}'
          text-anchor='${textAnchor}'
          dominant-baseline='${dominantBaseline}'
          font-family='${fontFamily}'
          ${letterSpacing ? `letter-spacing='${letterSpacing}'` : ""}
          ${textTransform !== "none" ? `text-transform='${textTransform}'` : ""}
        >
          ${escapedContent}
        </text>
      </svg>
    `;

    return `url("data:image/svg+xml,${encodeURIComponent(svgString.trim())}")`;
  }, [
    content,
    fontSize,
    fontWeight,
    textAnchor,
    dominantBaseline,
    fontFamily,
    letterSpacing,
    textTransform,
  ]);

  const handleLoad = () => {
    setIsLoaded(true);
    onVideoLoad?.();
  };

  const handleVideoError = (event: React.SyntheticEvent) => {
    console.error("Video failed:", event);
    onVideoError?.(event.nativeEvent);
  };

  useEffect(() => {
    if (!isGif && videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {});
    }
  }, [autoPlay, isGif]);

  return (
    <Component
      className={cn("relative w-full h-full overflow-hidden", className)}
    >
      {/* masked media */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          !isLoaded && "opacity-0"
        )}
        style={{
          maskImage: svgMask,
          WebkitMaskImage: svgMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {isGif ? (
          <img
            src={src}
            onLoad={handleLoad}
            className="w-full h-full object-cover"
            alt=""
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            preload={preload}
            playsInline
            poster={poster}
            onLoadedData={handleLoad}
            onError={handleVideoError}
          >
            <source src={src} type="video/mp4" />
            {sources.map((s, i) => (
              <source key={i} src={s.src} type={s.type} />
            ))}
          </video>
        )}
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50">
          Loading...
        </div>
      )}

      <span className="sr-only">{content}</span>
    </Component>
  );
}

// -----------------------------------------------------------------------------
// Enhanced Example App
// -----------------------------------------------------------------------------
export default function Videotext() {
  return (
    <main className="text-white flex items-center justify-center w-screen h-[400px] overflow-hidden">
      <div className="w-full h-1/2 max-w-4xl">
        <VideoText 
          src="https://ls29t3z55w.ufs.sh/f/JEKFIJDsOBct0vrmLYJRG8BKHmvZQkWJ9ElIVcNfzPg63Mbo"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={20}
          letterSpacing="0.05em"
          textTransform="uppercase"
          sources={[
            { src: "fallback.webm", type: "video/webm" },
            { src: "fallback.ogv", type: "video/ogg" }
          ]}
          onVideoLoad={() => console.log('Video loaded successfully')}
          onVideoError={(error) => console.error('Video error:', error)}
        >
          Sera UI
        </VideoText>
      </div>
    </main>
  );
}
