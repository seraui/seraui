"use client";

import { useState, useEffect, useRef, isValidElement } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { codeToHtml } from "shiki";
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
    case 'react':
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

// Normalize language names for better detection
const normalizeLanguage = (lang: string): string => {
  const normalized = lang.toLowerCase().trim();

  // Handle common aliases and ensure language is supported
  const aliases: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'sh': 'bash',
    'shell': 'bash',
    'zsh': 'bash',
    'fish': 'bash',
    'powershell': 'powershell',
    'ps1': 'powershell',
    'cmd': 'batch',
    'bat': 'batch',
    'yml': 'yaml',
    'md': 'markdown',
    'mdx': 'markdown',
    'rb': 'ruby',
    'rs': 'rust',
    'kt': 'kotlin',
    'cs': 'csharp',
    'cpp': 'cpp',
    'c++': 'cpp',
    'cxx': 'cpp',
    'cc': 'cpp',
    'hpp': 'cpp',
    'hxx': 'cpp',
    'h': 'c',
    'php': 'php',
    'go': 'go',
    'java': 'java',
    'scala': 'scala',
    'swift': 'swift',
    'dart': 'dart',
    'sql': 'sql',
    'mysql': 'sql',
    'postgresql': 'sql',
    'sqlite': 'sql',
    'toml': 'toml',
    'xml': 'xml',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'stylus': 'stylus',
    'json': 'json',
    'jsonc': 'jsonc',
    'json5': 'json5',
    'vue': 'vue',
    'svelte': 'svelte',
    'astro': 'astro',
    'dockerfile': 'dockerfile',
    'docker': 'dockerfile',
    'makefile': 'makefile',
    'make': 'makefile',
    'nginx': 'nginx',
    'apache': 'apache',
    'ini': 'ini',
    'cfg': 'ini',
    'conf': 'ini',
    'env': 'dotenv',
    'gitignore': 'gitignore',
    'ignore': 'gitignore',
    'diff': 'diff',
    'patch': 'diff',
    'log': 'log',
    'txt': 'text',
    'text': 'text',
    'plain': 'text',
  };

  return aliases[normalized] || normalized;
};

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [rawCode, setRawCode] = useState<string>("");
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");

  // Extract code and language from children
  useEffect(() => {
    let code = "";
    let language = "text";

    if (isValidElement(children) && children.props) {
      // Handle <code> element with className
      if (children.props.className) {
        const match = children.props.className.match(/language-(\w+)/);
        if (match) {
          language = normalizeLanguage(match[1]);
        }
      }

      // Extract text content
      if (typeof children.props.children === "string") {
        code = children.props.children;
      } else if (children.props.children) {
        // Handle nested text nodes
        const extractText = (node: any): string => {
          if (typeof node === "string") return node;
          if (Array.isArray(node)) return node.map(extractText).join("");
          if (node?.props?.children) return extractText(node.props.children);
          return "";
        };
        code = extractText(children.props.children);
      }
    } else if (typeof children === "string") {
      code = children;
    }

    setRawCode(code.trim());
    setDetectedLanguage(language);
  }, [children]);

  // Generate highlighted HTML
  useEffect(() => {
    if (!rawCode) {
      setIsLoading(false);
      return;
    }

    const highlightCode = async () => {
      try {
        setIsLoading(true);

        // Try with the detected language first
        let langToUse = detectedLanguage;

        const html = await codeToHtml(rawCode, {
          lang: langToUse,
          themes: {
            light: "github-light",
            dark: "github-dark-default",
          },
          defaultColor: false,
          transformers: [
            {
              name: 'remove-pre-bg',
              pre(node) {
                // Remove background from pre to let our CSS handle it
                delete node.properties.style;
              }
            }
          ]
        });

        setHighlightedHtml(html);
      } catch (error) {
        console.warn(`Failed to highlight code for language: ${detectedLanguage}`, error);

        // Try fallback to 'text' if the language is not supported
        try {
          const fallbackHtml = await codeToHtml(rawCode, {
            lang: 'text',
            themes: {
              light: "github-light",
              dark: "github-dark-default",
            },
            defaultColor: false,
            transformers: [
              {
                name: 'remove-pre-bg',
                pre(node) {
                  delete node.properties.style;
                }
              }
            ]
          });
          setHighlightedHtml(fallbackHtml);
          setDetectedLanguage('text'); // Update detected language to text
        } catch (fallbackError) {
          console.error('Failed to highlight even with text fallback:', fallbackError);
          // Final fallback to plain HTML
          setHighlightedHtml(`<pre class="shiki"><code>${rawCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [rawCode, detectedLanguage]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="relative group my-6">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-muted animate-pulse rounded"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
              Loading...
            </span>
          </div>
        </div>
        <div className="border border-border bg-muted p-4 rounded-t-none rounded-b-lg">
          <div className="h-20 bg-muted-foreground/20 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group my-6">
      {detectedLanguage && detectedLanguage !== "text" && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
          <div className="flex items-center">
            {getLanguageIcon(detectedLanguage)}
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
              {detectedLanguage}
            </span>
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative overflow-hidden border border-border",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border",
          // Remove background colors to let Shiki handle them
          "[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-4",
          "[&_code]:!bg-transparent [&_code]:!p-0",
          // Ensure proper text sizing and font
          "[&_pre]:text-sm [&_pre]:font-mono",
          "[&_code]:text-sm [&_code]:font-mono",
          // Handle scrolling
          "[&_pre]:overflow-x-auto",
          detectedLanguage && detectedLanguage !== "text"
            ? "rounded-t-none rounded-b-lg"
            : "rounded-lg",
          className
        )}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        {...props}
      />

      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-2 p-2 rounded-md transition-all duration-200",
          "bg-background/80 backdrop-blur-sm border border-border",
          "opacity-0 group-hover:opacity-100",
          "hover:bg-muted hover:scale-105",
          "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary",
          detectedLanguage && detectedLanguage !== "text" ? "top-12" : "top-2"
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
