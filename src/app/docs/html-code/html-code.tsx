"use client";
import React, {
  useState,
  useEffect,
  Children,
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  ReactNode,
  ReactElement,
} from "react";
import {
  Monitor,
  Code as CodeIcon,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

// --- Types ---
interface TabData {
  id: number;
  title: string;
  icon: ReactNode;
  content: ReactElement;
}

interface CodeTabsProps {
  children: ReactNode;
}

interface PreviewProps {
  title?: string;
  children: ReactNode;
  isActive?: boolean;
  isDarkMode?: boolean;
}

interface CodeViewProps {
  title?: string;
  lang?: string;
  children: string;
  isActive?: boolean;
  isDarkMode?: boolean;
}

interface HtmlRendererProps {
  htmlContent: string;
}

interface HeaderProps {
  tabs: TabData[];
  activeTabId: number;
  onTabClick: (id: number) => void;
}

interface TabProps {
  id: number;
  icon: ReactNode;
  text: string;
  active: boolean;
  onClick: (id: number) => void;
}

interface CodeEditorProps {
  codeString: string;
  language: string;
  isDarkMode?: boolean;
}

interface HtmlCodeTabsProps {
  htmlContent: string;
  title?: string;
  fileName?: string;
  className?: string;
}

// --- Main Reusable Component ---
export default function HtmlCodeTabs({
  htmlContent,
  title = "Demo",
  fileName = "index.html",
  className = "",
}: HtmlCodeTabsProps) {
  return (
    <div
      className={`font-sans w-full max-w-none p-2 sm:p-4 lg:p-8 ${className}`}
    >
      <CodeTabs>
        <Preview title={title}>
          <HtmlRenderer htmlContent={htmlContent} />
        </Preview>
        <Code title={fileName} lang="html">
          {htmlContent}
        </Code>
      </CodeTabs>
    </div>
  );
}

const CodeTabs = ({ children }: CodeTabsProps) => {
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const handleTabClick = useCallback((id: number) => {
    setActiveTabId(id);
  }, []);

  const tabs = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const childProps = child.props as { title?: string };
      return {
        id: index + 1,
        title: childProps.title || (child.type === Preview ? "Demo" : "Code"),
        icon:
          child.type === Preview ? (
            <Monitor size={14} />
          ) : (
            <CodeIcon size={14} />
          ),
        content: child,
      };
    }
    return null;
  })?.filter(Boolean) as TabData[];

  return (
    <div
      className="w-full max-w-7xl mx-auto rounded-xl shadow-2xl border overflow-hidden bg-white dark:bg-[#161b22] border-gray-200 dark:border-gray-800"
    >
      <Header
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={handleTabClick}
      />
      {/* Responsive height content area */}
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-50 dark:bg-[#0d1117]">
        {tabs.map((tab) =>
          cloneElement(tab.content, {
            key: tab.id,
            isActive: tab.id === activeTabId,
          } as { key: number; isActive: boolean })
        )}
      </div>
    </div>
  );
};

const Preview = memo(function Preview({ children, isActive }: PreviewProps) {
  return (
    <div
      className={`h-full w-full overflow-hidden relative ${!isActive ? "hidden" : ""}`}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
});

const CodeView = memo(function CodeView({ children, lang, isActive }: CodeViewProps) {
  if (!isActive) return null;
  return <CodeEditor codeString={children} language={lang || "html"} />;
});
const Code = CodeView;

const HtmlRenderer = memo(function HtmlRenderer({
  htmlContent,
}: HtmlRendererProps) {
  const [isDark, setIsDark] = useState(() => {
    // Initialize with current dark mode state
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const checkDarkMode = () => {
      const newIsDark = document.documentElement.classList.contains("dark");
      if (newIsDark !== isDark) {
        setIsDark(newIsDark);
        // Force iframe reload when dark mode changes
        setIframeKey((prev) => prev + 1);
        setIsLoading(true);
      }
    };

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isDark]);

  // Reset loading when htmlContent changes
  useEffect(() => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [htmlContent]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html class="h-full ${isDark ? "dark" : ""}">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            darkMode: 'class'
          }
        </script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          html, body { 
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: ${isDark ? "#000000" : "#ffffff"};
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  return (
    <div className="h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-[#0d1117] z-10">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="text-sm">Loading preview...</span>
          </div>
        </div>
      )}
      <iframe
        key={iframeKey}
        srcDoc={iframeSrcDoc}
        title="Demo Preview"
        sandbox="allow-scripts"
        className="w-full h-full border-0"
        style={{ backgroundColor: "transparent" }}
        onLoad={handleIframeLoad}
      />
    </div>
  );
});

