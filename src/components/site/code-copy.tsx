"use client";
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { JSXIcon } from "@/assets/icons/jsx";

const CodeCopy = ({
  code,
  className,
}: {
  code: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const convertToJsx = () => {
    // Encode the code to safely pass it as a URL parameter
    const encodedCode = encodeURIComponent(code);
    // Navigate to the TSX to JSX compiler with the code as a parameter
    router.push(`/tools?tool=tsx-to-jsx-compiler&code=${encodedCode}`);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Convert to JSX button */}
      <button
        onClick={convertToJsx}
        className={cn(
          "relative cursor-pointer z-20 p-2 text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
        title="Convert TSX to JSX"
      >
        <JSXIcon className="h-4 w-4" />
      </button>

      {/* Copy button */}
      <button
        onClick={copyCode}
        className={cn(
          "relative cursor-pointer z-20 p-2 text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
        title="Copy code"
      >
        <div
          className={`absolute inset-0 transform transition-all duration-300 ${
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Clipboard className="h-4 w-4" />
        </div>
        <div
          className={`absolute inset-0 transform transition-all duration-300 ${
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <Check className="h-4 w-4 text-green-500" />
        </div>
      </button>
    </div>
  );
};

export default CodeCopy;
