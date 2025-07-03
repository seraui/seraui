'use client';

import { useState } from 'react';
import Header from '@/components/site/header';
import GradientGenerator from "./gradientgenerator";

// Define available tools
const tools = [
  {
    id: 'gradient-generator',
    name: 'Gradients Generator',
    description: 'Create beautiful CSS and Tailwind gradients',
    icon: '🎨',
    component: GradientGenerator
  },
];

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const selectedToolData = tools.find(tool => tool.id === selectedTool);
  const ToolComponent = selectedToolData?.component;

  return (
    <>
      <Header />
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
    </>
  );
}
