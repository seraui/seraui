'use client';
import { FC, CSSProperties } from "react";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
}

// CSS styles as a string
const glitchStyles = `
.glitch {
  color: #fff;
  font-size: clamp(2rem, 10vw, 8rem);
  white-space: nowrap;
  font-weight: 900;
  position: relative;
  margin: 0 auto;
  user-select: none;
  cursor: pointer;
}

.glitch::after,
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  color: #fff;
  background-color: #060010;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.glitch:not(.enable-on-hover)::after {
  left: 10px;
  text-shadow: var(--after-shadow, -10px 0 red);
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}
.glitch:not(.enable-on-hover)::before {
  left: -10px;
  text-shadow: var(--before-shadow, 10px 0 cyan);
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}

.glitch.enable-on-hover::after,
.glitch.enable-on-hover::before {
  content: '';
  opacity: 0;
  animation: none;
}

.glitch.enable-on-hover:hover::after {
  content: attr(data-text);
  opacity: 1;
  left: 10px;
  text-shadow: var(--after-shadow, -10px 0 red);
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}
.glitch.enable-on-hover:hover::before {
  content: attr(data-text);
  opacity: 1;
  left: -10px;
  text-shadow: var(--before-shadow, 10px 0 cyan);
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}

@keyframes animate-glitch {
  0%   { clip-path: inset(20% 0 50% 0); }
  5%   { clip-path: inset(10% 0 60% 0); }
  10%  { clip-path: inset(15% 0 55% 0); }
  15%  { clip-path: inset(25% 0 35% 0); }
  20%  { clip-path: inset(30% 0 40% 0); }
  25%  { clip-path: inset(40% 0 20% 0); }
  30%  { clip-path: inset(10% 0 60% 0); }
  35%  { clip-path: inset(15% 0 55% 0); }
  40%  { clip-path: inset(25% 0 35% 0); }
  45%  { clip-path: inset(30% 0 40% 0); }
  50%  { clip-path: inset(20% 0 50% 0); }
  55%  { clip-path: inset(10% 0 60% 0); }
  60%  { clip-path: inset(15% 0 55% 0); }
  65%  { clip-path: inset(25% 0 35% 0); }
  70%  { clip-path: inset(30% 0 40% 0); }
  75%  { clip-path: inset(40% 0 20% 0); }
  80%  { clip-path: inset(20% 0 50% 0); }
  85%  { clip-path: inset(10% 0 60% 0); }
  90%  { clip-path: inset(15% 0 55% 0); }
  95%  { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}
`;

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}) => {
  const inlineStyles: CustomCSSProperties = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
  };

  const hoverClass = enableOnHover ? "enable-on-hover" : "";

  return (
    <>
      {/* Inject CSS styles */}
      <style dangerouslySetInnerHTML={{ __html: glitchStyles }} />
      <div
        className={`glitch ${hoverClass} ${className}`}
        style={inlineStyles}
        data-text={children}
      >
        {children}
      </div>
    </>
  );
};

const GlitchView = () => {
  return (
    <div className="font-sans p-4 space-y-8 overflow-hidden">
      <GlitchText speed={3.4}>
        GLITCH EFFECT
      </GlitchText>
      
      <GlitchText 
        speed={0.3}
        enableOnHover={true}
        className="text-2xl"
      >
        HOVER ME
      </GlitchText>
      
      <GlitchText 
        speed={0.8}
        enableShadows={false}
        className="text-xl"
      >
        NO SHADOWS
      </GlitchText>
    </div>
  );
};

export default GlitchView;
