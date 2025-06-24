/**
 * Utility functions for converting TSX to JSX
 * This provides basic conversion helpers and tips for manual conversion
 */

export interface ConversionTip {
  pattern: string;
  description: string;
  example: {
    tsx: string;
    jsx: string;
  };
}

export const conversionTips: ConversionTip[] = [
  {
    pattern: "Type annotations",
    description: "Remove type annotations from function parameters and variables",
    example: {
      tsx: "const handleClick = (event: React.MouseEvent) => { ... }",
      jsx: "const handleClick = (event) => { ... }"
    }
  },
  {
    pattern: "Interface definitions",
    description: "Remove interface definitions and type declarations",
    example: {
      tsx: "interface Props { name: string; age: number; }",
      jsx: "// Remove interface - use PropTypes or default props instead"
    }
  },
  {
    pattern: "Generic types",
    description: "Remove generic type parameters",
    example: {
      tsx: "const [state, setState] = useState<string>('');",
      jsx: "const [state, setState] = useState('');"
    }
  },
  {
    pattern: "Type assertions",
    description: "Remove 'as Type' assertions",
    example: {
      tsx: "const element = document.getElementById('id') as HTMLElement;",
      jsx: "const element = document.getElementById('id');"
    }
  },
  {
    pattern: "Optional chaining with types",
    description: "Keep optional chaining but remove type annotations",
    example: {
      tsx: "const value: string | undefined = obj?.property;",
      jsx: "const value = obj?.property;"
    }
  },
  {
    pattern: "React.FC type",
    description: "Remove React.FC type annotation from components",
    example: {
      tsx: "const Component: React.FC<Props> = ({ name }) => { ... }",
      jsx: "const Component = ({ name }) => { ... }"
    }
  }
];

/**
 * Basic TSX to JSX conversion function
 * This handles simple cases - complex types may need manual review
 */
export function basicTsxToJsx(tsxCode: string): string {
  let jsxCode = tsxCode;

  // Remove import statements for types
  jsxCode = jsxCode.replace(/import\s+type\s+.*?from\s+['"][^'"]*['"];?\s*/g, '');
  
  // Remove interface definitions
  jsxCode = jsxCode.replace(/interface\s+\w+\s*{[^}]*}\s*/g, '');
  
  // Remove type definitions
  jsxCode = jsxCode.replace(/type\s+\w+\s*=\s*[^;]+;\s*/g, '');
  
  // Remove React.FC type annotations
  jsxCode = jsxCode.replace(/:\s*React\.FC<[^>]*>/g, '');
  
  // Remove generic type parameters from useState, useEffect, etc.
  jsxCode = jsxCode.replace(/useState<[^>]*>/g, 'useState');
  jsxCode = jsxCode.replace(/useRef<[^>]*>/g, 'useRef');
  jsxCode = jsxCode.replace(/useMemo<[^>]*>/g, 'useMemo');
  jsxCode = jsxCode.replace(/useCallback<[^>]*>/g, 'useCallback');
  
  // Remove type annotations from function parameters
  jsxCode = jsxCode.replace(/\(\s*(\w+)\s*:\s*[^)]+\)/g, '($1)');
  
  // Remove type assertions (as Type)
  jsxCode = jsxCode.replace(/\s+as\s+\w+/g, '');
  
  // Remove variable type annotations
  jsxCode = jsxCode.replace(/:\s*\w+(\[\])?(\s*\|\s*\w+)*\s*=/g, ' =');
  
  // Clean up extra whitespace
  jsxCode = jsxCode.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return jsxCode;
}

/**
 * Get conversion suggestions for a given TSX code
 */
export function getConversionSuggestions(tsxCode: string): string[] {
  const suggestions: string[] = [];
  
  if (tsxCode.includes('interface ')) {
    suggestions.push('Consider using PropTypes for runtime type checking instead of TypeScript interfaces');
  }
  
  if (tsxCode.includes('React.FC')) {
    suggestions.push('Remove React.FC type annotation and use regular function components');
  }
  
  if (tsxCode.includes('useState<') || tsxCode.includes('useRef<')) {
    suggestions.push('Remove generic type parameters from React hooks');
  }
  
  if (tsxCode.includes(': React.')) {
    suggestions.push('Remove React type annotations (React.MouseEvent, React.ChangeEvent, etc.)');
  }
  
  if (tsxCode.includes(' as ')) {
    suggestions.push('Remove type assertions (as Type)');
  }
  
  if (tsxCode.includes('import type')) {
    suggestions.push('Remove type-only imports');
  }
  
  return suggestions;
}

/**
 * Check if code is likely TSX (contains TypeScript-specific syntax)
 */
export function isTsxCode(code: string): boolean {
  const tsxPatterns = [
    /interface\s+\w+/,
    /type\s+\w+\s*=/,
    /:\s*React\./,
    /:\s*\w+(\[\])?(\s*\|\s*\w+)*\s*=/,
    /React\.FC</,
    /useState</,
    /useRef</,
    /\s+as\s+\w+/,
    /import\s+type/
  ];
  
  return tsxPatterns.some(pattern => pattern.test(code));
}

/**
 * Get file extension suggestion based on content
 */
export function suggestFileExtension(code: string): 'jsx' | 'tsx' {
  return isTsxCode(code) ? 'tsx' : 'jsx';
}
