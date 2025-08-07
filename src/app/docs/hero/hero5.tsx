"use client"
import React, { useState, useEffect } from 'react';

// --- SVG ICONS (Original Logos) ---
const HtmlIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path fill="#E34F26" d="M71 460L30 0h451l-41 460-185 52z" />
        <path fill="#F16529" d="M256 472l149-41 35-391H256z" />
        <path fill="#EBEBEB" d="M256 208h-75l-5-58h80V94H94l12 133h150v-56zm-83 149l-4-47h-60l8 90 119 33v-58l-63-18z" />
        <path fill="#FFF" d="M256 208v56h69l-7 74-62 18v58l119-33 13-148h-5l-6-65H256V94h158l-4 56h-79v58z" />
    </svg>
);

const ReactIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <title>React Logo</title>
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

const VueIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221">
        <path fill="#41B883" d="M204.8,0H256L128,220.8L0,0h97.92L128,51.2L157.44,0H204.8z" />
        <path fill="#35495E" d="M0,0l128,220.8L256,0h-51.2L128,132.48L51.2,0H0z" />
    </svg>
);

const SvelteIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title>file_type_svelte</title>
        <path d="M26.47,5.7A8.973,8.973,0,0,0,14.677,3.246L7.96,7.4a7.461,7.461,0,0,0-3.481,5.009,7.686,7.686,0,0,0,.8,5.058,7.358,7.358,0,0,0-1.151,2.8,7.789,7.789,0,0,0,1.4,6.028,8.977,8.977,0,0,0,11.794,2.458L24.04,24.6a7.468,7.468,0,0,0,3.481-5.009,7.673,7.673,0,0,0-.8-5.062,7.348,7.348,0,0,0,1.152-2.8A7.785,7.785,0,0,0,26.47,5.7" fill="#ff3e00" />
        <path d="M14.022,26.64A5.413,5.413,0,0,1,8.3,24.581a4.678,4.678,0,0,1-.848-3.625,4.307,4.307,0,0,1,.159-.61l.127-.375.344.238a8.76,8.76,0,0,0,2.628,1.274l.245.073-.025.237a1.441,1.441,0,0,0,.271.968,1.63,1.63,0,0,0,1.743.636,1.512,1.512,0,0,0,.411-.175l6.7-4.154a1.366,1.366,0,0,0,.633-.909,1.407,1.407,0,0,0-.244-1.091,1.634,1.634,0,0,0-1.726-.622,1.509,1.509,0,0,0-.413.176l-2.572,1.584a4.934,4.934,0,0,1-1.364.582,5.415,5.415,0,0,1-5.727-2.06A4.678,4.678,0,0,1,7.811,13.1A4.507,4.507,0,0,1,9.9,10.09l6.708-4.154a4.932,4.932,0,0,1,1.364-.581A5.413,5.413,0,0,1,23.7,7.414a4.679,4.679,0,0,1,.848,3.625,4.272,4.272,0,0,1-.159.61l-.127.375-.344-.237a8.713,8.713,0,0,0-2.628-1.274l-.245-.074.025-.237a1.438,1.438,0,0,0-.272-.968,1.629,1.629,0,0,0-1.725-.622,1.484,1.484,0,0,0-.411.176l-6.722,4.14a1.353,1.353,0,0,0-.631.908,1.394,1.394,0,0,0,.244,1.092,1.634,1.634,0,0,0,1.726.621,1.538,1.538,0,0,0,.413-.175l2.562-1.585a4.9,4.9,0,0,1,1.364-.581,5.417,5.417,0,0,1,5.728,2.059,4.681,4.681,0,0,1,.843,3.625A4.5,4.5,0,0,1,22.1,21.905l-6.707,4.154a4.9,4.9,0,0,1-1.364.581" fill="#fff" />
    </svg>
);

const JQueryIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path fill="#0769AD" d="M448 32H64C42.7 32 24 50.7 24 72v368c0 21.3 18.7 40 40 40h384c21.3 0 40-18.7 40-40V72c0-21.3-18.7-40-40-40z" />
        <path fill="#FFF" d="M384 256c0 70.7-57.3 128-128 128s-128-57.3-128-128 57.3-128 128-128 128 57.3 128 128zm-64 0c0-35.3-28.7-64-64-64s-64 28.7-64 64 28.7 64 64 64 64-28.7 64-64z" />
    </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// --- DATA & MAPPING ---
const iconMap = {
    html: HtmlIcon,
    react: ReactIcon,
    vue: VueIcon,
    svelte: SvelteIcon,
    jquery: JQueryIcon
};

// --- REUSABLE COMPONENTS ---
interface FrameworkPillProps {
    framework: keyof typeof iconMap;
    text: string;
    active: boolean;
    onClick: () => void;
}

const FrameworkPill = ({ framework, text, active, onClick }: FrameworkPillProps) => {
    const Icon = iconMap[framework];
    return (
        <button
            onClick={onClick}
            className={`
        inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-md
        ${active
                    ? 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                }
      `}
        >
            <Icon className="w-4 h-4 mr-1.5 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{text}</span>
        </button>
    );
};

const CodeDisplay = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <div className={`relative max-w-5xl mx-auto px-4 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 dark:from-purple-800 dark:via-purple-700 dark:to-purple-600 rounded-2xl sm:rounded-3xl transform -rotate-1 scale-105 opacity-60 dark:opacity-40 transition-all duration-300"></div>

            <div className="relative bg-white dark:bg-gray-950 rounded-lg sm:rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 sm:px-3 py-1 rounded-md text-xs font-medium">
                        Sera UI
                    </div>
                </div>

                <div className="bg-gray-900">
                    <img
                        src="https://i.postimg.cc/7LHrYv8V/Blue-Modern-Digital-Marketing-for-Beginners-Youtube-Thumbnail.png"
                        alt="Code snippet for formcarry setup"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/1200x600/111827/FFFFFF?text=Image+Not+Found';
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

// --- MAIN APP ---
export default function Hero5() {
    const [activeTab, setActiveTab] = useState<keyof typeof iconMap>('react');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const frameworks: Array<{ id: keyof typeof iconMap; name: string }> = [
        { id: 'html', name: 'HTML' },
        { id: 'react', name: 'React' },
        { id: 'vue', name: 'Vue' },
        { id: 'svelte', name: 'Svelte' },
        { id: 'jquery', name: 'jQuery' },
    ];

    return (
        <div className="font-sans">
            <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
      `}</style>

            <div className="min-h-screen bg-gray-50 dark:bg-black py-8 sm:py-12 px-4 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-8 sm:mb-12 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium tracking-wide transition-colors duration-300 mb-4 sm:mb-6">
                            SETUP, EASY-PEASY!
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-4 sm:mt-6 mb-4 sm:mb-6 leading-tight transition-colors duration-300">
                            Hassle-free setup with<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>all major development frameworks
                        </h1>

                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed transition-colors duration-300">
                            Collecting submissions with formcarry is super easy, there&apos;s no dependency
                            needed by default and it works with all of the popular development frameworks.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-16">
                            {frameworks.map(fw => (
                                <FrameworkPill
                                    key={fw.id}
                                    framework={fw.id}
                                    text={fw.name}
                                    active={activeTab === fw.id}
                                    onClick={() => setActiveTab(fw.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={`mb-8 sm:mb-12 ${isVisible ? 'animate-slide-up animation-delay-200' : 'opacity-0'}`}>
                        <CodeDisplay isVisible={isVisible} />
                    </div>

                    <div className={`text-center ${isVisible ? 'animate-slide-up animation-delay-400' : 'opacity-0'}`}>
                        <button className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium text-base sm:text-lg transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 hover:shadow-lg">
                            Explore Documentation
                            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}