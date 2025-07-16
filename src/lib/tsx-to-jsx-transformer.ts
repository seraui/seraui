/********************************************************************************************
 * ULTRA-POWERFUL TSX → JSX TRANSFORMER
 * Uses Babel AST parsing for accurate TypeScript syntax removal while preserving runtime semantics.
 * Includes Prettier formatting for clean, properly formatted output.
 ********************************************************************************************/

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { format } from 'prettier';

/**
 * Formats JavaScript/JSX code using Prettier with consistent settings
 */
const formatCode = async (code: string): Promise<string> => {
  try {
    return await format(code, {
      parser: 'babel',
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 80,
      bracketSpacing: true,
      jsxBracketSameLine: false,
      arrowParens: 'avoid',
      endOfLine: 'lf',
    });
  } catch (error) {
    console.warn('Prettier formatting failed, returning unformatted code:', error);
    return code;
  }
};

/**
 * Converts a string containing TSX code to plain JSX using AST transformation.
 * This is a robust AST-based transformer that handles complex TypeScript syntax correctly.
 */
export const transformTsxToJsx = async (tsxCode: string): Promise<string> => {
  try {
    // Parse the TSX code into an AST
    const ast = parse(tsxCode, {
      sourceType: 'module',
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      plugins: [
        'jsx',
        'typescript',
        'decorators-legacy',
        'classProperties',
        'objectRestSpread',
        'functionBind',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'dynamicImport',
        'nullishCoalescingOperator',
        'optionalChaining',
        'optionalCatchBinding',
        'throwExpressions',
        'topLevelAwait'
      ],
    });

    // Transform the AST to remove TypeScript-specific syntax
    traverse(ast, {
      // Remove type-only imports and exports
      ImportDeclaration(path) {
        if (path.node.importKind === 'type') {
          path.remove();
        } else {
          // Remove type-only specifiers from regular imports
          path.node.specifiers = path.node.specifiers.filter(spec => {
            if (t.isImportSpecifier(spec) && spec.importKind === 'type') {
              return false;
            }
            return true;
          });
          // Remove the entire import if no specifiers remain
          if (path.node.specifiers.length === 0) {
            path.remove();
          }
        }
      },

      ExportNamedDeclaration(path) {
        if (path.node.exportKind === 'type') {
          path.remove();
        }
      },

      // Remove TypeScript-only declarations
      TSInterfaceDeclaration(path) {
        path.remove();
      },

      TSTypeAliasDeclaration(path) {
        path.remove();
      },

      TSEnumDeclaration(path) {
        path.remove();
      },

      TSModuleDeclaration(path) {
        path.remove();
      },

      TSDeclareFunction(path) {
        path.remove();
      },

      TSDeclareMethod(path) {
        path.remove();
      },

      // Remove type annotations from variables
      VariableDeclarator(path) {
        if (path.node.id && t.isIdentifier(path.node.id) && path.node.id.typeAnnotation) {
          path.node.id.typeAnnotation = null;
        }
        if (path.node.id && t.isObjectPattern(path.node.id) && path.node.id.typeAnnotation) {
          path.node.id.typeAnnotation = null;
        }
        if (path.node.id && t.isArrayPattern(path.node.id) && path.node.id.typeAnnotation) {
          path.node.id.typeAnnotation = null;
        }
      },

      // Remove type annotations from function parameters and return types
      Function(path) {
        // Remove return type annotation
        if (path.node.returnType) {
          path.node.returnType = null;
        }

        // Remove type parameters
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }

        // Remove parameter type annotations
        path.node.params.forEach(param => {
          if (t.isIdentifier(param) && param.typeAnnotation) {
            param.typeAnnotation = null;
          }
          if (t.isObjectPattern(param) && param.typeAnnotation) {
            param.typeAnnotation = null;
          }
          if (t.isArrayPattern(param) && param.typeAnnotation) {
            param.typeAnnotation = null;
          }
          if (t.isRestElement(param) && param.typeAnnotation) {
            param.typeAnnotation = null;
          }
          if (t.isAssignmentPattern(param) && param.left && t.isIdentifier(param.left) && param.left.typeAnnotation) {
            param.left.typeAnnotation = null;
          }
        });
      },

      // Remove type annotations from arrow functions
      ArrowFunctionExpression(path) {
        if (path.node.returnType) {
          path.node.returnType = null;
        }
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
      },

      // Remove class implements and type parameters
      ClassDeclaration(path) {
        if (path.node.implements) {
          path.node.implements = null;
        }
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
        if (path.node.superTypeParameters) {
          path.node.superTypeParameters = null;
        }
      },

      // Remove class property type annotations and access modifiers
      ClassProperty(path) {
        if (path.node.typeAnnotation) {
          path.node.typeAnnotation = null;
        }
        // Remove access modifiers (handled by removing the accessibility property)
        if ('accessibility' in path.node) {
          delete (path.node as unknown as Record<string, unknown>).accessibility;
        }
        if ('readonly' in path.node) {
          delete (path.node as unknown as Record<string, unknown>).readonly;
        }
      },

      // Remove method type annotations and access modifiers
      ClassMethod(path) {
        if (path.node.returnType) {
          path.node.returnType = null;
        }
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
        if ('accessibility' in path.node) {
          delete (path.node as unknown as Record<string, unknown>).accessibility;
        }
      },

      // Handle object method definitions
      ObjectMethod(path) {
        if (path.node.returnType) {
          path.node.returnType = null;
        }
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
      },

      // Remove type assertions
      TSTypeAssertion(path) {
        path.replaceWith(path.node.expression);
      },

      TSAsExpression(path) {
        path.replaceWith(path.node.expression);
      },

      TSSatisfiesExpression(path) {
        path.replaceWith(path.node.expression);
      },

      // Remove non-null assertions
      TSNonNullExpression(path) {
        path.replaceWith(path.node.expression);
      },

      // Remove decorators
      Decorator(path) {
        path.remove();
      },

      // Handle JSX elements with type parameters
      JSXElement(path) {
        // Remove type parameters from JSX elements if they exist
        if (path.node.openingElement && 'typeParameters' in path.node.openingElement) {
          delete (path.node.openingElement as unknown as Record<string, unknown>).typeParameters;
        }
      },

      // Remove parameter properties from constructor parameters
      TSParameterProperty(path) {
        // Replace with the actual parameter
        if (path.node.parameter) {
          path.replaceWith(path.node.parameter);
        }
      },

      // Remove type parameters from function/method calls
      CallExpression(path) {
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
      },

      // Remove type parameters from new expressions
      NewExpression(path) {
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
      },

      // Remove type parameters from tagged template expressions
      TaggedTemplateExpression(path) {
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
      },

      // Remove type parameters from member expressions (like React.useRef<T>)
      MemberExpression(path) {
        if ('typeParameters' in path.node && path.node.typeParameters) {
          delete (path.node as unknown as Record<string, unknown>).typeParameters;
        }
      },

      // Remove optional chaining type parameters
      OptionalCallExpression(path) {
        if (path.node.typeParameters) {
          path.node.typeParameters = null;
        }
      },
    });

    // Generate the transformed code
    const result = generate(ast, {
      retainLines: false,
      compact: false,
      concise: false,
      comments: false, // Remove comments to clean up output
    });

    // Format the code using Prettier for consistent formatting
    return await formatCode(result.code);
  } catch (error) {
    console.warn('AST transformation failed, falling back to regex-based transformation:', error);
    return await fallbackRegexTransform(tsxCode);
  }
};

