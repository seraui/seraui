"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLoading } from "./loading-provider";

interface SmartLoadingOptions {
  minDuration?: number; // Minimum time to show loading
  maxDuration?: number; // Maximum time before auto-complete
  threshold?: number; // Time threshold to decide if loading should be shown
  autoDetect?: boolean; // Auto-detect if loading is needed based on performance
}

interface LoadingState {
  isLoading: boolean;
  startTime: number | null;
  duration: number;
  shouldShow: boolean;
}

export const useSmartLoading = (options: SmartLoadingOptions = {}) => {
  const {
    minDuration = 300,
    maxDuration = 8000,
    threshold = 200,
    autoDetect = true,
  } = options;

  const { setLoading, loadingMetrics } = useLoading();
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    startTime: null,
    duration: 0,
    shouldShow: false,
  });

  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const performanceStartRef = useRef<number | null>(null);

  // Smart loading start - decides whether to show loading based on performance
  const startSmartLoading = useCallback(async () => {
    const startTime = Date.now();
    performanceStartRef.current = startTime;

    // Decide if we should show loading based on historical performance
    const shouldShow = autoDetect
      ? loadingMetrics.averageLoadTime > threshold || loadingMetrics.loadCount === 0
      : true;

    setLoadingState({
      isLoading: true,
      startTime,
      duration: 0,
      shouldShow,
    });

    if (shouldShow) {
      // Small delay to avoid flashing for very fast operations
      setTimeout(() => {
        setLoading(true);
      }, 50);
    }

    // Auto-complete after max duration
    loadingTimeoutRef.current = setTimeout(() => {
      stopSmartLoading();
    }, maxDuration);
  }, [autoDetect, loadingMetrics, threshold, setLoading, maxDuration]);

  // Smart loading stop - ensures minimum duration is met
  const stopSmartLoading = useCallback(() => {
    const endTime = Date.now();
    const startTime = performanceStartRef.current || endTime;
    const actualDuration = endTime - startTime;

    setLoadingState(prev => ({
      ...prev,
      isLoading: false,
      duration: actualDuration,
    }));

    // Clear timeout if exists
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    // Ensure minimum duration is met before hiding
    const remainingTime = Math.max(0, minDuration - actualDuration);
    
    setTimeout(() => {
      setLoading(false);
    }, remainingTime);
  }, [minDuration, setLoading]);

  // Async operation wrapper with smart loading
  const withSmartLoading = useCallback(async <T,>(
    operation: () => Promise<T>,
    customOptions?: Partial<SmartLoadingOptions>
  ): Promise<T> => {
    const opts = { ...options, ...customOptions };

    try {
      await startSmartLoading();
      const result = await operation();
      return result;
    } finally {
      stopSmartLoading();
    }
  }, [startSmartLoading, stopSmartLoading, options]);

  // Performance-based loading for sync operations
  const withPerformanceLoading = useCallback(<T,>(
    operation: () => T,
    expectedDuration?: number
  ): T => {
    const expected = expectedDuration || loadingMetrics.averageLoadTime || threshold;
    
    // Only show loading if we expect the operation to take longer than threshold
    if (expected > threshold) {
      startSmartLoading();
    }

    try {
      const result = operation();
      return result;
    } finally {
      if (expected > threshold) {
        stopSmartLoading();
      }
    }
  }, [startSmartLoading, stopSmartLoading, loadingMetrics, threshold]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    loadingState,
    loadingMetrics,
    
    // Manual control
    startSmartLoading,
    stopSmartLoading,
    
    // Wrapper functions
    withSmartLoading,
    withPerformanceLoading,
    
    // Utilities
    isLoadingRecommended: loadingMetrics.averageLoadTime > threshold,
    averageLoadTime: loadingMetrics.averageLoadTime,
    lastLoadTime: loadingMetrics.lastLoadTime,
  };
};

// Hook for component-level loading with automatic cleanup
export const useComponentLoading = (
  componentName?: string,
  options: SmartLoadingOptions = {}
) => {
  const smartLoading = useSmartLoading(options);
  const componentRef = useRef<string>(componentName || 'Unknown Component');

  // Track component-specific performance
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const loadTime = Date.now() - startTime;
      // You could send this to analytics or store in local storage
      console.debug(`${componentRef.current} load time: ${loadTime}ms`);
    };
  }, []);

  return {
    ...smartLoading,
    componentName: componentRef.current,
  };
};

// Hook for route-level loading detection
export const useRouteLoading = (routeName?: string) => {
  const { loadingMetrics } = useLoading();
  const [routePerformance, setRoutePerformance] = useState({
    currentRoute: routeName || 'unknown',
    loadTime: 0,
    isSlowRoute: false,
  });

  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const loadTime = Date.now() - startTime;
      const isSlowRoute = loadTime > 1000; // Routes taking more than 1s are considered slow
      
      setRoutePerformance({
        currentRoute: routeName || 'unknown',
        loadTime,
        isSlowRoute,
      });
    };
  }, [routeName]);

  return {
    routePerformance,
    loadingMetrics,
    shouldShowLoadingForRoute: routePerformance.isSlowRoute || loadingMetrics.averageLoadTime > 500,
  };
};
