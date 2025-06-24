import { extractCode } from "@/lib/code";
import { CodeRenderer } from "./code-renderer";
import type { BuiltinLanguage } from "shiki";

import { cn } from "@/lib/utils";
import CodeCopy from "./code-copy";
import { ReactIcon } from "@/assets/icons/react";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { JSXIcon } from "@/assets/icons/jsx";
import { JavaScriptIcon } from "@/assets/icons/javascript";

type CodeBlockProps = {
  filePath?: string;
  code?: string;
  lang?: BuiltinLanguage;
};

// Function to get the appropriate icon for each language
const getLanguageIcon = (language: string) => {
  const iconProps = { className: "w-4 h-4 mr-2 fill-zinc-400 dark:fill-zinc-500" };

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

// Function to detect language from file path
const detectLanguageFromPath = (filePath: string): BuiltinLanguage => {
  const extension = filePath.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'tsx':
      return 'tsx';
    case 'jsx':
      return 'jsx';
    case 'ts':
      return 'typescript';
    case 'js':
      return 'javascript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'md':
    case 'mdx':
      return 'markdown';
    default:
      return 'tsx'; // default fallback
  }
};

export const CodeBlock = ({
  filePath,
  code = "",
  lang,
}: CodeBlockProps) => {
  const fileContent = filePath ? extractCode(filePath) : code;
  const detectedLang = lang || (filePath ? detectLanguageFromPath(filePath) : "tsx");
  const fileName = filePath ? filePath.split('/').pop() || filePath : null;

  return (
    <div className="relative w-full">
      <CodeCopy code={fileContent} />

      {/* Language header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700 rounded-t-lg">
        <div className="flex items-center">
          {getLanguageIcon(detectedLang)}
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
            {detectedLang}
          </span>
          {fileName && (
            <span className="ml-2 text-xs text-zinc-500">
              {fileName}
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "not-prose relative max-h-[400px] thin-scroll overflow-auto w-full rounded-b-lg text-sm bg-zinc-950"
        )}
      >
        <CodeRenderer code={fileContent} lang={detectedLang} />
      </div>
    </div>
  );
};
