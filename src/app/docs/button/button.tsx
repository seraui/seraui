'use client'

import React, { useState, useEffect } from 'react';
// A typed utility for combining class names. In a real project, you'd use a library like `tailwind-merge`.
const cn = (...inputs: (string | undefined | null | false)[]): string => {
  return inputs.filter(Boolean).join(' ');
}

// SVG component for the loading spinner.
const Loader2: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

// Define the types for variants and sizes explicitly
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg';


// Define the TypeScript interface for the Button's props.
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

// Helper function to get the correct classes.
const getButtonClasses = ({ variant = 'default', size = 'default' }: Pick<ButtonProps, 'variant' | 'size'>) => {
    const baseClasses = "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform duration-75 focus:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden active:scale-[0.97]";

    const variantClasses = {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-50",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
        ghost: "hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
    };

    const sizeClasses = {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
    };

    return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
};



interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, loading, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    useEffect(() => {
        const styleId = 'ripple-animation-style';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            @keyframes ripple-effect {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .animate-ripple {
                animation: ripple-effect 0.7s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }, []);


    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - rippleSize / 2;
      const y = event.clientY - rect.top - rippleSize / 2;

      const newRipple: Ripple = { x, y, size: rippleSize, id: Date.now() };

      setRipples(currentRipples => [...currentRipples, newRipple]);
      
      setTimeout(() => {
          setRipples(currentRipples => currentRipples.slice(1));
      }, 700);

      onClick?.(event);
    };
    
    const rippleColor = (variant === 'default' || variant === 'destructive') 
      ? 'bg-white/30 dark:bg-slate-900/20' 
      : 'bg-slate-900/10 dark:bg-white/10';

    return (
      <button
        className={cn(getButtonClasses({ variant, size }), className)}
        onClick={createRipple}
        disabled={loading}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4" />}
            {children}
        </span>
        
        {!loading && (
          <div className="absolute inset-0 z-0">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className={cn("absolute rounded-full animate-ripple", rippleColor)}
                style={{ 
                    left: ripple.x, 
                    top: ripple.y, 
                    width: ripple.size, 
                    height: ripple.size 
                }}
              />
            ))}
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button