"use client";
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import React, { useState, useEffect } from "react";
import { transformTsxToJsx } from "@/lib/tsx-to-jsx-transformer";

type LanguageType = 'tsx' | 'jsx';

// Custom JSX Icon
const JSXIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
    <path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
  </svg>
);

// Custom TSX Icon
const TSXIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
  >
    <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect>
    <polygon fill="#fff" points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"></polygon>
    <path fill="#fff" d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"></path>
  </svg>
);

const CodeCopy = ({
  code,
  className,
  selectedLanguage = 'tsx',
  onLanguageChange,
}: {
  code: string;
  className?: string;
  selectedLanguage?: LanguageType;
  onLanguageChange?: (language: LanguageType) => void;
}) => {
  const [copied, setCopied] = useState(false);

  // Transform code based on selected language
  const [transformedCode, setTransformedCode] = useState<string>(code);

  // Transform code when language or code changes
  useEffect(() => {
    const transformCode = async () => {
      if (selectedLanguage === 'jsx') {
        const transformed = await transformTsxToJsx(code);
        setTransformedCode(transformed);
      } else {
        setTransformedCode(code);
      }
    };

    transformCode();
  }, [code, selectedLanguage]);

  const copyCode = () => {
    navigator.clipboard.writeText(transformedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Language selector */}
      <div className="flex items-center bg-muted/50 rounded-md p-1">
        <button
          onClick={() => onLanguageChange?.('tsx')}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded transition-all duration-200",
            selectedLanguage === 'tsx'
              ? "bg-white/10 text-foreground shadow-sm backdrop-blur-sm border border-white/20"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
          title="TypeScript React"
        >
          <TSXIcon className="h-4 w-4 inline mr-1" />
          TS
        </button>
        <button
          onClick={() => onLanguageChange?.('jsx')}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded transition-all duration-200",
            selectedLanguage === 'jsx'
              ? "bg-white/10 text-foreground shadow-sm backdrop-blur-sm border border-white/20"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
          title="JavaScript React"
        >
          <JSXIcon className="h-4 w-4 inline mr-1" />
          JS
        </button>
      </div>

      {/* Copy button */}
      <button
        onClick={copyCode}
        className={cn(
          "relative cursor-pointer z-20 p-2 text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
        title={`Copy ${selectedLanguage.toUpperCase()} code`}
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
