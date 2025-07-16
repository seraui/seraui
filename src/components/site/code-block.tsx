import { extractCode } from "@/lib/code";
import { CodeRenderer } from "./code-renderer";
import type { BuiltinLanguage } from "shiki";

import { cn } from "@/lib/utils";
import CodeCopy from "./code-copy";
import { ReactIcon } from "@/assets/icons/react";
import { TypeScriptIcon } from "@/assets/icons/typescript";
import { JSXIcon } from "@/assets/icons/jsx";
import { JavaScriptIcon } from "@/assets/icons/javascript";
import type { ReactElement } from "react";

type CodeBlockProps = {
  filePath?: string;
  code?: string;
  lang?: BuiltinLanguage;
};

// Function to get the appropriate icon for each language
const getLanguageIcon = (language: string): ReactElement | null => {
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
    case 'mjs':
    case 'cjs':
      return <JavaScriptIcon {...iconProps} />;
    default:
      return null;
  }
};

// Function to detect language from file path
const detectLanguageFromPath = (filePath: string): BuiltinLanguage => {
  const extension = filePath.split('.').pop()?.toLowerCase();

  const extensionMap: Record<string, BuiltinLanguage> = {
    'tsx': 'tsx',
    'jsx': 'jsx',
    'ts': 'typescript',
    'js': 'javascript',
    'mjs': 'javascript',
    'cjs': 'javascript',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'html': 'html',
    'htm': 'html',
    'json': 'json',
    'jsonc': 'jsonc',
    'json5': 'json5',
    'md': 'markdown',
    'mdx': 'markdown',
    'py': 'python',
    'pyw': 'python',
    'rs': 'rust',
    'go': 'go',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cxx': 'cpp',
    'cc': 'cpp',
    'h': 'c',
    'hpp': 'cpp',
    'hxx': 'cpp',
    'php': 'php',
    'rb': 'ruby',
    'swift': 'swift',
    'kt': 'kotlin',
    'dart': 'dart',
    'sql': 'sql',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'xml': 'xml',
    'sh': 'bash',
    'bash': 'bash',
    'zsh': 'bash',
    'fish': 'bash',
    'ps1': 'powershell',
    'bat': 'batch',
    'cmd': 'batch',
    'vue': 'vue',
    'svelte': 'svelte',
    'astro': 'astro',
  };

  return extensionMap[extension || ''] || 'tsx'; // default fallback
};

export const CodeBlock = ({
  filePath,
  code = "",
  lang,
}: CodeBlockProps): ReactElement => {
  const fileContent = filePath ? extractCode(filePath) : code;
  const detectedLang = lang || (filePath ? detectLanguageFromPath(filePath) : "tsx");
  const fileName = filePath ? filePath.split('/').pop() || filePath : null;

  return (
    <div className="relative w-full">
      {/* Language header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border border-b-0 border-border rounded-t-lg">
        <div className="flex items-center">
          {getLanguageIcon(detectedLang)}
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
            {detectedLang}
          </span>
          {fileName && (
            <span className="ml-2 text-xs text-muted-foreground/70">
              {fileName}
            </span>
          )}
        </div>
        <CodeCopy code={fileContent} />
      </div>

      <div
        className={cn(
          "not-prose relative max-h-[400px] overflow-auto w-full rounded-b-lg border border-border",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border",
          // Remove background colors to let Shiki handle them
          "[&_.shiki]:!bg-transparent [&_.shiki]:!m-0",
          "[&_pre]:!bg-transparent [&_pre]:!m-0",
          "[&_code]:!bg-transparent [&_code]:!p-0"
        )}
      >
        <CodeRenderer code={fileContent} lang={detectedLang} />
      </div>
    </div>
  );
};
