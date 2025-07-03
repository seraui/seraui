"use client";

import React, { createContext, useContext, useState, useEffect, Suspense, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingBar } from "./loading-bar";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
  loadingMetrics: LoadingMetrics;
}

interface LoadingMetrics {
  averageLoadTime: number;
  lastLoadTime: number;
  loadCount: number;
  shouldShowLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
  showLoadingBar?: boolean;
  smartDetection?: boolean; // Enable intelligent loading detection
  minLoadingThreshold?: number; // Minimum time (ms) before showing loading bar
  performanceThreshold?: number; // Performance threshold for auto-detection
  loadingBarProps?: {
    color?: string;
    height?: number;
    duration?: number;
    minLoadingTime?: number;
    maxLoadingTime?: number;
    smartDetection?: boolean;
  };
}

// Enhanced loading detector with performance monitoring
const LoadingDetector: React.FC<{
  onLoadingChange: (loading: boolean) => void;
  onMetricsUpdate: (metrics: LoadingMetrics) => void;
  smartDetection: boolean;
  minLoadingThreshold: number;
  performanceThreshold: number;
}> = ({
  onLoadingChange,
  onMetricsUpdate,
  smartDetection,
  minLoadingThreshold,
  performanceThreshold
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isInitialMount, setIsInitialMount] = useState(true);
  const navigationStartTime = useRef<number | null>(null);
  const loadingMetrics = useRef<LoadingMetrics>({
    averageLoadTime: 0,
    lastLoadTime: 0,
    loadCount: 0,
    shouldShowLoading: false,
  });

  // Performance monitoring
  const measurePerformance = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoadedTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const totalTime = Math.max(loadTime, domContentLoadedTime);

        return totalTime > 0 ? totalTime : null;
      }
    }
    return null;
  }, []);

  // Update loading metrics
  const updateMetrics = useCallback((loadTime: number) => {
    const current = loadingMetrics.current;
    const newLoadCount = current.loadCount + 1;
    const newAverageLoadTime = (current.averageLoadTime * current.loadCount + loadTime) / newLoadCount;

    const shouldShow = smartDetection
      ? loadTime > minLoadingThreshold || newAverageLoadTime > performanceThreshold
      : true;

    loadingMetrics.current = {
      averageLoadTime: newAverageLoadTime,
      lastLoadTime: loadTime,
      loadCount: newLoadCount,
      shouldShowLoading: shouldShow,
    };

    onMetricsUpdate(loadingMetrics.current);
  }, [smartDetection, minLoadingThreshold, performanceThreshold, onMetricsUpdate]);

  // Handle route changes with smart detection
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    // Start timing navigation
    navigationStartTime.current = Date.now();

    // Decide whether to show loading based on smart detection
    if (smartDetection) {
      const metrics = loadingMetrics.current;
      // Show loading if average load time suggests it's needed
      if (metrics.averageLoadTime > minLoadingThreshold || metrics.loadCount === 0) {
        onLoadingChange(true);
      }
    } else {
      // Always show loading in non-smart mode
      onLoadingChange(true);
    }

    // Simulate page load completion with performance measurement
    const completionTimer = setTimeout(() => {
      const loadTime = navigationStartTime.current
        ? Date.now() - navigationStartTime.current
        : measurePerformance() || 500;

      updateMetrics(loadTime);
      onLoadingChange(false);
    }, smartDetection ? Math.min(loadingMetrics.current.averageLoadTime || 500, 2000) : 500);

    return () => clearTimeout(completionTimer);
  }, [pathname, searchParams, onLoadingChange, isInitialMount, smartDetection, minLoadingThreshold, measurePerformance, updateMetrics]);

  return null;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  showLoadingBar = true,
  smartDetection = true,
  minLoadingThreshold = 300, // Show loading bar if page takes more than 300ms
  performanceThreshold = 500, // Consider showing loading if average load time > 500ms
  loadingBarProps = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMetrics, setLoadingMetrics] = useState<LoadingMetrics>({
    averageLoadTime: 0,
    lastLoadTime: 0,
    loadCount: 0,
    shouldShowLoading: false,
  });

  const setLoading = useCallback((loading: boolean) => {
    // In smart detection mode, respect the shouldShowLoading flag
    if (smartDetection && !loading) {
      setIsLoading(false);
    } else if (smartDetection && loading && loadingMetrics.shouldShowLoading) {
      setIsLoading(true);
    } else if (!smartDetection) {
      setIsLoading(loading);
    }
  }, [smartDetection, loadingMetrics.shouldShowLoading]);

  const startLoading = useCallback(() => {
    if (!smartDetection || loadingMetrics.shouldShowLoading) {
      setIsLoading(true);
    }
  }, [smartDetection, loadingMetrics.shouldShowLoading]);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleMetricsUpdate = useCallback((metrics: LoadingMetrics) => {
    setLoadingMetrics(metrics);
  }, []);

  // Auto-stop loading after maximum time to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const maxTime = loadingBarProps.maxLoadingTime || 8000;
      const maxLoadingTime = setTimeout(() => {
        stopLoading();
      }, maxTime);

      return () => clearTimeout(maxLoadingTime);
    }
  }, [isLoading, loadingBarProps.maxLoadingTime, stopLoading]);

  // Performance monitoring and adaptive behavior
  useEffect(() => {
    if (typeof window !== 'undefined' && smartDetection) {
      // Monitor page performance and adjust thresholds
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
            if (loadTime > 0) {
              handleMetricsUpdate({
                ...loadingMetrics,
                lastLoadTime: loadTime,
                shouldShowLoading: loadTime > minLoadingThreshold,
              });
            }
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });
      return () => observer.disconnect();
    }
  }, [smartDetection, minLoadingThreshold, loadingMetrics, handleMetricsUpdate]);

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    loadingMetrics,
  };

  // Enhanced loading bar props with smart defaults
  const defaultLoadingBarProps = {
    height: 3,
    duration: 0.8,
    minLoadingTime: minLoadingThreshold,
    maxLoadingTime: 8000,
    smartDetection,
    ...loadingBarProps,
  };

  return (
    <LoadingContext.Provider value={value}>
      <Suspense fallback={null}>
        <LoadingDetector
          onLoadingChange={setLoading}
          onMetricsUpdate={handleMetricsUpdate}
          smartDetection={smartDetection}
          minLoadingThreshold={minLoadingThreshold}
          performanceThreshold={performanceThreshold}
        />
      </Suspense>
      {showLoadingBar && (
        <LoadingBar
          isLoading={isLoading}
          {...defaultLoadingBarProps}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
};
