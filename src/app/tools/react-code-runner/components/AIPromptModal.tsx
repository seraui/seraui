'use client';

import { useState, useEffect } from 'react';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import Button from '@/app/docs/button/button';
import { AVAILABLE_MODELS } from '../constants';
import type { AIPromptModalProps } from '../types';

export const AIPromptModal = ({ isOpen, onClose, onGenerate, isLoading, currentModel }: AIPromptModalProps) => {
  const [prompt, setPrompt] = useState('');

  const currentModelInfo = AVAILABLE_MODELS.find(model => model.id === currentModel);

  // Reset prompt when modal opens
  useEffect(() => {
    if (isOpen) {
      setPrompt('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Code Generator
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Describe what you want to build and AI will generate the code
              </p>
              {currentModelInfo && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                    Using: {currentModelInfo.name}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            iconLeft={<X className="w-4 h-4" />}
            disabled={isLoading}
          >
            Close
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label 
              htmlFor="ai-prompt" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Describe your component
            </label>
            <textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Create a todo list with animations, or Make a card component with hover effects..."
              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isLoading}
              autoFocus
            />
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Press Ctrl+Enter (Cmd+Enter on Mac) to generate quickly
            </div>
          </div>

          {/* Example prompts */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Example prompts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Create a todo list with animations",
                "Make a card component with hover effects",
                "Build a simple calculator",
                "Design a user profile card",
                "Create a loading spinner animation",
                "Make a responsive navigation menu"
              ].map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPrompt(example)}
                  disabled={isLoading}
                  className="text-left p-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating code...
                </div>
              ) : (
                "Ready to generate your React component"
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                iconLeft={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {isLoading ? 'Generating...' : 'Generate Code'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
