"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface LoadingBarContextType {
  isLoading: boolean;
  progress: number;
  startLoading: (id?: string) => string;
  updateProgress: (id: string, progress: number) => void;
  finishLoading: (id: string) => void;
  setGlobalLoading: (loading: boolean) => void;
}

const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined);

interface LoadingState {
  id: string;
  progress: number;
  isActive: boolean;
}

export function LoadingBarProvider({ children }: { children: React.ReactNode }) {
  const [loadingStates, setLoadingStates] = useState<Map<string, LoadingState>>(new Map());
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const loadingIdCounter = useRef(0);
  const progressTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Calculate overall loading state and progress
  const isLoading = isGlobalLoading || loadingStates.size > 0;
  const progress = React.useMemo(() => {
    if (loadingStates.size === 0) return isGlobalLoading ? 30 : 100;
    
    const activeStates = Array.from(loadingStates.values()).filter(state => state.isActive);
    if (activeStates.length === 0) return 100;
    
    const totalProgress = activeStates.reduce((sum, state) => sum + state.progress, 0);
    return Math.min(totalProgress / activeStates.length, 95);
  }, [loadingStates, isGlobalLoading]);

  const startLoading = useCallback((customId?: string): string => {
    const id = customId || `loading-${++loadingIdCounter.current}`;
    
    setLoadingStates(prev => {
      const newMap = new Map(prev);
      newMap.set(id, { id, progress: 0, isActive: true });
      return newMap;
    });

    // Auto-increment progress for better UX
    const timer = setInterval(() => {
      setLoadingStates(prev => {
        const newMap = new Map(prev);
        const state = newMap.get(id);
        if (state && state.isActive && state.progress < 90) {
          newMap.set(id, { ...state, progress: Math.min(state.progress + Math.random() * 10, 90) });
        }
        return newMap;
      });
    }, 200);

    progressTimers.current.set(id, timer);
    return id;
  }, []);

  const updateProgress = useCallback((id: string, newProgress: number) => {
    setLoadingStates(prev => {
      const newMap = new Map(prev);
      const state = newMap.get(id);
      if (state) {
        newMap.set(id, { ...state, progress: Math.min(newProgress, 95) });
      }
      return newMap;
    });
  }, []);

  const finishLoading = useCallback((id: string) => {
    // Clear any existing timer
    const timer = progressTimers.current.get(id);
    if (timer) {
      clearInterval(timer);
      progressTimers.current.delete(id);
    }

    // Set progress to 100% and then remove after animation
    setLoadingStates(prev => {
      const newMap = new Map(prev);
      const state = newMap.get(id);
      if (state) {
        newMap.set(id, { ...state, progress: 100, isActive: false });
      }
      return newMap;
    });

    // Remove the loading state after a brief delay to allow animation
    setTimeout(() => {
      setLoadingStates(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }, 500);
  }, []);

  const setGlobalLoading = useCallback((loading: boolean) => {
    setIsGlobalLoading(loading);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      progressTimers.current.forEach(timer => clearInterval(timer));
      progressTimers.current.clear();
    };
  }, []);

  const value: LoadingBarContextType = {
    isLoading,
    progress,
    startLoading,
    updateProgress,
    finishLoading,
    setGlobalLoading,
  };

  return (
    <LoadingBarContext.Provider value={value}>
      {children}
    </LoadingBarContext.Provider>
  );
}

export function useLoadingBar() {
  const context = useContext(LoadingBarContext);
  if (context === undefined) {
    throw new Error('useLoadingBar must be used within a LoadingBarProvider');
  }
  return context;
}

// Hook for automatic loading detection on route changes
export function useRouteLoading() {
  const { startLoading, finishLoading } = useLoadingBar();
  
  return useCallback((href: string) => {
    const loadingId = startLoading(`route-${href}`);
    
    // Return a cleanup function
    return () => finishLoading(loadingId);
  }, [startLoading, finishLoading]);
}

// Hook for API request loading
export function useApiLoading() {
  const { startLoading, updateProgress, finishLoading } = useLoadingBar();
  
  return useCallback(async <T>(
    apiCall: () => Promise<T>,
    options?: { id?: string; onProgress?: (progress: number) => void }
  ): Promise<T> => {
    const loadingId = startLoading(options?.id);
    
    try {
      // Simulate initial progress
      updateProgress(loadingId, 20);
      
      const result = await apiCall();
      
      // Complete the loading
      updateProgress(loadingId, 100);
      finishLoading(loadingId);
      
      return result;
    } catch (error) {
      finishLoading(loadingId);
      throw error;
    }
  }, [startLoading, updateProgress, finishLoading]);
}
