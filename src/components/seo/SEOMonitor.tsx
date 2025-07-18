'use client'

import { useEffect, useState } from 'react'

interface SEOMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timeToInteractive: number
}

// SEO monitoring component for tracking Core Web Vitals and performance
export function SEOMonitor() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or for admin users
    const shouldShow = process.env.NODE_ENV === 'development' || 
                      localStorage.getItem('sera-ui-admin') === 'true'
    setIsVisible(shouldShow)

    if (!shouldShow) return

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      const newMetrics: SEOMetrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
        timeToInteractive: navigation.domInteractive - navigation.fetchStart
      }

      // Collect LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        newMetrics.largestContentfulPaint = lastEntry.startTime
        setMetrics({...newMetrics})
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // Collect CLS
      let clsValue = 0
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            clsValue += clsEntry.value
          }
        }
        newMetrics.cumulativeLayoutShift = clsValue
        setMetrics({...newMetrics})
      }).observe({ entryTypes: ['layout-shift'] })

      // Collect FID
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as PerformanceEntry & { processingStart?: number }
          if (fidEntry.processingStart) {
            const fid = fidEntry.processingStart - entry.startTime
            newMetrics.firstInputDelay = fid
            setMetrics({...newMetrics})
          }
        }
      }).observe({ entryTypes: ['first-input'] })

      setMetrics(newMetrics)
    }

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics()
    } else {
      window.addEventListener('load', collectMetrics)
    }

    return () => {
      window.removeEventListener('load', collectMetrics)
    }
  }, [])

  if (!isVisible || !metrics) return null

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600'
    if (value <= thresholds[1]) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatTime = (time: number) => `${Math.round(time)}ms`
  const formatCLS = (cls: number) => (cls * 1000).toFixed(0)

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
        SEO Metrics
      </h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getScoreColor(metrics.firstContentfulPaint, [1800, 3000])}>
            {formatTime(metrics.firstContentfulPaint)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getScoreColor(metrics.largestContentfulPaint, [2500, 4000])}>
            {formatTime(metrics.largestContentfulPaint)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getScoreColor(metrics.cumulativeLayoutShift * 1000, [100, 250])}>
            {formatCLS(metrics.cumulativeLayoutShift)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getScoreColor(metrics.firstInputDelay, [100, 300])}>
            {formatTime(metrics.firstInputDelay)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>TTI:</span>
          <span className={getScoreColor(metrics.timeToInteractive, [3800, 7300])}>
            {formatTime(metrics.timeToInteractive)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          Core Web Vitals Status
        </div>
        <div className="flex space-x-2 mt-1">
          <div className={`w-2 h-2 rounded-full ${
            metrics.largestContentfulPaint <= 2500 ? 'bg-green-500' : 
            metrics.largestContentfulPaint <= 4000 ? 'bg-yellow-500' : 'bg-red-500'
          }`} title="LCP" />
          <div className={`w-2 h-2 rounded-full ${
            metrics.firstInputDelay <= 100 ? 'bg-green-500' : 
            metrics.firstInputDelay <= 300 ? 'bg-yellow-500' : 'bg-red-500'
          }`} title="FID" />
          <div className={`w-2 h-2 rounded-full ${
            metrics.cumulativeLayoutShift <= 0.1 ? 'bg-green-500' : 
            metrics.cumulativeLayoutShift <= 0.25 ? 'bg-yellow-500' : 'bg-red-500'
          }`} title="CLS" />
        </div>
      </div>
    </div>
  )
}

export default SEOMonitor