import { createClient } from './client';
import type { ChatMessage } from '../types';

export class CodeGenerator {
  private client;
  private currentModel: string;

  constructor(model: string = 'deepseek-r1') {
    this.currentModel = model;
    this.client = createClient('pollinations', {
      defaultModel: model
    });
  }

  setModel(model: string) {
    this.currentModel = model;
    this.client = createClient('pollinations', {
      defaultModel: model
    });
  }

  getCurrentModel(): string {
    return this.currentModel;
  }

  private extractAndValidateCode(rawCode: string): string {
    let generatedCode = rawCode;

    // Clean up the response - remove markdown code blocks if present
    generatedCode = generatedCode.replace(/```jsx?\n?/gi, '').replace(/```\n?/g, '');
    generatedCode = generatedCode.replace(/```javascript\n?/gi, '').replace(/```js\n?/gi, '');

    // Remove any leading/trailing whitespace
    generatedCode = generatedCode.trim();

    // Try different patterns to find the App function
    const patterns = [
      // Standard function declaration
      /function\s+App\s*\(\s*\)\s*\{[\s\S]*?\n\}/g,
      // Function with proper brace matching
      /function\s+App\s*\(\s*\)\s*\{[\s\S]*\}/g,
      // Arrow function
      /const\s+App\s*=\s*\(\s*\)\s*=>\s*\{[\s\S]*\}/g,
      // Export function
      /export\s+function\s+App\s*\(\s*\)\s*\{[\s\S]*\}/g,
      // Export default function
      /export\s+default\s+function\s+App\s*\(\s*\)\s*\{[\s\S]*\}/g
    ];

    // Try to extract using patterns
    for (const pattern of patterns) {
      const matches = generatedCode.match(pattern);
      if (matches && matches[0]) {
        let extractedCode = matches[0];

        // If it's an export, remove the export keywords
        extractedCode = extractedCode.replace(/^export\s+(default\s+)?/, '');

        // Ensure it starts with 'function App'
        if (!extractedCode.trim().startsWith('function App')) {
          extractedCode = extractedCode.replace(/^const\s+App\s*=\s*\(\s*\)\s*=>\s*/, 'function App() ');
        }

        return this.validateAndFixCode(extractedCode);
      }
    }

    // If no pattern matched, try to find function App with proper brace matching
    const appFunctionIndex = generatedCode.search(/function\s+App\s*\(\s*\)/i);
    if (appFunctionIndex !== -1) {
      const codeFromFunction = generatedCode.substring(appFunctionIndex);
      const extractedFunction = this.extractFunctionWithBraceMatching(codeFromFunction);
      if (extractedFunction) {
        return this.validateAndFixCode(extractedFunction);
      }
    }

    // If still no match, check if the entire code is a valid function
    if (generatedCode.includes('function App') || generatedCode.includes('const App')) {
      return this.validateAndFixCode(generatedCode);
    }

    // Last resort: try to create a valid function from the content
    if (generatedCode.includes('<') && generatedCode.includes('>')) {
      // If it contains JSX but no return statement, try to wrap it
      if (!generatedCode.includes('return')) {
        const wrappedCode = `function App() {\n  return (\n    ${generatedCode}\n  );\n}`;
        try {
          return this.validateAndFixCode(wrappedCode);
        } catch {
          // Continue to next attempt
        }
      } else if (generatedCode.includes('return')) {
        // If it has return but no function wrapper
        const wrappedCode = `function App() {\n  ${generatedCode}\n}`;
        try {
          return this.validateAndFixCode(wrappedCode);
        } catch {
          // Continue to next attempt
        }
      }
    }

    // Try to extract any JSX content and wrap it
    const jsxMatch = generatedCode.match(/<[\s\S]*>/);
    if (jsxMatch) {
      const jsxContent = jsxMatch[0];
      const wrappedCode = `function App() {\n  return (\n    ${jsxContent}\n  );\n}`;
      try {
        return this.validateAndFixCode(wrappedCode);
      } catch {
        // Continue to error
      }
    }

    // Debug: Log the generated code to help with troubleshooting
    console.log('Raw generated code:', rawCode);
    console.log('Cleaned generated code:', generatedCode);

    throw new Error(`Generated code does not contain a valid App function. Generated content: "${generatedCode.substring(0, 200)}...". Please try again with a more specific prompt.`);
  }

  private extractFunctionWithBraceMatching(code: string): string | null {
    let braceCount = 0;
    let inFunction = false;
    let functionStart = -1;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (char === '{') {
        if (!inFunction) {
          inFunction = true;
          functionStart = 0; // Start from beginning since we already found 'function App()'
        }
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (inFunction && braceCount === 0) {
          return code.substring(functionStart, i + 1);
        }
      }
    }

