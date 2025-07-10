'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Cpu, Check } from 'lucide-react';
import Button from '@/app/docs/button/button';
import { AVAILABLE_MODELS } from '../constants';
import type { ModelSelectorProps } from '../types';

export const ModelSelector = ({ currentModel, onModelChange, isLoading = false }: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as Element;
        if (!target.closest('.model-selector')) {
          setIsOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const currentModelInfo = AVAILABLE_MODELS.find(model => model.id === currentModel);

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  return (
    <div className="relative model-selector">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        iconLeft={<Cpu className="w-4 h-4" />}
        iconRight={<ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        disabled={isLoading}
      >
        <span className="hidden sm:inline">
          {currentModelInfo?.name || currentModel}
        </span>
        <span className="sm:hidden">
          Model
        </span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Select AI Model
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose the AI model for code generation
            </p>
          </div>
          
          <div className="py-2">
            {AVAILABLE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentModel === model.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">
                        {model.name}
                      </span>
                      {currentModel === model.id && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {model.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {model.provider}
                      </span>
                      {model.id === 'deepseek-r1' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                          Recommended
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-border bg-gray-50 dark:bg-zinc-900/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 <strong>DeepSeek R1</strong> is recommended for the best code generation results
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
