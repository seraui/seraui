'use client'
import React, { useState, useRef, useEffect } from 'react';

// Type definition for category objects
interface Category {
  id: number;
  name: string;
  value: string;
  icon: string;
  description: string;
  count: number;
}

// A list of all available categories for the multi-select component.
const ALL_CATEGORIES: Category[] = [
  { id: 1, name: 'Technology', value: 'technology', icon: '💻', description: 'Tech-related content', count: 245 },
  { id: 2, name: 'Design', value: 'design', icon: '🎨', description: 'UI/UX and visual design', count: 189 },
  { id: 3, name: 'Business', value: 'business', icon: '💼', description: 'Business and entrepreneurship', count: 156 },
  { id: 4, name: 'Marketing', value: 'marketing', icon: '📈', description: 'Marketing and growth', count: 134 },
  { id: 5, name: 'Education', value: 'education', icon: '📚', description: 'Learning and tutorials', count: 298 },
  { id: 6, name: 'Health', value: 'health', icon: '🏥', description: 'Health and wellness', count: 87 },
  { id: 7, name: 'Travel', value: 'travel', icon: '✈️', description: 'Travel and adventure', count: 76 },
  { id: 8, name: 'Food', value: 'food', icon: '🍕', description: 'Recipes and cooking', count: 123 },
  { id: 9, name: 'Sports', value: 'sports', icon: '⚽', description: 'Sports and fitness', count: 98 },
  { id: 10, name: 'Entertainment', value: 'entertainment', icon: '🎬', description: 'Movies, music, and fun', count: 167 },
];



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

// Hash icon for categories
const HashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <line x1="4" x2="20" y1="9" y2="9"/>
        <line x1="4" x2="20" y1="15" y2="15"/>
        <line x1="10" x2="8" y1="3" y2="21"/>
        <line x1="16" x2="14" y1="3" y2="21"/>
    </svg>
);

/**
 * A category-based multi-select component with icons, descriptions, and counts.
 */
const CategoryMultiSelect: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([ALL_CATEGORIES[0], ALL_CATEGORIES[1]]);
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

    const filteredCategories = ALL_CATEGORIES.filter(category =>
        !selectedCategories.some(selected => selected.id === category.id) &&
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleCategory = (category: Category) => {
        setSelectedCategories(prev =>
            prev.some(c => c.id === category.id)
                ? prev.filter(c => c.id !== category.id)
                : [...prev, category]
        );
        setSearchTerm('');
        inputRef.current?.focus();
    };

    const removeCategory = (category: Category) => {
        setSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && searchTerm === '' && selectedCategories.length > 0) {
            removeCategory(selectedCategories[selectedCategories.length - 1]);
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
                setHighlightedIndex(prev => (prev + 1) % filteredCategories.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev - 1 + filteredCategories.length) % filteredCategories.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredCategories[highlightedIndex]) {
                    toggleCategory(filteredCategories[highlightedIndex]);
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
                    {selectedCategories.map(category => (
                        <div key={category.id} className="flex items-center gap-1.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-800 dark:text-slate-200 font-medium px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                            <span className="text-sm">{category.icon}</span>
                            <HashIcon />
                            {category.name}
                            <span className="text-xs bg-slate-300 dark:bg-slate-600 px-1.5 py-0.5 rounded-full">
                                {category.count}
                            </span>
                            <button
                                type="button"
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-1"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    removeCategory(category);
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
                        placeholder={selectedCategories.length === 0 ? "Select categories..." : ""}
                        className="flex-grow bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm p-0"
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-black rounded-md shadow-lg max-h-60 overflow-y-auto animate-popover-in">
                        <ul className="p-1">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category, index) => (
                                    <li
                                        key={category.id}
                                        className={`flex items-center justify-between p-3 cursor-pointer rounded-md transition-colors duration-150 ${highlightedIndex === index ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                        onClick={() => toggleCategory(category)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{category.icon}</span>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{category.name}</span>
                                                    <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                                        {category.count}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    {category.description}
                                                </span>
                                            </div>
                                        </div>
                                        {selectedCategories.some(c => c.id === category.id) && (
                                            <CheckIcon />
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-center text-slate-500 dark:text-slate-400">No categories found.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App component to render the CategoryMultiSelect
export default function CategoryMultiSelectPage() {
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
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">Category Multi-Select</h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Select content categories with counts and descriptions.</p>
            <CategoryMultiSelect />
        </div>
    </div>
  );
}
