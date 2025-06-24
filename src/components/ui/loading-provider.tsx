"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  showLoadingBar = true,
  loadingBarProps = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  // Auto-detect route changes and show loading
  useEffect(() => {
    // Don't show loading on initial page load
    if (typeof window !== 'undefined') {
      // Start loading immediately when route changes
      setIsLoading(true);

      // Stop loading after a delay to simulate page load
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // Increased duration for better visibility of the glassy effect

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

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
      {showLoadingBar && (
        <LoadingBar isLoading={isLoading} {...loadingBarProps} />
      )}
      {children}
    </LoadingContext.Provider>
  );
};
