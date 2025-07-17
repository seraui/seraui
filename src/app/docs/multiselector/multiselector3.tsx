'use client'
import React, { useState, useRef, useEffect } from 'react';

// Type definition for skill objects
interface Skill {
  id: number;
  name: string;
  value: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'Mobile';
}

// A list of all available skills for the multi-select component.
const ALL_SKILLS: Skill[] = [
  { id: 1, name: 'React', value: 'react', level: 'Advanced', category: 'Frontend' },
  { id: 2, name: 'Node.js', value: 'nodejs', level: 'Intermediate', category: 'Backend' },
  { id: 3, name: 'TypeScript', value: 'typescript', level: 'Advanced', category: 'Frontend' },
  { id: 4, name: 'Docker', value: 'docker', level: 'Intermediate', category: 'DevOps' },
  { id: 5, name: 'Figma', value: 'figma', level: 'Beginner', category: 'Design' },
  { id: 6, name: 'Python', value: 'python', level: 'Expert', category: 'Backend' },
  { id: 7, name: 'React Native', value: 'react-native', level: 'Intermediate', category: 'Mobile' },
  { id: 8, name: 'AWS', value: 'aws', level: 'Advanced', category: 'DevOps' },
  { id: 9, name: 'GraphQL', value: 'graphql', level: 'Intermediate', category: 'Backend' },
  { id: 10, name: 'Tailwind CSS', value: 'tailwind', level: 'Expert', category: 'Frontend' },
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

// Star icon for skill level
const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
);

// Function to get level color
const getLevelColor = (level: string) => {
    switch (level) {
        case 'Beginner': return 'text-green-600 dark:text-green-400';
        case 'Intermediate': return 'text-yellow-600 dark:text-yellow-400';
        case 'Advanced': return 'text-orange-600 dark:text-orange-400';
        case 'Expert': return 'text-red-600 dark:text-red-400';
        default: return 'text-slate-600 dark:text-slate-400';
    }
};

// Function to get level stars
const getLevelStars = (level: string) => {
    const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
    return levels[level as keyof typeof levels] || 1;
};

/**
 * A skills-based multi-select component with skill levels and categories.
 */
const SkillMultiSelect: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([ALL_SKILLS[0], ALL_SKILLS[2]]);
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

    const filteredSkills = ALL_SKILLS.filter(skill =>
        !selectedSkills.some(selected => selected.id === skill.id) &&
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSkill = (skill: Skill) => {
        setSelectedSkills(prev =>
            prev.some(s => s.id === skill.id)
                ? prev.filter(s => s.id !== skill.id)
                : [...prev, skill]
        );
        setSearchTerm('');
        inputRef.current?.focus();
    };

    const removeSkill = (skill: Skill) => {
        setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && searchTerm === '' && selectedSkills.length > 0) {
            removeSkill(selectedSkills[selectedSkills.length - 1]);
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
                setHighlightedIndex(prev => (prev + 1) % filteredSkills.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev - 1 + filteredSkills.length) % filteredSkills.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredSkills[highlightedIndex]) {
                    toggleSkill(filteredSkills[highlightedIndex]);
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
                    {selectedSkills.map(skill => (
                        <div key={skill.id} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium px-2 py-1 rounded-md">
                            <div className="flex items-center gap-1">
                                <span>{skill.name}</span>
                                <div className={`flex ${getLevelColor(skill.level)}`}>
                                    {Array.from({ length: 4 }, (_, i) => (
                                        <StarIcon key={i} filled={i < getLevelStars(skill.level)} />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-1"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    removeSkill(skill);
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
                        placeholder={selectedSkills.length === 0 ? "Select skills..." : ""}
                        className="flex-grow bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm p-0"
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-black rounded-md shadow-lg max-h-60 overflow-y-auto animate-popover-in">
                        <ul className="p-1">
                            {filteredSkills.length > 0 ? (
                                filteredSkills.map((skill, index) => (
                                    <li
                                        key={skill.id}
                                        className={`flex items-center justify-between p-2 cursor-pointer rounded-md transition-colors duration-150 ${highlightedIndex === index ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                        onClick={() => toggleSkill(skill)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                                                    {skill.category}
                                                </span>
                                            </div>
                                            <div className={`flex items-center gap-1 ${getLevelColor(skill.level)}`}>
                                                {Array.from({ length: 4 }, (_, i) => (
                                                    <StarIcon key={i} filled={i < getLevelStars(skill.level)} />
                                                ))}
                                                <span className="text-xs ml-1">{skill.level}</span>
                                            </div>
                                        </div>
                                        {selectedSkills.some(s => s.id === skill.id) && (
                                            <CheckIcon />
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-center text-slate-500 dark:text-slate-400">No skills found.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App component to render the SkillMultiSelect
export default function SkillMultiSelectPage() {
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
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">Skills Multi-Select</h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Select your skills with proficiency levels.</p>
            <SkillMultiSelect />
        </div>
    </div>
  );
}
