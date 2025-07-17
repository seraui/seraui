"use client";

import * as React from 'react';
import { SparklesText } from './sparklestext';

export default function SparklesTextView(): React.JSX.Element {
    return (
        <>
            {/* Style tag to import and apply the Google Font */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap');
                body {
                    font-family: 'Space Grotesk', sans-serif;
                }
            `}</style>

            {/* Main container with full light/dark mode support */}
            <div className="flex-col items-center justify-center text-center p-4 gap-12 bg-white dark:bg-black transition-colors duration-300">

                {/* Primary sparkles text with theme-aware styling */}
                <div className="p-8 rounded-lg bg-gray-100/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50 transition-all duration-300">
                    <SparklesText
                        as="h1"
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300 mask-l-from-0%"
                        sparkleCount={15}
                        sparkleSize={18}
                        colors={{ first: '#fde047', second: '#f97316' }}
                    >
                        Starship
                    </SparklesText>
                </div>
            </div>
        </>
    );
}