const Header = memo(function Header({ tabs, activeTabId, onTabClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-100/60 dark:bg-[#21262d]/60">
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-700"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-700"></span>
          <span className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-700"></span>
        </div>
        <div className="flex items-center ml-2 sm:ml-4 gap-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              icon={tab.icon}
              text={tab.title}
              active={tab.id === activeTabId}
              onClick={onTabClick}
            />
          ))}
        </div>
      </div>
      <a
        href="#"
        className="flex-shrink-0 flex items-center gap-2 ml-4 px-3 py-1.5 text-sm rounded-md transition-all text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      >
        <span className="hidden md:inline">View on GitHub</span>
        <span className="inline md:hidden">GitHub</span>
        <ExternalLink size={14} />
      </a>
    </div>
  );
});

const Tab = memo(function Tab({ id, icon, text, active, onClick }: TabProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all ${
        active
          ? "bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white shadow-sm"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {icon} <span>{text}</span>
    </button>
  );
});

const CodeEditor = memo(function CodeEditor({ codeString, language }: CodeEditorProps) {
  const [lines, setLines] = useState<React.ReactNode[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const highlight = async () => {
      setIsLoading(true);
      try {
        const codeLines = codeString.trim().split("\n");
        const parsedLines = codeLines.map((line, lineIndex) => {
          if (language === "html") {
            const htmlTokens: React.ReactNode[] = [];

            const patterns = [
              { regex: /(<\/?[a-zA-Z][^>]*>)/g, color: "#7dd3fc" }, // Tags
              { regex: /(\s[a-zA-Z-]+)=/g, color: "#fbbf24" }, // Attributes
              { regex: /(="[^"]*")/g, color: "#86efac" }, // Attribute values
              { regex: /(<!--.*?-->)/g, color: "#6b7280" }, // Comments
            ];

            const matches: Array<{
              match: string;
              color: string;
              index: number;
            }> = [];

            patterns.forEach(({ regex, color }) => {
              let match;
              while ((match = regex.exec(line)) !== null) {
                matches.push({
                  match: match[0],
                  color,
                  index: match.index,
                });
              }
            });

            matches.sort((a, b) => a.index - b.index);

            let lastIndex = 0;
            matches.forEach((match, i) => {
              if (match.index > lastIndex) {
                htmlTokens.push(
                  <span key={`text-${i}`} style={{ color: "#e5e7eb" }}>
                    {line.slice(lastIndex, match.index)}
                  </span>
                );
              }
              htmlTokens.push(
                <span key={`match-${i}`} style={{ color: match.color }}>
                  {match.match}
                </span>
              );
              lastIndex = match.index + match.match.length;
            });

            if (lastIndex < line.length) {
              htmlTokens.push(
                <span key="remaining" style={{ color: "#e5e7eb" }}>
                  {line.slice(lastIndex)}
                </span>
              );
            }

            return htmlTokens.length > 0
              ? htmlTokens
              : [
                  <span key={lineIndex} style={{ color: "#e5e7eb" }}>
                    {line}
                  </span>,
                ];
          } else {
            return [
              <span key={lineIndex} style={{ color: "#e5e7eb" }}>
                {line}
              </span>,
            ];
          }
        });

        if (isMounted) {
          setLines(parsedLines);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error highlighting code:", error);
        if (isMounted) {
          setLines(
            codeString
              .trim()
              .split("\n")
              .map((line, i) => [
                <span key={i} style={{ color: "#e5e7eb" }}>
                  {line}
                </span>,
              ])
          );
          setIsLoading(false);
        }
      }
    };
    highlight();
    return () => {
      isMounted = false;
    };
  }, [codeString, language]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = codeString;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="h-full w-full relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-200 dark:bg-[#21262d] border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-[#30363d] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <div className="p-4 text-sm font-mono h-full overflow-auto">
        <div className="flex">
          <div
            className="pr-4 text-right text-gray-500 dark:text-gray-500 select-none"
            style={{ lineHeight: "1.5rem" }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="text-gray-600 dark:text-gray-400 animate-pulse">
                Loading syntax...
              </div>
            ) : (
              <pre className="m-0 p-0 bg-transparent whitespace-pre-wrap">
                <code className="block break-words">
                  {lines.map((tokens, i) => (
                    <div
                      key={i}
                      className="hover:bg-gray-100 dark:hover:bg-[#1f242c] transition-colors rounded-sm px-2 -ml-2"
                      style={{ lineHeight: "1.5rem" }}
                    >
                      {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
