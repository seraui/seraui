'use client'
import React, { useState, useRef, useEffect } from 'react';

// Type definition for tag objects
interface Tag {
  id: number;
  name: string;
  value: string;
  color: string;
}

// A list of all available tags for the multi-select component.
const ALL_TAGS: Tag[] = [
  { id: 1, name: 'JavaScript', value: 'javascript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { id: 2, name: 'TypeScript', value: 'typescript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { id: 3, name: 'React', value: 'react', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
  { id: 4, name: 'Vue', value: 'vue', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { id: 5, name: 'Angular', value: 'angular', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { id: 6, name: 'Node.js', value: 'nodejs', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
  { id: 7, name: 'Python', value: 'python', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
  { id: 8, name: 'CSS', value: 'css', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { id: 9, name: 'HTML', value: 'html', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  { id: 10, name: 'GraphQL', value: 'graphql', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
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

// Tag icon for visual enhancement
const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
        <path d="M7 7h.01"/>
    </svg>
);

/**
 * A colorful tag-based multi-select component styled to feel like shadcn/ui.
 * Features colored tags, search functionality, and a modern interface.
 */
const TagMultiSelect: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([ALL_TAGS[0], ALL_TAGS[2]]);
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

    const filteredTags = ALL_TAGS.filter(tag =>
        !selectedTags.some(selected => selected.id === tag.id) &&
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleTag = (tag: Tag) => {
        setSelectedTags(prev =>
            prev.some(t => t.id === tag.id)
                ? prev.filter(t => t.id !== tag.id)
                : [...prev, tag]
        );
        setSearchTerm('');
        inputRef.current?.focus();
    };

    const removeTag = (tag: Tag) => {
        setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && searchTerm === '' && selectedTags.length > 0) {
            removeTag(selectedTags[selectedTags.length - 1]);
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
                setHighlightedIndex(prev => (prev + 1) % filteredTags.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev - 1 + filteredTags.length) % filteredTags.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredTags[highlightedIndex]) {
                    toggleTag(filteredTags[highlightedIndex]);
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
                    {selectedTags.map(tag => (
                        <div key={tag.id} className={`flex items-center gap-1.5 ${tag.color} font-medium px-2 py-1 rounded-full text-xs`}>
                            <TagIcon />
                            {tag.name}
                            <button
                                type="button"
                                className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-1"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    removeTag(tag);
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
                        placeholder={selectedTags.length === 0 ? "Select tags..." : ""}
                        className="flex-grow bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm p-0"
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-black rounded-md shadow-lg max-h-60 overflow-y-auto animate-popover-in">
                        <ul className="p-1">
                            {filteredTags.length > 0 ? (
                                filteredTags.map((tag, index) => (
                                    <li
                                        key={tag.id}
                                        className={`flex items-center justify-between p-2 cursor-pointer rounded-md transition-colors duration-150 ${highlightedIndex === index ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                        onClick={() => toggleTag(tag)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${tag.color.split(' ')[0]}`}></div>
                                            {tag.name}
                                        </div>
                                        {selectedTags.some(t => t.id === tag.id) && (
                                            <CheckIcon />
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-center text-slate-500 dark:text-slate-400">No tags found.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App component to render the TagMultiSelect
export default function TagMultiSelectPage() {
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
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">Tag Multi-Select</h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Select your technology tags with colors.</p>
            <TagMultiSelect />
        </div>
    </div>
  );
}
