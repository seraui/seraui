"use client";

import React, { useState } from "react";

// Utility function to merge Tailwind CSS classes conditionally.
// This is a simplified version of the 'clsx' or 'tailwind-merge' library.
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// --- Icon Components (replaces lucide-react) ---

// Check icon component using inline SVG
const Check = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// Copy icon component using inline SVG
const Copy = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

// --- UI Components (replaces custom component library) ---

// A simple, reusable Button component.
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-10 px-4 py-2", // Default size
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

// --- The Main Button Component from your request ---

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  textToCopy?: string;
  successDuration?: number;
}

function CopyButton({
  className,
  textToCopy = "https://gemini.google.com/",
  successDuration = 2000,
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      // Use modern Clipboard API if available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), successDuration);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        if (successful) {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), successDuration);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }

  return (
    <Button
      className={cn(
        "min-w-40 relative group transition-all duration-300 ease-in-out",
        "bg-emerald-50 dark:bg-emerald-950",
        "hover:bg-emerald-100 dark:hover:bg-emerald-900",
        "text-emerald-600 dark:text-emerald-300",
        "border border-emerald-200 dark:border-emerald-800",
        // When isCopied is true, apply the animation class
        isCopied && "bg-emerald-100 dark:bg-emerald-900 animate-jiggle",
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      <div
        className={cn(
          "w-full flex items-center justify-center gap-2",
          "transition-transform duration-300",
          isCopied && "scale-105"
        )}
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4 text-emerald-500 transition-all duration-300" />
            <span className="font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                "group-hover:scale-110 group-hover:rotate-6"
              )}
            />
            <span>Copy code</span>
          </>
        )}
      </div>
    </Button>
  );
}

// --- Main App Component to display the button ---

export default function CopyButtonView() {
  return (
    <div className="flex flex-col items-center justify-center p-4 font-sans">
      {/* Injecting keyframe animation directly with a style tag */}
      <style>
        {`
          @keyframes jiggle {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px) rotate(-1deg); }
            75% { transform: translateX(2px) rotate(1deg); }
          }
          .animate-jiggle {
            animation: jiggle 0.4s ease-in-out;
          }
        `}
      </style>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
           Copy Button
        </h1>
        <p className="text-gray-400">
          Click the button below to copy the text to your clipboard.
        </p>
      </div>
      <CopyButton />
    </div>
  );
}
