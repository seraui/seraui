"use client";

import React, { useState } from 'react';
import { LoadingWrapper, LoadingButton, SuspenseLoadingWrapper } from '@/components/ui/loading-wrapper';
import { useAsyncComponentLoading } from '@/hooks/use-component-loading';

// Sample components to demonstrate loading
const SampleCard = ({ title, content }: { title: string; content: string }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{content}</p>
  </div>
);

const ComplexComponent = () => {
  const [data, setData] = useState<string[]>([]);
  
  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    }, 500);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Complex Component</h3>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-blue-800 dark:text-blue-200">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function ComponentLoadingDemo() {
  const { withComponentLoading } = useAsyncComponentLoading({
    minLoadingTime: 600,
    simulateProgress: true,
  });

  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [asyncData, setAsyncData] = useState<string | null>(null);

  const loadAsyncData = async () => {
    const result = await withComponentLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return "Data loaded successfully!";
    }, 'async-data-load');
    
    setAsyncData(result);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Component Loading Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Click on components to see the loading bar in action
        </p>
      </div>

      {/* Click to Load Components */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Click to Load Components
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadingWrapper
            triggerOnClick
            loadingId="card-1"
            minLoadingTime={500}
            className="h-full"
          >
            <SampleCard
              title="Card 1"
              content="This card was loaded with the loading bar showing!"
            />
          </LoadingWrapper>

          <LoadingWrapper
            triggerOnClick
            loadingId="card-2"
            minLoadingTime={700}
            className="h-full"
            fallback={
              <div className="p-6 border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-lg text-center">
                <div className="text-purple-600 dark:text-purple-400 font-medium">
                  🎯 Click to load Card 2
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Custom loading placeholder
                </div>
              </div>
            }
          >
            <SampleCard
              title="Card 2"
              content="This card has a custom loading placeholder and longer loading time!"
            />
          </LoadingWrapper>
        </div>
      </div>

      {/* Button Loading */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Button with Loading
        </h3>
        
        <div className="flex gap-4">
          <LoadingButton
            onClick={loadAsyncData}
            loadingId="async-button"
            minLoadingTime={800}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Load Async Data
          </LoadingButton>
          
          {asyncData && (
            <div className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
              ✅ {asyncData}
            </div>
          )}
        </div>
      </div>

      {/* Suspense Loading */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Suspense-based Loading
        </h3>
        
        <SuspenseLoadingWrapper
          loadingId="suspense-component"
          minLoadingTime={600}
          fallback={
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Loading complex component...</span>
              </div>
            </div>
          }
        >
          <ComplexComponent />
        </SuspenseLoadingWrapper>
      </div>

      {/* Auto-load on Mount */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Auto-load on Mount
        </h3>
        
        <LoadingWrapper
          triggerOnMount
          loadingId="auto-load"
          minLoadingTime={400}
        >
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Auto-loaded Component
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              This component automatically triggered the loading bar when it mounted.
            </p>
          </div>
        </LoadingWrapper>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          How to Use
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p><strong>LoadingWrapper:</strong> Wrap any component to show loading on click or mount</p>
          <p><strong>LoadingButton:</strong> Button that shows loading bar during async operations</p>
          <p><strong>SuspenseLoadingWrapper:</strong> Use with React Suspense for automatic loading</p>
          <p><strong>useComponentLoading:</strong> Hook for manual loading control</p>
          <p><strong>useAsyncComponentLoading:</strong> Hook for wrapping async operations</p>
        </div>
      </div>
    </div>
  );
}
