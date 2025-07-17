import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// A simple, typed utility for conditional class names.
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// --- Button Variants Definition ---
const buttonVariants = cva(
  // Base styles for all buttons. 
  "font-sans transition-all outline-none cursor-pointer duration-200 font-medium flex items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        // Default button with a hard shadow effect
        default:
          "bg-[#5044ef] text-white border-2 border-black shadow-[4px_4px_0px_0px_#f58a00] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#f58a00]",
        // A dark gray secondary button
        secondary:
          "bg-gray-700 text-white border-2 border-black shadow-[4px_4px_0px_0px_#f58a00] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#f58a00]",
        // An outline button that fills with the custom color on hover
        outline:
          "bg-transparent text-[#5044ef] border-2 border-[#5044ef] shadow-[4px_4px_0px_0px_#f58a00] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-[#5044ef] hover:text-white disabled:hover:bg-transparent disabled:hover:text-[#5044ef] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#f58a00]",
        // A simple link-style button
        link: "bg-transparent text-[#5044ef] hover:underline",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "h-12 w-12", // Made icon button a bit larger for better visuals
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// --- Button Component Props Interface ---
// This interface provides full type support for all standard button attributes,
// the custom variants, and the loading state.
export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
      loading?: boolean;
    }

// --- Loading Spinner Component ---
const Spinner: React.FC = () => (
  <svg className="animate-spin h-6 w-6 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Button Component Implementation ---
const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, size, children, loading = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;