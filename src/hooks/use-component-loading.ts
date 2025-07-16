"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoadingBar } from '@/contexts/loading-bar-context';

interface ComponentLoadingOptions {
  loadingId?: string;
  minLoadingTime?: number; // Minimum time to show loading (in ms)
  simulateProgress?: boolean; // Whether to simulate progress updates
}

export function useComponentLoading(options: ComponentLoadingOptions = {}) {
  const { startLoading, updateProgress, finishLoading } = useLoadingBar();
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const loadingIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startComponentLoading = useCallback((customId?: string) => {
    const id = customId || options.loadingId || `component-${Date.now()}`;
    
    // Start loading
    loadingIdRef.current = startLoading(id);
    setIsComponentLoading(true);
    startTimeRef.current = Date.now();

    // Simulate progress if enabled
    if (options.simulateProgress !== false) {
      const progressInterval = setInterval(() => {
        if (loadingIdRef.current) {
          const elapsed = Date.now() - (startTimeRef.current || 0);
          const progress = Math.min(20 + (elapsed / 50), 85); // Progress from 20% to 85%
          updateProgress(loadingIdRef.current, progress);
        }
      }, 100);

      // Store interval for cleanup
      return () => clearInterval(progressInterval);
    }

    return () => {};
  }, [startLoading, updateProgress, options.loadingId, options.simulateProgress]);

  const finishComponentLoading = useCallback(async () => {
    if (!loadingIdRef.current || !startTimeRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const minTime = options.minLoadingTime || 300; // Default 300ms minimum

    // Ensure minimum loading time
    if (elapsed < minTime) {
      await new Promise(resolve => setTimeout(resolve, minTime - elapsed));
    }

    // Complete the progress
    updateProgress(loadingIdRef.current, 100);
    
    // Finish loading after a brief delay
    setTimeout(() => {
      if (loadingIdRef.current) {
        finishLoading(loadingIdRef.current);
        loadingIdRef.current = null;
        startTimeRef.current = null;
        setIsComponentLoading(false);
      }
    }, 100);
  }, [finishLoading, updateProgress, options.minLoadingTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingIdRef.current) {
        finishLoading(loadingIdRef.current);
      }
    };
  }, [finishLoading]);

  return {
    isComponentLoading,
    startComponentLoading,
    finishComponentLoading,
  };
}

// Hook for wrapping async component operations
export function useAsyncComponentLoading(options: ComponentLoadingOptions = {}) {
  const { startComponentLoading, finishComponentLoading, isComponentLoading } = useComponentLoading(options);

  const withComponentLoading = useCallback(async <T>(
    operation: () => Promise<T> | T,
    loadingId?: string
  ): Promise<T> => {
    const cleanup = startComponentLoading(loadingId);
    
    try {
      const result = await Promise.resolve(operation());
      await finishComponentLoading();
      return result;
    } catch (error) {
      await finishComponentLoading();
      throw error;
    } finally {
      cleanup();
    }
  }, [startComponentLoading, finishComponentLoading]);

  return {
    isComponentLoading,
    withComponentLoading,
  };
}
