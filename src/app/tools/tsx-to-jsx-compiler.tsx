'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Copy, Download, Play, AlertCircle } from 'lucide-react';
import Button from '@/app/docs/button/button';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
});

const TsxToJsxCompiler = () => {
  const searchParams = useSearchParams();
  const [tsxInput, setTsxInput] = useState(`
                                                                                   
  //                      🔧 PASTE YOUR TSX CODE BELOW 🔧                            
                                                                                    
  // This is your playground. Drop your amazing TSX code right here and let it fly!  
                                                                                    
`);

  const [jsxOutput, setJsxOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle compilation with useCallback to avoid dependency issues
  const handleCompile = useCallback(async (inputCode?: string) => {
    setIsLoading(true);
    setError('');

    try {
      const codeToCompile = inputCode || tsxInput;
      const result = convertTsxToJsx(codeToCompile);
      setJsxOutput(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setJsxOutput('');
    } finally {
      setIsLoading(false);
    }
  }, [tsxInput]);

  // Check for URL parameters on component mount
  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      try {
        const decodedCode = decodeURIComponent(codeParam);
        setTsxInput(decodedCode);
        // Auto-compile when code is loaded from URL
        setTimeout(() => {
          handleCompile(decodedCode);
        }, 100);
      } catch (error) {
        console.error('Error decoding URL parameter:', error);
      }
    }
  }, [searchParams, handleCompile]);

  // Most powerful TSX to JSX converter ever created
  const convertTsxToJsx = (tsxCode: string) => {
    try {
      // Helper function to find matching brace/bracket/parenthesis
      const findMatchingBrace = (str: string, startIndex: number, openChar: string, closeChar: string): number => {
        let count = 1;
        let i = startIndex + 1;
        let inString = false;
        let stringChar = '';
        let inComment = false;
        let inRegex = false;

        while (i < str.length && count > 0) {
          const char = str[i];
          const prevChar = str[i - 1];
          const nextChar = str[i + 1];

          // Handle string literals
          if (!inComment && !inRegex && (char === '"' || char === "'" || char === '`')) {
            if (!inString) {
              inString = true;
              stringChar = char;
            } else if (char === stringChar && prevChar !== '\\') {
              inString = false;
              stringChar = '';
            }
          }

          // Handle comments
          if (!inString && !inRegex) {
            if (char === '/' && nextChar === '/') {
              inComment = true;
            } else if (char === '/' && nextChar === '*') {
              inComment = true;
            } else if (char === '*' && nextChar === '/') {
              inComment = false;
              i++; // Skip the '/'
            } else if (char === '\n') {
              inComment = false;
            }
          }

          // Handle regex literals
          if (!inString && !inComment && char === '/' && prevChar !== '*' && prevChar !== '/') {
            // Simple regex detection
            if (i > 0 && /[=,([\s]/.test(str[i - 1])) {
              inRegex = true;
            }
          } else if (inRegex && char === '/' && prevChar !== '\\') {
            inRegex = false;
          }

          // Count braces only when not in strings, comments, or regex
          if (!inString && !inComment && !inRegex) {
            if (char === openChar) {
              count++;
            } else if (char === closeChar) {
              count--;
            }
          }

          i++;
        }

        return count === 0 ? i - 1 : -1;
      };

      // Helper function to remove TypeScript constructs while preserving structure
      const removeTypeScriptConstructs = (code: string): string => {
        let result = code;

        // Remove import type statements
        result = result.replace(/import\s+type\s+[^;]+;/g, '');
        result = result.replace(/import\s+\{[^}]*type[^}]*\}[^;]*;/g, '');

        // Remove export type statements
        result = result.replace(/export\s+type\s+[^;]+;/g, '');

        // Remove interface declarations with proper brace matching
        const interfaceRegex = /interface\s+\w+(?:\s*<[^>]*>)?\s*(?:extends\s+[^{]+)?\s*\{/g;
        let match;
        while ((match = interfaceRegex.exec(result)) !== null) {
          const startIndex = match.index;
          const braceIndex = result.indexOf('{', startIndex);
          const endIndex = findMatchingBrace(result, braceIndex, '{', '}');
          if (endIndex !== -1) {
            result = result.substring(0, startIndex) + result.substring(endIndex + 1);
            interfaceRegex.lastIndex = 0; // Reset regex
          }
        }

        // Remove type aliases with proper handling
        result = result.replace(/type\s+\w+(?:\s*<[^>]*>)?\s*=\s*[^;]+;/g, '');

        // Remove enum declarations with proper brace matching
        const enumRegex = /enum\s+\w+\s*\{/g;
        while ((match = enumRegex.exec(result)) !== null) {
          const startIndex = match.index;
          const braceIndex = result.indexOf('{', startIndex);
          const endIndex = findMatchingBrace(result, braceIndex, '{', '}');
          if (endIndex !== -1) {
            result = result.substring(0, startIndex) + result.substring(endIndex + 1);
            enumRegex.lastIndex = 0; // Reset regex
          }
        }

        // Remove namespace declarations
        const namespaceRegex = /namespace\s+\w+\s*\{/g;
        while ((match = namespaceRegex.exec(result)) !== null) {
          const startIndex = match.index;
          const braceIndex = result.indexOf('{', startIndex);
          const endIndex = findMatchingBrace(result, braceIndex, '{', '}');
          if (endIndex !== -1) {
            result = result.substring(0, startIndex) + result.substring(endIndex + 1);
            namespaceRegex.lastIndex = 0; // Reset regex
          }
        }

        // Remove declare statements
        result = result.replace(/declare\s+[^;{]+[;{][^}]*}?/g, '');

        return result;
      };

      // Helper function to remove type annotations from function parameters
      const removeParameterTypes = (params: string): string => {
        // Handle destructured parameters with types
        let result = params;

        // Remove type annotations from destructured parameters
        result = result.replace(/(\{[^}]*\})\s*:\s*[^,)=]+/g, '$1');

        // Remove type annotations from regular parameters
        result = result.replace(/(\w+)\s*:\s*[^,)=]+/g, '$1');

        // Remove optional parameter markers
        result = result.replace(/(\w+)\?\s*([,)=])/g, '$1$2');

        // Remove default parameter type annotations
        result = result.replace(/(\w+)\s*:\s*[^=]+(\s*=)/g, '$1$2');

        return result;
      };

      // Start conversion process
      let jsxCode = removeTypeScriptConstructs(tsxCode);

      // Split into lines for detailed processing
      const lines = jsxCode.split('\n');
      const processedLines = lines.map((line) => {
        const leadingWhitespace = line.match(/^(\s*)/)?.[1] || '';
        const content = line.trim();

        if (!content || content.startsWith('//') || content.startsWith('/*') || content.startsWith('*')) {
          return line; // Keep comments and empty lines as is
        }

        let newContent = content;

        // Remove React.FC and FC type annotations
        newContent = newContent.replace(/:\s*React\.FC<[^>]*>/g, '');
        newContent = newContent.replace(/:\s*FC<[^>]*>/g, '');
        newContent = newContent.replace(/:\s*FunctionComponent<[^>]*>/g, '');
        newContent = newContent.replace(/:\s*React\.FunctionComponent<[^>]*>/g, '');

        // Remove function return type annotations
        newContent = newContent.replace(/\)\s*:\s*[^{=>\s][^{=>]*(\s*[{=>])/g, ')$1');

        // Remove arrow function return types
        newContent = newContent.replace(/(\)\s*:\s*[^=>\s][^=>]*?)(\s*=>)/g, ')$2');

        // Remove generic type parameters from functions and hooks
        newContent = newContent.replace(/(\w+)<[^>]*>(\s*\()/g, '$1$2');

        // Remove hook type annotations (useState, useRef, etc.)
        newContent = newContent.replace(/useState<[^>]*>/g, 'useState');
        newContent = newContent.replace(/useRef<[^>]*>/g, 'useRef');
        newContent = newContent.replace(/useMemo<[^>]*>/g, 'useMemo');
        newContent = newContent.replace(/useCallback<[^>]*>/g, 'useCallback');
        newContent = newContent.replace(/useReducer<[^>]*>/g, 'useReducer');
        newContent = newContent.replace(/useContext<[^>]*>/g, 'useContext');
        newContent = newContent.replace(/useEffect<[^>]*>/g, 'useEffect');
        newContent = newContent.replace(/useLayoutEffect<[^>]*>/g, 'useLayoutEffect');
        newContent = newContent.replace(/useImperativeHandle<[^>]*>/g, 'useImperativeHandle');

        // Remove event handler type annotations
        newContent = newContent.replace(/(event|e|evt)\s*:\s*React\.\w*Event[^,)]*([,)])/g, '$1$2');
        newContent = newContent.replace(/(event|e|evt)\s*:\s*\w*Event[^,)]*([,)])/g, '$1$2');

        // Handle function parameter type annotations
        const functionMatch = newContent.match(/(\w+)\s*\(\s*([^)]*)\s*\)/);
        if (functionMatch) {
          const [, funcName, params] = functionMatch;
          const cleanParams = removeParameterTypes(params);
          newContent = newContent.replace(functionMatch[0], `${funcName}(${cleanParams})`);
        }

        // Remove variable type annotations
        newContent = newContent.replace(/(\w+)\s*:\s*[^,)=\s]+(\s*[,)=])/g, '$1$2');

        // Remove array type annotations
        newContent = newContent.replace(/:\s*Array<[^>]*>/g, '');
        newContent = newContent.replace(/:\s*[^,)=\s]+\[\]/g, '');

        // Remove object type annotations
        newContent = newContent.replace(/:\s*\{[^}]*\}/g, '');

        // Remove union and intersection type annotations
        newContent = newContent.replace(/:\s*[^,)=\s]+(\s*[|&]\s*[^,)=\s]+)+/g, '');

        // Remove conditional type annotations
        newContent = newContent.replace(/:\s*[^,)=\s]+\s*\?\s*[^,)=\s]+\s*:\s*[^,)=\s]+/g, '');

        // Remove mapped type annotations
        newContent = newContent.replace(/:\s*\{[^}]*\[[^}]*\][^}]*\}/g, '');

        // Remove tuple type annotations
        newContent = newContent.replace(/:\s*\[[^\]]*\]/g, '');

        // Remove function type annotations
        newContent = newContent.replace(/:\s*\([^)]*\)\s*=>\s*[^,)=\s]+/g, '');

        // Remove optional parameter markers
        newContent = newContent.replace(/(\w+)\?\s*([,):=])/g, '$1$2');

        // Remove type assertions (as keyword)
        newContent = newContent.replace(/\s+as\s+[^,;)}\s]+/g, '');

        // Remove angle bracket type assertions
        newContent = newContent.replace(/<[^>]*>(\s*[^<])/g, '$1');

        // Remove satisfies keyword
        newContent = newContent.replace(/\s+satisfies\s+[^,;)}\s]+/g, '');

        // Remove non-null assertion operator
        newContent = newContent.replace(/(\w+)!/g, '$1');

        // Remove readonly modifier
        newContent = newContent.replace(/readonly\s+/g, '');

        // Remove public, private, protected modifiers
        newContent = newContent.replace(/(public|private|protected)\s+/g, '');

        // Remove static modifier in inappropriate contexts
        newContent = newContent.replace(/static\s+(?!class)/g, '');

        // Remove abstract modifier
        newContent = newContent.replace(/abstract\s+/g, '');

        // Clean up extra spaces while preserving intentional formatting
        newContent = newContent.replace(/\s+/g, ' ').trim();

        return leadingWhitespace + newContent;
      });

      // Join lines and clean up
      jsxCode = processedLines.join('\n');

      // Final cleanup passes

      // Remove any remaining TypeScript-specific syntax
      jsxCode = jsxCode.replace(/\s*implements\s+[^{]+/g, '');
      jsxCode = jsxCode.replace(/\s*extends\s+[^{,]+/g, '');

      // Clean up excessive empty lines
      jsxCode = jsxCode.replace(/\n\s*\n\s*\n+/g, '\n\n');

      // Remove leading and trailing empty lines
      jsxCode = jsxCode.replace(/^\s*\n+/, '').replace(/\n+\s*$/, '');

      // Fix any broken syntax from aggressive type removal
      jsxCode = jsxCode.replace(/,\s*,/g, ','); // Remove double commas
      jsxCode = jsxCode.replace(/\(\s*,/g, '('); // Remove leading commas in parameters
      jsxCode = jsxCode.replace(/,\s*\)/g, ')'); // Remove trailing commas in parameters
      jsxCode = jsxCode.replace(/\{\s*,/g, '{'); // Remove leading commas in objects
      jsxCode = jsxCode.replace(/,\s*\}/g, '}'); // Remove trailing commas in objects

      return jsxCode;
    } catch (err: unknown) {
      throw new Error(`Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsxOutput);
  };

  const downloadFile = () => {
    const blob = new Blob([jsxOutput], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen bg-background flex">
      <div className="flex-1 flex">{/* Left-right layout container */}

        {/* Left Side - TSX Input */}
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="font-medium text-sm">TSX Input</span>
            </div>
            <Button
              onClick={() => handleCompile()}
              disabled={isLoading}
              variant="default"
              size="sm"
              iconLeft={<Play className="w-4 h-4" />}
            >
              {isLoading ? 'Compiling...' : 'Compile'}
            </Button>
          </div>
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language="typescript"
              value={tsxInput}
              onChange={(value) => setTsxInput(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                glyphMargin: false,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
        </div>

        {/* Right Side - JSX Output */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="font-medium text-sm">JSX Output</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={copyToClipboard}
                disabled={!jsxOutput}
                variant="outline"
                size="sm"
                iconLeft={<Copy className="w-4 h-4" />}
              >
                Copy JSX
              </Button>

              <Button
                onClick={downloadFile}
                disabled={!jsxOutput}
                variant="default"
                size="sm"
                iconLeft={<Download className="w-4 h-4" />}
              >
                Download
              </Button>
            </div>
          </div>

          {error && (
            <div className="mx-4 mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-destructive mr-2" />
              <span className="text-destructive">{error}</span>
            </div>
          )}

          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language="javascript"
              value={jsxOutput}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                glyphMargin: false,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TsxToJsxCompiler;
