"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }

    // In production, you could send to analytics
    // analytics.track('Web Vital', {
    //   name: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    // });
  });

  return null;
}
