"use client";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FormBoldLogo,
  GrayGridsLogo,
  LineIconsLogo,
  NextJsTemplatesLogo,
  PimjoLogo,
  SaasBoldLogo,
  StaticRunLogo,
  TailAdminLogo,
  TailgridsLogo,
  UideckLogo,
} from "./icons";

// Type definitions
interface IconWrapperProps {
  children: ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isActive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

interface IconPosition {
  transformX: number;
  transformY: number;
  svgX: number;
  svgY: number;
}

interface OuterIcon {
  id: number;
  component: ReactNode;
}

const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isActive = false,
}: IconWrapperProps) => (
  <div
    className={`
            backdrop-blur-xl rounded-2xl flex items-center justify-center border
            ${
              isHighlighted
                ? "dark:bg-gray-700/50 bg-gray-100/80 border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
                : `dark:bg-white/5 bg-white/60 dark:border-white/20 border-gray-300/60 ${!isActive && "animate-float"}`
            }
            ${isActive && "border-blue-400/60"}
            ${className}
        `}
    style={{
      transform: isActive ? "scale(1.1)" : "scale(1)",
      backgroundColor: isActive
        ? "rgba(129, 140, 248, 0.2)"
        : "rgba(255, 255, 255, 0.05)",
      transition:
        "transform 0.8s ease-in-out, background-color 0.8s ease-in-out, border-color 0.8s ease-in-out",
    }}
  >
    {children}
  </div>
);

const IconGrid = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const outerIcons = useMemo(
    (): OuterIcon[] => [
      { id: 1, component: <TailAdminLogo /> },
      { id: 2, component: <GrayGridsLogo /> },
      { id: 3, component: <TailgridsLogo /> },
      { id: 4, component: <UideckLogo /> },
      { id: 5, component: <NextJsTemplatesLogo /> },
      { id: 6, component: <StaticRunLogo /> },
      { id: 7, component: <LineIconsLogo /> },
      { id: 8, component: <SaasBoldLogo /> },
      { id: 9, component: <FormBoldLogo /> },
    ],
    [],
  );

  const radius = 160;
  const svgSize = 400;
  const svgCenter = svgSize / 2;
  const numIcons = outerIcons.length;

  const getIconPosition = useCallback(
    (index: number): IconPosition => {
      const angle = (-90 + index * (360 / numIcons)) * (Math.PI / 180);
      return {
        transformX: radius * Math.cos(angle),
        transformY: radius * Math.sin(angle),
        svgX: svgCenter + radius * Math.cos(angle),
        svgY: svgCenter + radius * Math.sin(angle),
      };
    },
    [numIcons, radius, svgCenter],
  );

  // Animation loop for particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, svgSize, svgSize);
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (p.life <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.life / 60})`;
          ctx.fill();
        }
      });
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  // Effect for sequential animation and particle emission
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prevId) => {
        const currentIndex = outerIcons.findIndex((icon) => icon.id === prevId);
        const nextIndex = (currentIndex + 1) % outerIcons.length;

        // Emit particles from the new active icon's position
        const pos = getIconPosition(nextIndex);
        const iconCenterX = svgCenter + pos.transformX;
        const iconCenterY = svgCenter + pos.transformY;

        for (let i = 0; i < 20; i++) {
          particlesRef.current.push({
            x: iconCenterX,
            y: iconCenterY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1,
            life: Math.random() * 60,
          });
        }

        return outerIcons[nextIndex].id;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [outerIcons, getIconPosition, svgCenter]);

  return (
    <div className="relative w-[400px] h-[400px] scale-75 md:scale-90 lg:scale-100">
      <canvas
        ref={canvasRef}
        width={svgSize}
        height={svgSize}
        className="absolute top-0 left-0 pointer-events-none z-10"
      ></canvas>

      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <defs>
          <filter id="glow_v6">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {outerIcons.map((icon1, i) => {
            const p1 = getIconPosition(i);
            return outerIcons.map((icon2, j) => {
              if (i >= j) return null;

              const p2 = getIconPosition(j);
              const isLineActive =
                activeId === icon1.id || activeId === icon2.id;

              return (
                <line
                  key={`line-${i}-${j}`}
                  x1={p1.svgX}
                  y1={p1.svgY}
                  x2={p2.svgX}
                  y2={p2.svgY}
                  strokeWidth="1.5"
                  style={{
                    stroke: isLineActive ? "#3B82F6" : "#6B7280",
                    opacity: isLineActive ? 0.8 : 0.15,
                    filter: isLineActive ? "url(#glow_v6)" : "none",
                    transition: "all 1.2s ease-in-out",
                  }}
                  className="dark:stroke-gray-600"
                />
              );
            });
          })}
        </g>
      </svg>

      <div className="absolute top-1/2 left-1/2">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20">
          <IconWrapper className="w-24 h-24 p-4" isHighlighted={true}>
            <PimjoLogo />
          </IconWrapper>
        </div>

        {outerIcons.map((icon, i) => {
          const { transformX, transformY } = getIconPosition(i);
          const isActive = activeId === icon.id;

          return (
            <div
              key={icon.id}
              className="absolute z-20"
              style={{
                top: 0,
                left: 0,
                transform: `translate(${transformX}px, ${transformY}px)`,
                transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 relative">
                <div
                  className="absolute inset-[-20px] bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-2xl"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.8s ease-in-out",
                  }}
                />
                <IconWrapper className="w-16 h-16" isActive={isActive}>
                  {icon.component}
                </IconWrapper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function NexusOrbSup() {
  return (
    <div className="w-full flex items-center justify-center font-sans p-4 sm:p-8 overflow-hidden">
      <style>
        {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes breathing-glow {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2)); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.1)); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2)); }
                }
                @keyframes breathing-glow-light {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.05)); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
                }
                .animate-breathing-glow {
                    animation: breathing-glow 4s ease-in-out infinite;
                }
                .dark .animate-breathing-glow {
                    animation: breathing-glow 4s ease-in-out infinite;
                }
                :not(.dark) .animate-breathing-glow {
                    animation: breathing-glow-light 4s ease-in-out infinite;
                }
            `}
      </style>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="relative z-10 container mx-auto flex items-center justify-center">
        <IconGrid />
      </div>
    </div>
  );
}