    return null;
  }

  private validateAndFixCode(code: string): string {
    let validatedCode = code.trim();

    // Ensure the function starts correctly
    if (!validatedCode.startsWith('function App()')) {
      // Try to fix common issues
      validatedCode = validatedCode.replace(/^function\s+App\s*\(\s*\)/, 'function App()');
    }

    // More lenient validation - just check if it looks like a function
    if (!validatedCode.includes('function App') && !validatedCode.includes('const App')) {
      throw new Error('Generated code does not contain an App function. Please try again.');
    }

    // Check if it has some JSX-like content (more lenient)
    if (!validatedCode.includes('<') && !validatedCode.includes('return')) {
      throw new Error('Generated code does not appear to contain JSX or return statement. Please try again.');
    }

    // Basic brace balance check (more lenient - allow some imbalance for JSX)
    const openBraces = (validatedCode.match(/\{/g) || []).length;
    const closeBraces = (validatedCode.match(/\}/g) || []).length;

    // Allow small imbalance (JSX expressions might cause this)
    if (Math.abs(openBraces - closeBraces) > 2) {
      console.warn('Potential brace imbalance detected, but proceeding anyway');
    }

    return validatedCode;
  }

  private createSystemPrompt(): string {
    return `You are an expert React developer. Generate ONLY React component code based on user requests.

CRITICAL OUTPUT REQUIREMENTS:
1. Return ONLY the React component code, no explanations, markdown, or additional text
2. Start your response immediately with "function App() {"
3. End your response with the closing brace "}"
4. Do NOT include \`\`\`jsx or \`\`\` code blocks
5. Do NOT include any text before or after the function

COMPONENT REQUIREMENTS:
1. The code must be a complete, working React component
2. Use the function component syntax: function App() { ... }
3. Always return JSX from the component
4. Use React hooks (useState, useEffect, etc.) as needed

AVAILABLE LIBRARIES (already imported and ready to use):
- React hooks: useState, useEffect, useRef, useMemo, useCallback
- TailwindCSS: All utility classes for styling
- Lucide Icons: All icons available directly (e.g., <Heart />, <Plus />, <Star />)
- Framer Motion: motion components and AnimatePresence for animations

STYLING GUIDELINES:
- Use TailwindCSS classes for all styling
- Make components responsive with mobile-first approach
- Use modern design patterns with proper spacing and colors
- Add hover effects and transitions where appropriate

ANIMATION GUIDELINES:
- Use Framer Motion for smooth animations
- Common patterns: whileHover, whileTap, initial, animate, exit
- Use AnimatePresence for enter/exit animations
- Keep animations smooth and purposeful

ICON USAGE:
- Icons are available directly: <Plus />, <Minus />, <Heart />, <Star />, etc.
- Add appropriate className for sizing: "w-4 h-4", "w-6 h-6", etc.
- Use semantic colors: text-red-500, text-green-500, etc.

EXAMPLE STRUCTURE:
function App() {
  const [state, setState] = React.useState(initialValue);
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto"
      >
        {/* Your component content */}
      </motion.div>
    </div>
  );
}

Generate clean, modern, and functional React components that work immediately in the live preview.`;
  }

  async generateCode(userPrompt: string): Promise<string> {
    try {
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: this.createSystemPrompt()
        },
        {
          role: 'user',
          content: `Create a React component: ${userPrompt}`
        }
      ];

      const response = await this.client.chat.completions.create({
        model: this.currentModel,
        messages,
        temperature: 0.7,
        max_tokens: 2000
      });

      if (response.choices && response.choices[0] && response.choices[0].message) {
        const generatedCode = response.choices[0].message.content;

        return this.extractAndValidateCode(generatedCode);
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('Code generation error:', error);
      throw new Error(`Failed to generate code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateCodeWithExamples(userPrompt: string): Promise<string> {
    try {
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: this.createSystemPrompt()
        },
        {
          role: 'user',
          content: 'Create a simple counter with increment and decrement buttons'
        },
        {
          role: 'assistant',
          content: `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Counter</h1>
          <div className="text-center mb-6">
            <motion.div
              key={count}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-indigo-600"
            >
              {count}
            </motion.div>
          </div>
          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={() => setCount(count - 1)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minus className="w-4 h-4" />
              Decrease
            </motion.button>
            <motion.button
              onClick={() => setCount(count + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Increase
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}`
        },
        {
          role: 'user',
          content: `Create a React component: ${userPrompt}`
        }
      ];

      const response = await this.client.chat.completions.create({
        model: this.currentModel,
        messages,
        temperature: 0.7,
        max_tokens: 2000
      });

      if (response.choices && response.choices[0] && response.choices[0].message) {
        const generatedCode = response.choices[0].message.content;

        return this.extractAndValidateCode(generatedCode);
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('Code generation error:', error);
      throw new Error(`Failed to generate code: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
