"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const metrics: Record<string, number> = {};

    // Measure First Contentful Paint
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            metrics.fcp = entry.startTime;
            if (process.env.NODE_ENV === "development") {
              console.log("FCP:", entry.startTime);
            }
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
        if (process.env.NODE_ENV === "development") {
          console.log("LCP:", lastEntry.startTime);
        }
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
        if (process.env.NODE_ENV === "development") {
          console.log("CLS:", clsValue);
        }
      });
      observer.observe({ entryTypes: ["layout-shift"] });
    };

    // Measure First Input Delay
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.fid = (entry as any).processingStart - entry.startTime;
          if (process.env.NODE_ENV === "development") {
            console.log("FID:", metrics.fid);
          }
        }
      });
      observer.observe({ entryTypes: ["first-input"] });
    };

    // Monitor resource loading
    const monitorResources = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          if (resource.duration > 1000) {
            // Log slow resources (>1s)
            if (process.env.NODE_ENV === "development") {
              console.warn("Slow resource:", resource.name, resource.duration);
            }
          }
        }
      });
      observer.observe({ entryTypes: ["resource"] });
    };

    // Monitor long tasks
    const monitorLongTasks = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === "development") {
            console.warn("Long task detected:", entry.duration, "ms");
          }
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    };

    // Send metrics to analytics (only in production)
    const sendMetrics = () => {
      if (process.env.NODE_ENV === "production" && window.gtag) {
        // Send Core Web Vitals to Google Analytics
        window.gtag("event", "web_vitals", {
          event_category: "Performance",
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          fid: metrics.fid,
        });
      }
    };

    // Initialize monitoring
    try {
      measureFCP();
      measureLCP();
      measureCLS();
      measureFID();
      monitorResources();
      monitorLongTasks();
    } catch (error) {
      console.error("Performance monitoring error:", error);
    }

    // Send metrics after page load
    const handleLoad = () => {
      setTimeout(sendMetrics, 5000); // Wait 5s after load
    };

    window.addEventListener("load", handleLoad);

    // Cleanup function
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null; // This component doesn't render anything
}

export default PerformanceMonitor;
