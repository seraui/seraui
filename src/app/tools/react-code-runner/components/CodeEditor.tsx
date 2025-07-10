'use client';

import dynamic from 'next/dynamic';
import { Copy, RotateCcw, MessageSquare } from 'lucide-react';
import Button from '@/app/docs/button/button';
import { EDITOR_CONFIG, DEFAULT_CODE } from '../constants';
import { configureMonacoEditor, copyToClipboard } from '../utils';
import { AICodeGenerator } from './AICodeGenerator';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
});

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export const CodeEditor = ({ code, onCodeChange }: CodeEditorProps) => {
  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await copyToClipboard(code);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Reset to default code
  const handleResetCode = () => {
    onCodeChange(DEFAULT_CODE);
  };



  return (
    <div className="flex-1 flex flex-col border-r border-border">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
        </div>
        <div className="flex items-center gap-2">
          <AICodeGenerator onCodeGenerated={onCodeChange} />
          <Button
            onClick={handleResetCode}
            variant="outline"
            size="sm"
            iconLeft={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
          <Button
            onClick={handleCopyCode}
            variant="outline"
            size="sm"
            iconLeft={<Copy className="w-4 h-4" />}
          >
            Copy
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language={EDITOR_CONFIG.language}
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          theme={EDITOR_CONFIG.theme}
          beforeMount={configureMonacoEditor}
          options={EDITOR_CONFIG.options}
        />
      </div>
    </div>
  );
};
