"use client";

import { useState, useEffect, useRef, ReactElement } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { createHighlighter, type Highlighter } from "shiki";
import { ReactIcon } from "@/assets/icons/react";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { JSXIcon } from "@/assets/icons/jsx";
import { JavaScriptIcon } from "@/assets/icons/javascript";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

// Function to get the appropriate icon for each language
const getLanguageIcon = (language: string) => {
  const iconProps = { className: "w-4 h-4 mr-2" };

  switch (language.toLowerCase()) {
    case 'tsx':
      return <ReactIcon {...iconProps} />;
    case 'jsx':
      return <JSXIcon {...iconProps} />;
    case 'typescript':
    case 'ts':
      return <TypeScriptIcon {...iconProps} />;
    case 'javascript':
    case 'js':
      return <JavaScriptIcon {...iconProps} />;
    default:
      return null;
  }
};

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const initHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: [
          "javascript",
          "typescript",
          "jsx",
          "tsx",
          "css",
          "html",
          "json",
          "bash",
          "shell",
          "python",
          "rust",
          "go",
          "java",
          "c",
          "cpp",
          "php",
          "ruby",
          "swift",
          "kotlin",
          "dart",
          "sql",
          "yaml",
          "toml",
          "xml",
          "markdown",
        ],
      });
      setHighlighter(highlighter);
    };

    initHighlighter();
  }, []);

  useEffect(() => {
    if (!highlighter || !preRef.current) return;

    const codeElement = preRef.current.querySelector("code");
    if (!codeElement) return;

    const code = codeElement.textContent || "";
    const language = codeElement.className?.match(/language-(\w+)/)?.[1] || "text";

    try {
      const html = highlighter.codeToHtml(code, {
        lang: language,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });

      // Extract just the code content from the generated HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const preElement = doc.querySelector("pre");

      if (preElement) {
        codeElement.innerHTML = preElement.innerHTML;
        codeElement.className = `language-${language}`;
      }
    } catch (error) {
      console.warn(`Failed to highlight code for language: ${language}`, error);
    }
  }, [highlighter, children]);

  const copyToClipboard = async () => {
    const codeElement = preRef.current?.querySelector("code");
    const text = codeElement?.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getLanguageFromChildren = () => {
    if (
      typeof children === "object" &&
      children !== null &&
      "props" in children &&
      "type" in children
    ) {
      const codeElement = children as ReactElement<any, any>;
      const codeProps = codeElement.props as React.HTMLAttributes<HTMLElement>;
      if (codeProps?.className) {
        const match = codeProps.className.match(/language-(\w+)/);
        return match ? match[1] : null;
      }
    }
    return null;
  };

  const language = getLanguageFromChildren();

  return (
    <div className="relative group my-6">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
          <div className="flex items-center">
            {getLanguageIcon(language)}
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
              {language}
            </span>
          </div>
        </div>
      )}
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto border border-border bg-muted p-4 font-mono text-sm",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border",
          "[&_code]:bg-transparent [&_code]:p-0",
          language ? "rounded-t-none rounded-b-lg" : "rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-2 p-2 rounded-md transition-all duration-200",
          "bg-background/80 backdrop-blur-sm border border-border",
          "opacity-0 group-hover:opacity-100",
          "hover:bg-muted hover:scale-105",
          "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary",
          language ? "top-12" : "top-2"
        )}
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}
