"use client";

import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";


// --- SVG Icon Components ---
// No changes were made to the icon components. They are included for completeness.
const HomeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const EditIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35.0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35.0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);



// --- DockIcon Component ---
// Renders a single icon that magnifies on mouse proximity.
interface DockIconProps {
  mouseX?: MotionValue<number>; // mouseX is optional as it's injected by the parent Dock.
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, href, children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity); // Fallback for when mouseX is not available.

  // Constants for the animation
  const iconSize = 36;
  const iconMagnification = 60;
  const iconDistance = 140;

  const distance = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize]
  );

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square items-center justify-center rounded-full"
    >
      <a
        href={href}
        className="flex h-full w-full items-center justify-center"
        onClick={handleClick}
      >
        {children}
      </a>
    </motion.div>
  );
};


// --- Dock Component ---
// The main container that tracks the mouse and holds the icons.
interface DockProps {
  children: React.ReactNode;
}

const Dock: React.FC<DockProps> = ({ children }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex h-[58px] items-center gap-2 rounded-2xl bg-white/80 dark:bg-black/50 px-2 border border-black/10 dark:border-white/10 backdrop-blur-lg"
    >
      {React.Children.map(children, (child) => {
        // FIX: Check if the child is a valid React element and if its type is DockIcon.
        // This prevents passing the `mouseX` prop to other elements like the separator `div`,
        // which was causing the React warning.
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, {
            ...child.props as DockIconProps,
            mouseX: mouseX,
          });
        }
        return child;
      })}
    </motion.div>
  );
};


// --- Main App Component ---
const DockApp: React.FC = () => {
  const icons = [
    { name: 'Home', component: HomeIcon, href: '#' },
    { name: 'Edit', component: EditIcon, href: '#' },
    { name: 'GitHub', component: GithubIcon, href: '#' },
    { name: 'LinkedIn', component: LinkedinIcon, href: '#' },
    { name: 'X', component: XIcon, href: '#' },
    { name: 'Mail', component: MailIcon, href: '#' },
  ];

  return (
    <div className="flex flex-col items-center justify-end bg-zinc-50 dark:bg-black font-sans">
      <Dock>
        {icons.map((icon) => (
          <DockIcon key={icon.name} href={icon.href}>
            <icon.component className="h-full w-full p-2 text-zinc-700 dark:text-zinc-300" />
          </DockIcon>
        ))}

      </Dock>
    </div>
  );
};

export default DockApp;
