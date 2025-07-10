import { useState, useCallback } from 'react';
import { CodeGenerator } from '../ai/codeGenerator';
import { DEFAULT_MODEL } from '../constants';

export const useAICodeGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState(DEFAULT_MODEL);
  const [codeGenerator] = useState(() => new CodeGenerator(DEFAULT_MODEL));

  const generateCode = useCallback(async (prompt: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const generatedCode = await codeGenerator.generateCodeWithExamples(prompt);
      return generatedCode;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate code';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [codeGenerator]);

  const changeModel = useCallback((model: string) => {
    setCurrentModel(model);
    codeGenerator.setModel(model);
  }, [codeGenerator]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateCode,
    changeModel,
    currentModel,
    isLoading,
    error,
    clearError
  };
};
