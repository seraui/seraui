import { useState, useEffect } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    if (!isFullscreen) {
      // Hide other page elements when entering fullscreen
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Hide common page elements
      const elementsToHide = [
        'header', 'nav', 'footer', 'aside',
        '[role="banner"]', '[role="navigation"]', '[role="contentinfo"]',
        '.header', '.navbar', '.nav', '.footer', '.sidebar'
      ];

      elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const htmlElement = element as HTMLElement;
          htmlElement.dataset.originalDisplay = htmlElement.style.display || '';
          htmlElement.style.display = 'none';
        });
      });

      // Hide main content except our React Code Runner
      const mainElements = document.querySelectorAll('main > *:not([class*="react-code-runner"])');
      mainElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.dataset.originalDisplay = htmlElement.style.display || '';
        htmlElement.style.display = 'none';
      });

    } else {
      // Restore other page elements when exiting fullscreen
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      // Restore all hidden elements
      const hiddenElements = document.querySelectorAll('[data-original-display]');
      hiddenElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.display = htmlElement.dataset.originalDisplay || '';
        delete htmlElement.dataset.originalDisplay;
      });
    }
  };

  // Handle escape key and cleanup
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function to restore page elements if component unmounts while in fullscreen
    return () => {
      document.removeEventListener('keydown', handleEscape);

      if (isFullscreen) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        // Restore all hidden elements
        const hiddenElements = document.querySelectorAll('[data-original-display]');
        hiddenElements.forEach(element => {
          const htmlElement = element as HTMLElement;
          htmlElement.style.display = htmlElement.dataset.originalDisplay || '';
          delete htmlElement.dataset.originalDisplay;
        });
      }
    };
  }, [isFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen
  };
};
