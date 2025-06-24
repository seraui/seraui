"use client";

import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingBar } from "./loading-bar";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
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
  loadingBarProps?: {
    color?: string;
    height?: number;
    duration?: number;
  };
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
const LoadingDetector: React.FC<{
  onLoadingChange: (loading: boolean) => void;
}> = ({ onLoadingChange }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track if this is the initial mount
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Auto-detect route changes and stop loading
  useEffect(() => {
    if (isInitialMount) {
      // Mark that initial mount is complete
      setIsInitialMount(false);
      return;
    }

    // Route has changed, stop loading after a short delay to simulate page load completion
    const timer = setTimeout(() => {
      onLoadingChange(false);
    }, 300); // Short delay to show completion

    return () => clearTimeout(timer);
  }, [pathname, searchParams, onLoadingChange, isInitialMount]);

  return null;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  showLoadingBar = true,
  loadingBarProps = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  // Auto-stop loading after a maximum time to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const maxLoadingTime = setTimeout(() => {
        stopLoading();
      }, 5000); // 5 seconds max

      return () => clearTimeout(maxLoadingTime);
    }
  }, [isLoading]);

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      <Suspense fallback={null}>
        <LoadingDetector onLoadingChange={setLoading} />
      </Suspense>
      {showLoadingBar && (
        <LoadingBar isLoading={isLoading} {...loadingBarProps} />
      )}
      {children}
    </LoadingContext.Provider>
  );
};
