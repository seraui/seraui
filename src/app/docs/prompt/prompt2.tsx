import React from 'react';
import { Zap, Code, FileText, Paperclip, Globe, Bell, ArrowRight } from 'lucide-react';

// Define types for component props for better type checking
interface SuggestionButtonProps {
  icon: React.ReactNode;
  text: string;
}

// New SVG Icon Component for the logo
const CoolStarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="w-16 h-16">
        <g clipPath="url(#cs_clip_1_star-8)">
            <mask id="cs_mask_1_star-8" style={{ maskType: 'alpha' }} width="200" height="200" x="0" y="0" maskUnits="userSpaceOnUse">
                <path fill="#fff" d="M100 0c12.424 62.382 37.256 87.456 100 100-62.759 12.544-87.591 37.618-100 100-12.424-62.382-37.256-87.471-100-100C62.758 87.456 87.591 62.382 100 0z"></path>
            </mask>
            <g mask="url(#cs_mask_1_star-8)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path fill="url(#paint0_linear_star-8)" fillOpacity="0.55" d="M200 0H0v200h200V0z"></path>
                <g filter="url(#filter0_f_748_star-8)">
                    <path fill="#06F" d="M213 69H93v141h120V69z"></path>
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_f_748_star-8" width="245" height="266" x="30.5" y="6.5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                <feGaussianBlur result="effect1_foregroundBlur_748_star-8" stdDeviation="31.25"></feGaussianBlur>
            </filter>
            <linearGradient id="paint0_linear_star-8" x1="162" x2="49.5" y1="38" y2="150.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF1F00"></stop>
                <stop offset="1" stopColor="#FF58E4"></stop>
            </linearGradient>
            <clipPath id="cs_clip_1_star-8">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
        </defs>
        <g style={{ mixBlendMode: 'overlay' }} mask="url(#cs_mask_1_star-8)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_star-8)"></path>
        </g>
        <defs>
            <filter id="cs_noise_1_star-8" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
                <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
                <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
        </defs>
    </svg>
);


// Reusable button component for the suggestions
const SuggestionButton: React.FC<SuggestionButtonProps> = ({ icon, text }) => (
  <button className="flex items-center justify-center bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 sm:px-4 text-sm text-gray-700 dark:text-zinc-300 transition-colors duration-200 ease-in-out">
    {icon}
    <span>{text}</span>
  </button>
);

const Prompting: React.FC = () => {
  return (
    <div className="font-sans text-gray-900 dark:text-zinc-100 bg-white dark:bg-zinc-950">
      <div className="p-4">
        <main className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">

          {/* Logo */}
          <div className="mb-6">
             <CoolStarIcon />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white">
            Unleash Your
          </h1>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-500 dark:text-zinc-400 mt-1 sm:mt-2">
            Creativity.
          </p>

          {/* Suggestion Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
            <SuggestionButton icon={<Zap className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />} text="Generate rest API" />
            <SuggestionButton icon={<Code className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />} text="Debug Python code" />
            <SuggestionButton icon={<FileText className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />} text="Explain React hooks" />
          </div>

          {/* Command Input Area */}
          <div className="w-full max-w-2xl mt-10 sm:mt-12">
            <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-2 sm:p-3">
                {/* Top part with input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type / for command"
                        className="w-full bg-transparent py-2 px-3 text-gray-800 dark:text-zinc-200 placeholder-gray-500 dark:placeholder-zinc-400 focus:outline-none text-sm"
                        aria-label="Command input"
                    />
                </div>

                {/* Bottom part with actions */}
                <div className="flex justify-between items-center mt-2">
                    {/* Left-side action buttons */}
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-zinc-400 text-sm">
                        <button className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                            <Paperclip className="h-5 w-5" strokeWidth={1.5} />
                            <span className="hidden sm:inline">Tools</span>
                        </button>
                        <button className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                            <Globe className="h-5 w-5" strokeWidth={1.5} />
                            <span className="hidden sm:inline">Search</span>
                        </button>
                    </div>

                    {/* Right-side icons */}
                    <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
                        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                            <Bell className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200">
                           <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
             {/* Footer */}
            <footer className="mt-4 text-xs text-gray-500 dark:text-zinc-400 text-center px-2">
                <p>
                Noera may make mistakes. We recommend checking important information.{' '}
                <a href="#" className="text-gray-600 dark:text-zinc-300 underline hover:text-gray-800 dark:hover:text-zinc-100">
                    Privacy Notice
                </a>
                </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Prompting;
