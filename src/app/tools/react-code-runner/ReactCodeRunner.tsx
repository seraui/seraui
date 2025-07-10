'use client';

import { useEffect } from 'react';
import { DEFAULT_CODE, FULLSCREEN_STYLES } from './constants';
import { useFullscreen, useCodeFromUrl } from './hooks';
import { CodeEditor, LivePreviewComponent } from './components';
import type { CodeRunnerProps } from './types';

const ReactCodeRunner = ({ initialCode = DEFAULT_CODE, onCodeChange }: CodeRunnerProps = {}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { code, setCode } = useCodeFromUrl(initialCode);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  // Additional fullscreen styling when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      // Ensure body and html have no margins/padding in fullscreen
      const originalBodyStyle = {
        margin: document.body.style.margin,
        padding: document.body.style.padding,
        overflow: document.body.style.overflow
      };
      const originalHtmlStyle = {
        margin: document.documentElement.style.margin,
        padding: document.documentElement.style.padding,
        overflow: document.documentElement.style.overflow
      };

      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        // Restore original styles
        document.body.style.margin = originalBodyStyle.margin;
        document.body.style.padding = originalBodyStyle.padding;
        document.body.style.overflow = originalBodyStyle.overflow;
        document.documentElement.style.margin = originalHtmlStyle.margin;
        document.documentElement.style.padding = originalHtmlStyle.padding;
        document.documentElement.style.overflow = originalHtmlStyle.overflow;
      };
    }
  }, [isFullscreen]);

  return (
    <div className={`react-code-runner ${isFullscreen ? FULLSCREEN_STYLES.container : FULLSCREEN_STYLES.normal}`}>
      <div className="flex-1 flex w-full h-full">
        {/* Left Side - Code Editor */}
        <CodeEditor
          code={code}
          onCodeChange={handleCodeChange}
        />

        {/* Right Side - Live Preview */}
        <LivePreviewComponent
          code={code}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
};

export default ReactCodeRunner;
