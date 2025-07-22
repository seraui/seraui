"use client";

import React, {
  useState,
  forwardRef,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

// Utility function to merge Tailwind CSS classes conditionally.
const cn = (
  ...classes: (string | boolean | undefined | null | Record<string, boolean>)[]
): string => {
  return classes
    .map((cls) => {
      if (typeof cls === "string") return cls;
      if (typeof cls === "object" && cls !== null) {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
};

// --- Icon Components (replaces lucide-react) ---

// Correctly define the type for IconProps
type IconProps = {
  className?: string;
};

const Check = ({ className }: IconProps) => (
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

const X = ({ className }: IconProps) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Download = ({ className }: IconProps) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// --- UI Components ---

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border",
          "h-10 px-4 py-2",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// --- The Main Reusable Processing Button Component ---

type State = "idle" | "processing" | "success" | "error";

interface ProcessingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onProcess: () => Promise<boolean>;
  children: ReactNode;
}

const ProcessingButton: React.FC<ProcessingButtonProps> = ({
  className,
  onProcess,
  children,
  ...props
}) => {
  const [state, setState] = useState<State>("idle");
  const [isScaling, setIsScaling] = useState(false);

  async function handleClick() {
    if (state !== "idle") return;

    setState("processing");

    try {
      const success = await onProcess();
      setState(success ? "success" : "error");
    } catch (error) {
      console.error("An error occurred during the process:", error);
      setState("error");
    }

    setIsScaling(true);

    // Reset the button to its idle state after a delay
    setTimeout(() => {
      setState("idle");
      setIsScaling(false);
    }, 2000);
  }

  const isProcessing = state === "processing";

  return (
    <Button
      className={cn(
        "min-w-40 relative group overflow-hidden",
        "transition-all duration-300",
        {
          "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700":
            state === "idle" || state === "processing",
          "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-200 border-green-200 dark:border-green-700":
            state === "success",
          "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 border-red-200 dark:border-red-700":
            state === "error",
        },
        isProcessing && "cursor-wait",
        className
      )}
      onClick={handleClick}
      disabled={isProcessing}
      {...props}
    >
      <div
        className={cn(
          "relative w-full flex items-center justify-center gap-2",
          isScaling && "animate-scale-in-out"
        )}
      >
        {state === "idle" && (
          <>
            <Download className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>{children}</span>
          </>
        )}
        {state === "processing" && (
          <>
            <Download className="w-4 h-4 animate-bounce" />
            <span>Processing...</span>
          </>
        )}
        {state === "success" && (
          <>
            <Check className="w-4 h-4" />
            <span className="font-semibold">Complete!</span>
          </>
        )}
        {state === "error" && (
          <>
            <X className="w-4 h-4" />
            <span className="font-semibold">Failed</span>
          </>
        )}
      </div>
    </Button>
  );
};

// --- Main App Component to display the button ---

export default function CopyButtonView2() {
  // EXAMPLE: Define the asynchronous task you want the button to perform.
  const handleDownload = async (): Promise<boolean> => {
    console.log("Starting download process...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      console.log("Download successful!");
      return true;
    } else {
      console.log("Download failed.");
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 font-sans">
      <style>
        {`
          @keyframes scale-in-out {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-scale-in-out {
            animation: scale-in-out 300ms ease-in-out;
          }
        `}
      </style>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Professional Processing Button
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This button is now reusable, type-safe, and ready for any project.
        </p>
      </div>

      <ProcessingButton onProcess={handleDownload}>
        Download File
      </ProcessingButton>
    </div>
  );
}
