"use client";

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useComponentLoading } from '@/hooks/use-component-loading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  loadingId?: string;
  minLoadingTime?: number;
  simulateProgress?: boolean;
  triggerOnMount?: boolean;
  triggerOnClick?: boolean;
  className?: string;
  fallback?: React.ReactNode;
}

export function LoadingWrapper({
  children,
  loadingId,
  minLoadingTime = 300,
  simulateProgress = true,
  triggerOnMount = false,
  triggerOnClick = false,
  className,
  fallback,
}: LoadingWrapperProps) {
  const [isVisible, setIsVisible] = useState(!triggerOnMount && !triggerOnClick);
  const [hasTriggered, setHasTriggered] = useState(false);
  const mountedRef = useRef(false);
  
  const { startComponentLoading, finishComponentLoading } = useComponentLoading({
    loadingId,
    minLoadingTime,
    simulateProgress,
  });

  // Handle mount loading
  useEffect(() => {
    if (triggerOnMount && !mountedRef.current) {
      mountedRef.current = true;
      handleLoadComponent();
    }
  }, [triggerOnMount]);

  const handleLoadComponent = async () => {
    if (hasTriggered) return;
    
    setHasTriggered(true);
    const cleanup = startComponentLoading();
    
    // Simulate component loading time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setIsVisible(true);
    
    // Wait for component to "render"
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await finishComponentLoading();
    cleanup();
  };

  const handleClick = () => {
    if (triggerOnClick && !hasTriggered) {
      handleLoadComponent();
    }
  };

  if (triggerOnClick && !isVisible) {
    return (
      <div 
        className={className}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {fallback || (
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400">Click to load component</span>
          </div>
        )}
      </div>
    );
  }

  if (!isVisible) {
    return fallback || null;
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Higher-order component version
export function withComponentLoading<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<LoadingWrapperProps, 'children'> = {}
) {
  return function WrappedComponent(props: P) {
    return (
      <LoadingWrapper {...options}>
        <Component {...props} />
      </LoadingWrapper>
    );
  };
}

// Suspense-based loading wrapper
export function SuspenseLoadingWrapper({
  children,
  loadingId,
  minLoadingTime = 300,
  simulateProgress = true,
  fallback,
}: Omit<LoadingWrapperProps, 'triggerOnMount' | 'triggerOnClick'>) {
  const { startComponentLoading, finishComponentLoading } = useComponentLoading({
    loadingId,
    minLoadingTime,
    simulateProgress,
  });

  const LoadingFallback = () => {
    useEffect(() => {
      const cleanup = startComponentLoading();
      return cleanup;
    }, []);

    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
      </div>
    );
  };

  const ComponentWrapper = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      // Component has loaded, finish loading
      const timer = setTimeout(() => {
        finishComponentLoading();
      }, 100);

      return () => clearTimeout(timer);
    }, []);

    return <>{children}</>;
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ComponentWrapper>
        {children}
      </ComponentWrapper>
    </Suspense>
  );
}

// Click-to-load button component
export function LoadingButton({
  children,
  onClick,
  loadingId,
  minLoadingTime = 500,
  simulateProgress = true,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  loadingId?: string;
  minLoadingTime?: number;
  simulateProgress?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { startComponentLoading, finishComponentLoading, isComponentLoading } = useComponentLoading({
    loadingId,
    minLoadingTime,
    simulateProgress,
  });

  const handleClick = async () => {
    const cleanup = startComponentLoading();
    
    try {
      if (onClick) {
        await Promise.resolve(onClick());
      }
      await finishComponentLoading();
    } catch (error) {
      await finishComponentLoading();
      throw error;
    } finally {
      cleanup();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isComponentLoading}
      className={`${className} ${isComponentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
