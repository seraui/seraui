'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/site/header';
import GradientGenerator from "./gradientgenerator";
import TsxToJsxCompiler from "./tsx-to-jsx-compiler";
import ReactCodeRunner from "./react-code-runner";

// Define available tools
const tools = [
  {
    id: 'gradient-generator',
    name: 'Gradients Generator',
    description: 'Create beautiful CSS and Tailwind gradients',
    icon: '🎨',
    component: GradientGenerator
  },
  {
    id: 'tsx-to-jsx-compiler',
    name: 'TSX to JSX Compiler',
    description: 'Convert TypeScript React components to pure JavaScript',
    icon: '🔄',
    component: TsxToJsxCompiler
  },
  {
    id: 'react-code-runner',
    name: 'React Code Runner',
    description: 'Live React code editor with real-time preview',
    icon: '⚛️',
    component: ReactCodeRunner
  },
];

// Component that uses useSearchParams - needs to be wrapped in Suspense
function ToolsContent() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Check for URL parameters on component mount
  useEffect(() => {
    const toolParam = searchParams.get('tool');
    if (toolParam && tools.find(tool => tool.id === toolParam)) {
      setSelectedTool(toolParam);
    }
  }, [searchParams]);

  const selectedToolData = tools.find(tool => tool.id === selectedTool);
  const ToolComponent = selectedToolData?.component;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        {selectedTool ? (
          <>
            {/* Back button */}
            <button
              onClick={() => setSelectedTool(null)}
              className="mb-6 flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Tools</span>
            </button>

            {/* Selected Tool Content */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {ToolComponent && <ToolComponent />}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-10">Design Tools</h1>

            {/* Grid of all tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className="flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all hover:border-emerald-300 dark:hover:border-emerald-700"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">{tool.description}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function ToolsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ToolsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ToolsLoading />}>
        <ToolsContent />
      </Suspense>
    </>
  );
}
