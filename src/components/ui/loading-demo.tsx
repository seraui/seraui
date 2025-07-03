"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useSmartLoading, useComponentLoading } from "./use-smart-loading";
import { useLoading } from "./loading-provider";

interface LoadingDemoProps {
  className?: string;
}

export const LoadingDemo: React.FC<LoadingDemoProps> = ({ className = "" }) => {
  const { loadingMetrics } = useLoading();
  const smartLoading = useSmartLoading({
    minDuration: 500,
    threshold: 300,
    autoDetect: true,
  });
  
  const componentLoading = useComponentLoading("LoadingDemo", {
    minDuration: 200,
    threshold: 150,
  });

  const [demoResults, setDemoResults] = useState<string[]>([]);

  // Simulate fast operation (< 300ms)
  const simulateFastOperation = async () => {
    await smartLoading.withSmartLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
      setDemoResults(prev => [...prev, `Fast operation completed in ~150ms - Loading bar ${smartLoading.isLoadingRecommended ? 'was' : 'was not'} shown`]);
    });
  };

  // Simulate medium operation (300-1000ms)
  const simulateMediumOperation = async () => {
    await smartLoading.withSmartLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setDemoResults(prev => [...prev, `Medium operation completed in ~600ms - Loading bar was shown`]);
    });
  };

  // Simulate slow operation (> 1000ms)
  const simulateSlowOperation = async () => {
    await smartLoading.withSmartLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDemoResults(prev => [...prev, `Slow operation completed in ~2000ms - Loading bar was shown`]);
    });
  };

  // Simulate variable operation based on performance
  const simulateAdaptiveOperation = async () => {
    const expectedTime = smartLoading.averageLoadTime || 500;
    await smartLoading.withSmartLoading(async () => {
      // Simulate operation that takes time based on historical performance
      const actualTime = Math.max(100, expectedTime + (Math.random() - 0.5) * 200);
      await new Promise(resolve => setTimeout(resolve, actualTime));
      setDemoResults(prev => [...prev, `Adaptive operation completed in ~${Math.round(actualTime)}ms - Based on average load time of ${Math.round(expectedTime)}ms`]);
    });
  };

  const clearResults = () => {
    setDemoResults([]);
  };

  return (
    <div className={`space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Dynamic Loading Bar Demo
        </h3>
        
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p>This demo shows how the loading bar intelligently decides when to appear based on operation duration and performance metrics.</p>
        </div>

        {/* Performance Metrics Display */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(loadingMetrics.averageLoadTime)}ms
            </div>
            <div className="text-xs text-zinc-500">Avg Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(loadingMetrics.lastLoadTime)}ms
            </div>
            <div className="text-xs text-zinc-500">Last Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {loadingMetrics.loadCount}
            </div>
            <div className="text-xs text-zinc-500">Load Count</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${loadingMetrics.shouldShowLoading ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {loadingMetrics.shouldShowLoading ? 'YES' : 'NO'}
            </div>
            <div className="text-xs text-zinc-500">Show Loading</div>
          </div>
        </motion.div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={simulateFastOperation}
            disabled={smartLoading.loadingState.isLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Fast Operation
            <div className="text-xs opacity-75">~150ms</div>
          </button>
          
          <button
            onClick={simulateMediumOperation}
            disabled={smartLoading.loadingState.isLoading}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Medium Operation
            <div className="text-xs opacity-75">~600ms</div>
          </button>
          
          <button
            onClick={simulateSlowOperation}
            disabled={smartLoading.loadingState.isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Slow Operation
            <div className="text-xs opacity-75">~2000ms</div>
          </button>
          
          <button
            onClick={simulateAdaptiveOperation}
            disabled={smartLoading.loadingState.isLoading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Adaptive Operation
            <div className="text-xs opacity-75">Based on metrics</div>
          </button>
        </div>

        {/* Clear Results Button */}
        {demoResults.length > 0 && (
          <button
            onClick={clearResults}
            className="px-3 py-1 text-sm bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded transition-colors"
          >
            Clear Results
          </button>
        )}

        {/* Results Display */}
        {demoResults.length > 0 && (
          <motion.div 
            className="space-y-2 max-h-64 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Results:</h4>
            {demoResults.map((result, index) => (
              <motion.div
                key={index}
                className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {result}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Current Loading State */}
        {smartLoading.loadingState.isLoading && (
          <motion.div 
            className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-blue-800 dark:text-blue-200 text-sm font-medium">
              Operation in progress...
            </div>
            <div className="text-blue-600 dark:text-blue-400 text-xs">
              Duration: {smartLoading.loadingState.duration}ms | 
              Should show: {smartLoading.loadingState.shouldShow ? 'Yes' : 'No'}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
          <p>• <strong>Fast operations</strong> (&lt;300ms) typically won't show the loading bar</p>
          <p>• <strong>Medium/Slow operations</strong> will show the loading bar</p>
          <p>• <strong>Adaptive operations</strong> decide based on your historical performance</p>
          <p>• The system learns from your usage patterns to optimize the experience</p>
        </div>
      </div>
    </div>
  );
};
