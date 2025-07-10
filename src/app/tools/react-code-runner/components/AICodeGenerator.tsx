'use client';

import { useState } from 'react';
import { Wand2, AlertCircle } from 'lucide-react';
import Button from '@/app/docs/button/button';
import { AIPromptModal } from './AIPromptModal';
import { ModelSelector } from './ModelSelector';
import { useAICodeGenerator } from '../hooks/useAICodeGenerator';
import type { AICodeGeneratorProps } from '../types';

export const AICodeGenerator = ({ onCodeGenerated }: AICodeGeneratorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { generateCode, changeModel, currentModel, isLoading, error, clearError } = useAICodeGenerator();

  const handleOpenModal = () => {
    clearError();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearError();
  };

  const handleGenerate = async (prompt: string) => {
    try {
      const generatedCode = await generateCode(prompt);
      onCodeGenerated(generatedCode);
      setIsModalOpen(false);
    } catch (err) {
      // Error is already handled by the hook
      console.error('Code generation failed:', err);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <ModelSelector
          currentModel={currentModel}
          onModelChange={changeModel}
          isLoading={isLoading}
        />
        <Button
          onClick={handleOpenModal}
          variant="outline"
          size="sm"
          iconLeft={<Wand2 className="w-4 h-4" />}
          disabled={isLoading}
        >
          AI Generate
        </Button>
      </div>

      <AIPromptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        currentModel={currentModel}
      />

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Code Generation Failed
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error}
                </p>
                <button
                  onClick={clearError}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 mt-2 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
