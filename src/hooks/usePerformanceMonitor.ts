"use client";

import { useEffect } from "react";

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
}

export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const metrics: PerformanceMetrics = {};

    // Measure First Contentful Paint
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            metrics.fcp = entry.startTime;
            console.log("FCP:", entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ["paint"] });
    };

    // Measure Largest Contentful Paint
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
        console.log("LCP:", lastEntry.startTime);
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    };

    // Measure Cumulative Layout Shift
    const measureCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        metrics.cls = clsValue;
        console.log("CLS:", clsValue);
      });
      observer.observe({ entryTypes: ["layout-shift"] });
    };

    // Measure First Input Delay
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.fid = (entry as any).processingStart - entry.startTime;
          console.log("FID:", metrics.fid);
        }
      });
      observer.observe({ entryTypes: ["first-input"] });
    };

    // Measure Time to First Byte
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        metrics.ttfb = navigation.responseStart - navigation.requestStart;
        console.log("TTFB:", metrics.ttfb);
      }
    };

    // Monitor resource loading
    const monitorResources = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          if (resource.duration > 1000) {
            // Log slow resources (>1s)
            console.warn("Slow resource:", resource.name, resource.duration);
          }
        }
      });
      observer.observe({ entryTypes: ["resource"] });
    };

    // Monitor long tasks
    const monitorLongTasks = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn("Long task detected:", entry.duration, "ms");
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    };

    // Send metrics to analytics (only in production)
    const sendMetrics = () => {
      if (process.env.NODE_ENV === "production") {
        // Send to your analytics service
        // Example: analytics.track('performance_metrics', metrics);
      }
    };

    // Initialize monitoring
    measureFCP();
    measureLCP();
    measureCLS();
    measureFID();
    measureTTFB();
    monitorResources();
    monitorLongTasks();

    // Send metrics after page load
    window.addEventListener("load", () => {
      setTimeout(sendMetrics, 5000); // Wait 5s after load
    });

    // Cleanup function
    return () => {
      // Observers are automatically cleaned up when the component unmounts
    };
  }, []);
}

// Hook for monitoring specific component performance
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 100) {
        // Log components that take >100ms to render
        console.warn(
          `Slow component render: ${componentName} took ${renderTime}ms`
        );
      }
    };
  }, [componentName]);
}
