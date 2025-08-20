"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type KbdSize = "sm" | "md" | "lg";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, size = "md", children, ...props },
  ref
) {
  const sizeClasses: Record<KbdSize, string> = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-2.5 py-1.5",
  };

  return (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        "inline-flex items-center rounded border border-slate-200 bg-slate-50 text-slate-800 shadow-sm",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
        "font-mono select-none leading-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";

export default Kbd;