/**
 * Fallback regex-based transformer for when AST parsing fails
 */
const fallbackRegexTransform = async (tsxCode: string): Promise<string> => {
  let jsx = tsxCode;

  // Basic regex transformations as fallback
  jsx = jsx
    // Remove interfaces
    .replace(/^\s*interface\s+\w+[\s\S]*?\{[\s\S]*?\}\s*$/gm, '')
    // Remove type aliases
    .replace(/^\s*type\s+\w+[\s\S]*?=\s*[^=;]+;?\s*$/gm, '')
    // Remove enums
    .replace(/^\s*(export\s+)?enum\s+\w+\s*\{[\s\S]*?\}\s*$/gm, '')
    // Remove type-only imports
    .replace(/\bimport\s+type\s+.*?;?\n?/g, '')
    .replace(/\bexport\s+type\s+.*?;?\n?/g, '')
    // Remove type annotations
    .replace(/:\s*[^=,;)}\]]+(?=[=,;)}\]])/g, '')
    // Remove type assertions
    .replace(/\s+as\s+[^,;=)}\]]+/g, '')
    .replace(/\s*!\s*(?=[,;)}\]])/g, '')
    // Remove generics from function/class declarations
    .replace(/\b(function|class)\s+(\w+)\s*<[^>]+>/g, '$1 $2')
    // Remove generics from function calls (React.useRef<T>, useState<T>, etc.)
    .replace(/(\w+(?:\.\w+)*)\s*<[^>]+>(\s*\()/g, '$1$2')
    // Remove generics from new expressions
    .replace(/\bnew\s+(\w+(?:\.\w+)*)\s*<[^>]+>(\s*\()/g, 'new $1$2')
    // Clean up
    .replace(/,\s*([)}\]])/g, '$1')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  // Format the fallback transformed code as well
  return await formatCode(jsx);
};

/**
 * Returns true if the code still contains any TypeScript syntax we care about.
 */
export const containsTypeScriptSyntax = (code: string): boolean => {
  const tsPatterns = [
    /\binterface\s+\w+/,
    /\btype\s+\w+\s*=/,
    /\benum\s+\w+/,
    /\bnamespace\s+\w+/,
    /\bimplements\s+\w+/,
    /\bextends\s+\w+</,
    /:\s*\w+(\[\])?(\||&|\{|\<)/,
    /\bas\b/,
    /!\s*[($\w]/,
    /@\w+/,
    /import\s+type\b/,
    /export\s+type\b/,
    /readonly\s+\w+/,
    /private\s+\w+/,
    /protected\s+\w+/,
    /public\s+\w+/,
    /abstract\s+\w+/,
    /declare\s+\w+/,
    /constructor\s*\([^)]*\b(public|private|protected|readonly)/
  ];

  return tsPatterns.some(pattern => pattern.test(code));
};

export const getCodeLanguage = (code: string): 'tsx' | 'jsx' => {
  return containsTypeScriptSyntax(code) ? 'tsx' : 'jsx';
};