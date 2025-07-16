'use client';

import dynamic from 'next/dynamic';
import { Maximize2, Minimize2 } from 'lucide-react';
import Button from '@/app/docs/button/button';
import { ERROR_STYLES } from '../constants';
import { createLibraryScope } from '../utils';

// Dynamically import react-live components to avoid SSR issues
const LiveProvider = dynamic(() => import('react-live').then(mod => ({ default: mod.LiveProvider })), {
  ssr: false,
});

const LivePreview = dynamic(() => import('react-live').then(mod => ({ default: mod.LivePreview })), {
  ssr: false,
});

const LiveError = dynamic(() => import('react-live').then(mod => ({ default: mod.LiveError })), {
  ssr: false,
});

interface LivePreviewProps {
  code: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const LivePreviewComponent = ({ code, isFullscreen, onToggleFullscreen }: LivePreviewProps) => {
  const libraryScope = createLibraryScope();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          <span className="font-medium text-sm">Live Preview</span>
        </div>
        <Button
          onClick={onToggleFullscreen}
          variant="outline"
          size="sm"
          iconLeft={isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-white dark:bg-zinc-900">
        <LiveProvider
          code={code}
          scope={libraryScope}
          transformCode={(code) => {
            // Transform code to support modern ES6+ features
            // This helps with arrow functions, destructuring, etc.
            try {
              // Basic transformations for better compatibility
              let transformedCode = code;

              // Ensure React is available for JSX
              if (!transformedCode.includes('React.') && transformedCode.includes('<')) {
                transformedCode = `const React = require('react');\n${transformedCode}`;
              }

              return transformedCode;
            } catch (error) {
              console.warn('Code transformation failed:', error);
              return code;
            }
          }}
          noInline={false}
        >
          <div className="p-4">
            <LivePreview />
            <LiveError style={ERROR_STYLES} />
          </div>
        </LiveProvider>
      </div>
    </div>
  );
};
