'use client'

import { useEffect } from 'react'

// Performance optimization component for better Core Web Vitals
export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      fontLink.as = 'style'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // Preload critical images
      const criticalImages = ['/logo.svg', '/og-image.png']
      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = src
        link.as = 'image'
        document.head.appendChild(link)
      })
    }

    // Optimize images with Intersection Observer
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]')
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src!
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach(img => imageObserver.observe(img))
    }

    // Reduce layout shifts
    const reduceLayoutShifts = () => {
      // Add aspect ratio containers for images
      const images = document.querySelectorAll('img:not([width]):not([height])')
      images.forEach(img => {
        const container = document.createElement('div')
        container.style.aspectRatio = '16/9'
        container.style.overflow = 'hidden'
        img.parentNode?.insertBefore(container, img)
        container.appendChild(img)
      })
    }

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Delay non-critical scripts
      const scripts = document.querySelectorAll('script[data-delay]')
      scripts.forEach(script => {
        setTimeout(() => {
          const newScript = document.createElement('script')
          newScript.src = script.getAttribute('data-delay')!
          newScript.async = true
          document.head.appendChild(newScript)
        }, 3000) // Delay by 3 seconds
      })
    }

    // Service Worker registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js')
          console.log('Service Worker registered successfully')
        } catch (error) {
          console.log('Service Worker registration failed:', error)
        }
      }
    }

    // Execute optimizations
    preloadCriticalResources()
    optimizeImages()
    reduceLayoutShifts()
    optimizeThirdPartyScripts()
    registerServiceWorker()

    // Monitor performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log(`${entry.name}: ${entry.startTime}ms`)
        }
      }
    })

    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

export default PerformanceOptimizer