"use client"
import React from 'react';

// --- SVG Icon Components ---
// These are the icon components for the social media links in the footer.
// They are self-contained, so no external libraries are needed.

const LinkedInIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-23.3 2.6-57.5 0 0 21.9-7 72.1 25.6 20.9-6.2 43.6-9.4 66.3-9.4 22.7 0 45.4 3.1 66.3 9.4 50.2-32.6 72.1-25.6 72.1-25.6 13.7 34.2 5.2 51 2.6 57.5 16 17.6 23.6 31.4 23.6 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const CustomIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M 9.3769531 4.0039062 C 8.5089531 4.0039062 6.1811406 4.3226094 5.2441406 4.5996094 C 4.3761406 4.8556094 3.6552344 5.4479531 3.2402344 6.2519531 C 2.3502344 7.9739531 0.997 11.501531 1 17.019531 C 2.067 18.340531 5.7198125 20 8.0078125 20 L 9 18.65625 C 9 18.65625 10.653 19.019531 12 19.019531 L 12.013672 19.019531 C 13.360672 19.019531 15.013672 18.65625 15.013672 18.65625 L 16 20 C 17 20 20.494672 19.461531 23.013672 17.019531 C 23.016672 11.501531 21.663438 7.9729531 20.773438 6.2519531 C 20.358438 5.4489531 19.636531 4.8556094 18.769531 4.5996094 C 17.339531 4.1056094 14.521484 4.0039063 14.521484 4.0039062 L 14.001953 5.1425781 C 14.001953 5.1425781 12.672 5 12 5 C 11.329 5 10.013672 5.1425781 10.013672 5.1425781 L 9.3769531 4.0039062 z M 8.1972656 6.0078125 C 8.4792656 6.7598125 8.8789062 7.1464844 8.8789062 7.1464844 C 8.8789062 7.1464844 11.597672 6.9882813 12.013672 6.9882812 C 12.415672 6.9882812 15.158203 7.1464844 15.158203 7.1464844 C 15.158203 7.1464844 15.534406 6.7598125 15.816406 6.0078125 C 16.113406 6.0248125 16.833125 6.1125781 18.203125 6.5175781 C 18.550125 6.6205781 18.832094 6.8509219 18.996094 7.1699219 C 19.684094 8.5009219 20.858 11.424547 21 16.060547 C 21.001 16.101547 20.979359 16.146781 20.943359 16.175781 C 19.737359 17.143781 18.380313 17.748609 16.945312 17.974609 L 16.869141 17.853516 C 17.770624 17.449485 18.400391 17.080078 18.400391 17.080078 L 17.349609 15.376953 C 17.349609 15.376953 14.606222 17 12 17 C 9.3937778 17 6.6503906 15.376953 6.6503906 15.376953 L 5.5996094 17.080078 C 5.5996094 17.080078 6.2328457 17.451408 7.140625 17.857422 L 7.0703125 17.972656 C 5.6123125 17.740656 4.2663125 17.136781 3.0703125 16.175781 C 3.0343125 16.146781 3.0126719 16.1035 3.0136719 16.0625 C 3.1556719 11.4255 4.3295781 8.5009219 5.0175781 7.1699219 C 5.1815781 6.8519219 5.4635469 6.6205781 5.8105469 6.5175781 C 7.1805469 6.1135781 7.9012656 6.0258125 8.1972656 6.0078125 z M 8.5 10 A 1.5 2 0 0 0 8.5 14 A 1.5 2 0 0 0 8.5 10 z M 15.5 10 A 1.5 2 0 0 0 15.5 14 A 1.5 2 0 0 0 15.5 10 z"></path>
    </svg>
);

// Main App component that renders the portfolio
export default function Portfolio2Page() {
  return <Portfolio2 />;
}

const userImage = 'https://i.pinimg.com/736x/3c/a0/23/3ca023b594a47949e4664190d0c30e1a.jpg'; 

// The main portfolio component, now fully responsive with light/dark mode support.
const Portfolio2 = () => {
  return (
    <div className="flex items-center justify-center font-sans bg-gray-50 dark:bg-black">
      <div className="bg-white dark:bg-black rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-5xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
        
        {/* Main Content (Hero Section) */}
        <main className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 py-10">
          
          {/* Left Side: Text Content */}
          <div className="text-center md:text-left md:w-1/2 z-10 order-2 md:order-1">
            {/* Font sizes now scale better from mobile to desktop */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight">
              Crafting Digital <br />
              <span className="text-black dark:text-white">Experiences</span>
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
              A passionate Web Designer creating modern, responsive, and user-friendly websites.
            </p>
            <button className="mt-8 bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-10 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Let&apos;s Talk
            </button>
          </div>

          {/* Right Side: Image with Blob Shape */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 order-1 md:order-2">
            {/* The blob shape adapts to light/dark mode */}
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full">
              <path fill="currentColor" className="text-black dark:text-white" d="M48.8,-63.9C62.9,-54.2,73.8,-40.1,78.2,-24.5C82.6,-8.9,80.5,8.2,74.5,23.6C68.5,39,58.6,52.7,45.5,62.3C32.4,71.9,16.2,77.4,-1.8,78.8C-19.8,80.2,-39.6,77.5,-53.4,67.7C-67.2,57.9,-75,41,-76.8,24.2C-78.5,7.4,-74.2,-9.3,-66.5,-23.7C-58.8,-38.1,-47.7,-50.3,-34.9,-60.1C-22.1,-69.9,-7.6,-77.4,7.9,-78.9C23.4,-80.4,46.8,-75.9,48.8,-63.9Z" transform="translate(100 100)" />
            </svg>
            {/* The image is clipped to a similar path */}
            <div className="w-full h-full">
              <img
                src={userImage}
                alt="Aesthetic scenery in grayscale"
                className="absolute w-full h-full object-cover grayscale dark:brightness-90" // Added grayscale filter and dark mode brightness adjustment
                style={{ clipPath: 'url(#blob-clip)' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src='https://placehold.co/400x400/000000/FFFFFF?text=Image';
                }}
              />
            </div>
            {/* Defining the SVG clip-path. It's hidden but used by the style attribute */}
            <svg width="0" height="0">
              <defs>
                <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0.244,-0.32C0.315,-0.271,0.369,-0.2,0.391,-0.122C0.413,-0.045,0.402,0.041,0.373,0.118C0.343,0.195,0.293,0.263,0.227,0.312C0.162,0.359,0.081,0.387,-0.009,0.394C-0.099,0.401,-0.198,0.387,-0.267,0.339C-0.336,0.289,-0.375,0.205,-0.384,0.121C-0.393,0.037,-0.371,-0.047,-0.333,-0.119C-0.294,-0.191,-0.239,-0.251,-0.175,-0.3C-0.111,-0.35,-0.038,-0.387,0.04,-0.395C0.117,-0.402,0.234,-0.38,0.244,-0.32Z" transform="matrix(2.5, 0, 0, 2.5, 0.5, 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </div>

        </main>

        {/* Social Links Footer - Now fully responsive with dark mode support */}
        <footer className="flex justify-center pt-8 pb-4 md:p-0 md:justify-start md:absolute md:bottom-8 md:left-8 lg:bottom-12 lg:left-12">
            <div className="flex space-x-5 md:space-x-6 text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors"><LinkedInIcon /></a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors"><GithubIcon /></a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors"><CustomIcon /></a>
            </div>
        </footer>

      </div>
    </div>
  );
};
