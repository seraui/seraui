'use client'
import React, { useState, useRef, useEffect } from 'react';

// Type definition for option objects
interface Option {
  id: number;
  name: string;
  value: string;
}

// A list of all available options for the multi-select component.
const ALL_OPTIONS: Option[] = [
  { id: 1, name: 'React', value: 'react' },
  { id: 2, name: 'Vue', value: 'vue' },
  { id: 3, name: 'Angular', value: 'angular' },
  { id: 4, name: 'Svelte', value: 'svelte' },
  { id: 5, name: 'Ember', value: 'ember' },
  { id: 6, name: 'Backbone', value: 'backbone' },
  { id: 7, name: 'Preact', value: 'preact' },
  { id: 8, name: 'Alpine.js', value: 'alpine' },
  { id: 9, name: 'Solid.js', value: 'solid' },
  { id: 10, name: 'Qwik', value: 'qwik' },
];

// Icon for the dropdown chevron (lucide-react style)
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="m6 9 6 6 6-6"/>
    </svg>
);

// Icon for the close button on tags (lucide-react style)
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
);

// Icon for the checkmark on selected items (lucide-react style)
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);


/**
 * A reusable multi-select component styled to feel like shadcn/ui.
 * It features a clean, modern interface, keyboard navigation, search,
 * and a design system that prioritizes accessibility and developer experience.
 */
const MultiSelect: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([ALL_OPTIONS[0], ALL_OPTIONS[2]]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = ALL_OPTIONS.filter(option =>
        !selectedOptions.some(selected => selected.id === option.id) &&
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleOption = (option: Option) => {
        setSelectedOptions(prev =>
            prev.some(o => o.id === option.id)
                ? prev.filter(o => o.id !== option.id)
                : [...prev, option]
        );
        setSearchTerm('');
        inputRef.current?.focus();
    };

    const removeOption = (option: Option) => {
        setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && searchTerm === '' && selectedOptions.length > 0) {
            removeOption(selectedOptions[selectedOptions.length - 1]);
        }

        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
                setHighlightedIndex(0);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => (prev + 1) % filteredOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    toggleOption(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0);
        }
    }, [isOpen, searchTerm]);

    return (
        <div className="w-full max-w-sm mx-auto" ref={wrapperRef}>
            <div className="relative">
                <div
                    className="flex flex-wrap items-center gap-2 p-2 min-h-[40px] text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-black rounded-md shadow-sm cursor-text transition-colors focus-within:ring-2 focus-within:ring-slate-900 dark:focus-within:ring-slate-100 focus-within:ring-offset-2"
                    onClick={() => {
                        setIsOpen(true);
                        inputRef.current?.focus();
                    }}
                >
                    {selectedOptions.map(option => (
                        <div key={option.id} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium px-2 py-1 rounded-md">
                            {option.name}
                            <button
                                type="button"
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-1"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    removeOption(option);
                                }}
                            >
                                <XIcon />
                            </button>
                        </div>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={selectedOptions.length === 0 ? "Select frameworks..." : ""}
                        className="flex-grow bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm p-0"
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-black rounded-md shadow-lg max-h-60 overflow-y-auto animate-popover-in">
                        <ul className="p-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={option.id}
                                        className={`flex items-center justify-between p-2 cursor-pointer rounded-md transition-colors duration-150 ${highlightedIndex === index ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                        onClick={() => toggleOption(option)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                    >
                                        {option.name}
                                        {selectedOptions.some(o => o.id === option.id) && (
                                            <CheckIcon />
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-center text-slate-500 dark:text-slate-400">No options found.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App component to render the MultiSelect
export default function MultiSelectPage() {
  return (
    <div className="p-4 font-sans">
        <style>{`
            @keyframes popover-in {
                from { opacity: 0; transform: scale(0.95) translateY(-10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-popover-in {
                transform-origin: top;
                animation: popover-in 0.1s ease-out forwards;
            }
        `}</style>
        <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">Framework Multi-Select</h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Select your favorite frameworks.</p>
            <MultiSelect />
        </div>
    </div>
  );
}
