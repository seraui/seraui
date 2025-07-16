"use client";

import { useEffect, useCallback, useRef } from 'react';
import { useLoadingBar } from '@/contexts/loading-bar-context';

interface NetworkRequestOptions {
  id?: string;
  showLoading?: boolean;
  minLoadingTime?: number;
}

// Global request counter for automatic loading detection
let globalRequestCount = 0;
const activeRequests = new Set<string>();

export function useNetworkLoading() {
  const { startLoading, finishLoading, setGlobalLoading } = useLoadingBar();
  const requestsRef = useRef<Map<string, string>>(new Map());

  // Monitor global request count
  useEffect(() => {
    const checkGlobalLoading = () => {
      setGlobalLoading(activeRequests.size > 0);
    };

    // Check initially
    checkGlobalLoading();

    // Set up periodic check (in case of missed cleanup)
    const interval = setInterval(checkGlobalLoading, 1000);
    return () => clearInterval(interval);
  }, [setGlobalLoading]);

  // Wrapper for fetch requests
  const fetchWithLoading = useCallback(async <T = any>(
    input: RequestInfo | URL,
    init?: RequestInit,
    options: NetworkRequestOptions = {}
  ): Promise<T> => {
    const requestId = options.id || `fetch-${++globalRequestCount}`;
    const { showLoading = true, minLoadingTime = 0 } = options;

    let loadingId: string | null = null;
    const startTime = Date.now();

    try {
      // Start loading if enabled
      if (showLoading) {
        loadingId = startLoading(requestId);
        requestsRef.current.set(requestId, loadingId);
      }

      // Add to active requests for global monitoring
      activeRequests.add(requestId);

      // Make the actual request
      const response = await fetch(input, init);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure minimum loading time for better UX
      if (minLoadingTime > 0) {
        const elapsed = Date.now() - startTime;
        if (elapsed < minLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsed));
        }
      }

      return data;
    } finally {
      // Clean up
      activeRequests.delete(requestId);
      
      if (loadingId) {
        finishLoading(loadingId);
        requestsRef.current.delete(requestId);
      }
    }
  }, [startLoading, finishLoading]);

  // Wrapper for any async operation
  const withLoading = useCallback(async <T>(
    operation: () => Promise<T>,
    options: NetworkRequestOptions = {}
  ): Promise<T> => {
    const requestId = options.id || `async-${++globalRequestCount}`;
    const { showLoading = true, minLoadingTime = 0 } = options;

    let loadingId: string | null = null;
    const startTime = Date.now();

    try {
      if (showLoading) {
        loadingId = startLoading(requestId);
        requestsRef.current.set(requestId, loadingId);
      }

      activeRequests.add(requestId);

      const result = await operation();

      // Ensure minimum loading time
      if (minLoadingTime > 0) {
        const elapsed = Date.now() - startTime;
        if (elapsed < minLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsed));
        }
      }

      return result;
    } finally {
      activeRequests.delete(requestId);
      
      if (loadingId) {
        finishLoading(loadingId);
        requestsRef.current.delete(requestId);
      }
    }
  }, [startLoading, finishLoading]);

  // Manual request tracking
  const trackRequest = useCallback((requestId: string) => {
    const loadingId = startLoading(requestId);
    requestsRef.current.set(requestId, loadingId);
    activeRequests.add(requestId);

    return () => {
      activeRequests.delete(requestId);
      finishLoading(loadingId);
      requestsRef.current.delete(requestId);
    };
  }, [startLoading, finishLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up any remaining requests
      requestsRef.current.forEach((loadingId, requestId) => {
        activeRequests.delete(requestId);
        finishLoading(loadingId);
      });
      requestsRef.current.clear();
    };
  }, [finishLoading]);

  return {
    fetchWithLoading,
    withLoading,
    trackRequest,
    activeRequestCount: activeRequests.size,
  };
}

// Global fetch interceptor (optional - for automatic detection)
export function setupGlobalFetchInterceptor() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const requestId = `global-fetch-${++globalRequestCount}`;
    activeRequests.add(requestId);

    try {
      const response = await originalFetch(input, init);
      return response;
    } finally {
      activeRequests.delete(requestId);
    }
  };
}

// Hook for monitoring online/offline status
export function useConnectionStatus() {
  const { setGlobalLoading } = useLoadingBar();

  useEffect(() => {
    const handleOnline = () => {
      // Optionally show loading when coming back online
      // setGlobalLoading(false);
    };

    const handleOffline = () => {
      // Optionally show loading when going offline
      // setGlobalLoading(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setGlobalLoading]);

  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  };
}
