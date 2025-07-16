'use client'
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
} from "react";

// The main application component
const MarqueeText = () => {
  return (
    <div className="w-full font-sans overflow-hidden">
      <LinearLoop
        marqueeText="Hello there ! how's going ? welcome to seraui i hope you loike all the desigen componnet"
        speed={1}
        direction="left"
        interactive={true}
        className="fill-gray-900 dark:fill-white"
      />
    </div>
  );
};

// --- Component for the linear text loop ---

interface LinearLoopProps {
  /** The text to be displayed in the marquee */
  marqueeText?: string;
  /** The speed of the animation. Can be positive or negative. */
  speed?: number;
  /** Additional CSS classes for styling the text */
  className?: string;
  /** The direction of the marquee animation */
  direction?: "left" | "right";
  /** Whether the user can interact with the marquee by dragging */
  interactive?: boolean;
}

const LinearLoop: FC<LinearLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className,
  direction = "left",
  interactive = true,
}) => {
  // Memoize the text to ensure it has a trailing space for seamless looping
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  // Refs for SVG elements
  const measureRef = useRef<SVGTextElement | null>(null);
  const tspansRef = useRef<SVGTSpanElement[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);

  // State for measurements
  const [pathLength, setPathLength] = useState(0);
  const [spacing, setSpacing] = useState(0);

  // Unique ID for the SVG path
  const uid = useId();
  const pathId = `linear-path-${uid}`;

  // Define the SVG path as a straight horizontal line.
  // M is "moveto", L is "lineto". This creates a line from x=-100 to x=1540 at y=90.
  const pathD = "M-100,90 L1540,90";

  // Refs for interactive dragging logic
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0); // Velocity of the drag

  // Effect to measure the width of a single text instance
  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  // Effect to measure the total length of the SVG path
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []); // Empty dependency array as pathD is constant

  // Animation loop effect
  useEffect(() => {
    if (!spacing) return; // Wait until spacing is calculated

    let frame: number;
    const step = () => {
      tspansRef.current.forEach((t) => {
        if (!t) return;
        let x = parseFloat(t.getAttribute("x") || "0");

        // If not dragging, move the text based on speed and direction
        if (!dragRef.current) {
          const delta =
            dirRef.current === "right" ? Math.abs(speed) : -Math.abs(speed);
          x += delta;
        }

        // Logic to wrap the text around for an infinite loop
        // Each text instance should maintain its relative position
        const totalWidth = tspansRef.current.length * spacing;
        if (x < -spacing) {
          x = x + totalWidth;
        }
        if (x > totalWidth - spacing) {
          x = x - totalWidth;
        }

        t.setAttribute("x", x.toString());
      });
      frame = requestAnimationFrame(step);
    };

    // Start the animation
    step();

    // Cleanup function to cancel the animation frame on component unmount
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  // Calculate how many times the text needs to repeat to fill the path
  const repeats =
    pathLength && spacing ? Math.ceil(pathLength / spacing) + 2 : 0;
  const ready = pathLength > 0 && spacing > 0;

  // --- Pointer (Mouse/Touch) Event Handlers for Interaction ---

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx; // Store velocity for flicking effect

    // Move each tspan element based on the drag distance
    tspansRef.current.forEach((t) => {
      if (!t) return;
      let x = parseFloat(t.getAttribute("x") || "0");
      x += dx;

      // Maintain proper wrapping with consistent spacing
      const totalWidth = tspansRef.current.length * spacing;
      if (x < -spacing) {
        x = x + totalWidth;
      }
      if (x > totalWidth - spacing) {
        x = x - totalWidth;
      }

      t.setAttribute("x", x.toString());
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    // Set the animation direction based on the final drag velocity (flick)
    if (Math.abs(velRef.current) > 1) {
        dirRef.current = velRef.current > 0 ? "right" : "left";
    }
  };

  // Dynamically set the cursor style based on interaction state
  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block text-[6rem] font-bold tracking-[5px] uppercase leading-none"
        viewBox="0 0 1440 160" // Adjusted viewBox for better vertical alignment
      >
        {/* Hidden text element used only for measuring the width */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>
        <defs>
          {/* The invisible path the text will follow */}
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        {/* Render the visible text only when measurements are ready */}
        {ready && (
          <text xmlSpace="preserve" className={className ?? "fill-current"}>
            <textPath href={`#${pathId}`} xmlSpace="preserve">
              {/* Render the repeated text spans */}
              {Array.from({ length: repeats }).map((_, i) => (
                <tspan
                  key={i}
                  x={i * spacing}
                  ref={(el) => {
                    if (el) tspansRef.current[i] = el;
                  }}
                >
                  {text}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default MarqueeText;
