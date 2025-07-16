'use client'
import React from 'react'

export default function Header3() {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Effect to handle body scroll lock when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset scroll on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="relative w-full z-50">
      <div className="flex items-center justify-between py-4 px-4 sm:px-8 w-full bg-white dark:bg-black">
        {/* Desktop Navigation (Left) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400 flex-1">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Products ▾</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Community</a>
        </nav>

        {/* Mobile Menu Toggle (Hamburger/Close Icon) */}
        <div className="md:hidden flex-1">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen} className="text-black dark:text-white">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="#" aria-label="Company Logo">
            <div className="w-8 h-8 bg-white dark:bg-black border-2 border-black dark:border-white rounded-full"></div>
          </a>
        </div>

        {/* Desktop Navigation (Right) */}
        <nav className="hidden md:flex items-center justify-end gap-6 text-sm flex-1">
          <a href="#" className="font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Help</a>
          <a href="#" className="font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Sign In</a>
          <a href="#" className="px-4 py-2 text-sm font-semibold border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            Sign Up
          </a>
        </nav>

        {/* Sign Up button visible on mobile (Right side) */}
        <div className="md:hidden flex-1 flex justify-end">
          <a href="#" className="px-4 py-2 text-sm font-semibold border-2 border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            Sign Up
          </a>
        </div>
      </div>

      {/* Mobile Menu (Fullscreen Overlay) */}
      <div className={`md:hidden fixed inset-0 bg-white dark:bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform-none' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <a href="#" aria-label="Company Logo">
            <div className="w-8 h-8 bg-white dark:bg-black border-2 border-black dark:border-white rounded-full"></div>
          </a>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-black dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-16 gap-8 text-xl text-gray-800 dark:text-gray-200 font-medium">
          <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Products</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Pricing</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Community</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Help</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors">Sign In</a>
        </nav>
      </div>
    </header>
  );
}
