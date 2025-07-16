"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';

// --- SVG ICONS ---
// Custom SVG icons for a more polished look.

const SlackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.042 15.16a2.521 2.521 0 1 1 0-5.042 2.521 2.521 0 0 1 0 5.042Z" fill="#36C5F0"></path>
    <path d="M5.042 15.16a2.521 2.521 0 1 0-5.041 0h5.04Z" fill="#2EB67D"></path>
    <path d="M10.125 15.16a2.521 2.521 0 1 1-5.042 0 2.521 2.521 0 0 1 5.042 0Z" fill="#ECB22E"></path>
    <path d="M10.125 15.16a2.521 2.521 0 1 0 0 5.042v-5.04Z" fill="#E01E5A"></path>
    <path d="M10.125 10.125a2.521 2.521 0 1 1 0-5.042 2.521 2.521 0 0 1 0 5.042Z" fill="#36C5F0"></path>
    <path d="M10.125 10.125a2.521 2.521 0 1 0 5.041 0h-5.04Z" fill="#2EB67D"></path>
    <path d="M15.16 10.125a2.521 2.521 0 1 1 5.042 0 2.521 2.521 0 0 1-5.042 0Z" fill="#ECB22E"></path>
    <path d="M15.16 10.125a2.521 2.521 0 1 0 0-5.041v5.04Z" fill="#E01E5A"></path>
  </svg>
);

const BinanceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#F0B90B" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3.375L16.347 7.722L20.625 12L16.347 16.278L12 20.625L7.653 16.278L3.375 12L7.653 7.722L12 3.375ZM9.849 9.849L7.722 12L9.849 14.151L12 12L9.849 9.849ZM16.347 7.722L14.151 9.849L12 12L14.151 14.151L16.347 16.278L18.474 14.151L20.625 12L18.474 9.849L16.347 7.722ZM12 7.653L9.849 9.849L7.722 12L5.526 9.849L7.653 7.722L9.849 5.526L12 7.653Z"/>
    </svg>
);

const DribbbleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4C89" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.29 0 .58-.02.87-.05C11.89 21.07 8 16.99 8 12c0-4.08 2.11-7.61 5.13-9.71A9.969 9.969 0 0 0 12 2zm6.94 4.54C17.36 5.5 15.68 5 14 5c-1.85 0-3.58.6-4.96 1.62 1.32.93 2.4 2.22 3.16 3.73 1.14-.42 2.37-.65 3.66-.65.76 0 1.5.08 2.22.23-1.03-1.39-2.3-2.58-3.74-3.39zM10 12c0 2.21.91 4.2 2.36 5.64 1.12-2.03 1.52-4.33 1.18-6.55-.44-.33-.92-.6-1.42-.82C10.73 10.84 10 11.39 10 12z" fill="#C32361"/>
    </svg>
);

const FigmaIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 3.75a3.75 3.75 0 0 1 3.75 3.75v3.75h-3.75V3.75Z" fill="#F24E1E"></path>
        <path d="M11.25 3.75a3.75 3.75 0 0 1 3.75 3.75v3.75h-3.75V3.75Z" fill="#FF7262"></path>
        <path d="M7.5 3.75a3.75 3.75 0 0 1 3.75 3.75v3.75H7.5V3.75Z" fill="#A259FF"></path>
        <path d="M7.5 11.25a3.75 3.75 0 1 1-3.75 3.75A3.75 3.75 0 0 1 7.5 11.25Z" fill="#1ABCFE"></path>
        <path d="M11.25 15a3.75 3.75 0 0 1 3.75 3.75h-3.75v-3.75Z" fill="#0ACF83"></path>
    </svg>
);

const CommandIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
);

// --- TYPES ---
interface SearchItemType {
  id: number;
  name: string;
  icon: React.ReactNode;
  notification: string;
  color: string;
}

interface SearchItemProps {
  item: SearchItemType;
}

// --- DUMMY DATA ---
const recentSearches: SearchItemType[] = [
  { id: 1, name: 'Slack', icon: <SlackIcon />, notification: '4 Messages', color: '#36C5F0' },
  { id: 2, name: 'Binance', icon: <BinanceIcon />, notification: '8 Updates', color: '#F0B90B' },
  { id: 3, name: 'Dribble', icon: <DribbbleIcon />, notification: '2 Updates', color: '#EA4C89' },
  { id: 4, name: 'Figma', icon: <FigmaIcon />, notification: '12 Comments', color: '#F24E1E' },
];

// --- Search Item Component ---
const SearchItem: React.FC<SearchItemProps> = ({ item }) => (
  <li className="flex items-center justify-between p-3 transition-all duration-300 ease-in-out bg-black/5 dark:bg-gray-500/10 hover:bg-black/10 dark:hover:bg-gray-500/20 rounded-xl hover:scale-[1.02] cursor-pointer">
    <div className="flex items-center gap-4">
      {item.icon}
      <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} className="w-2 h-2 rounded-full"></span>
      <span>{item.notification}</span>
    </div>
  </li>
);

// --- Main App Component ---
export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<SearchItemType[]>(recentSearches);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => setItems([]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center font-sans w-full px-4 py-8">
        
        {/* Search Modal */}
        <div className="w-full max-w-2xl mx-auto p-4 space-y-6 bg-white/30 dark:bg-black/30 backdrop-blur-3xl border border-black/10 dark:border-white/5 rounded-3xl shadow-lg dark:shadow-2xl dark:shadow-purple-500/15">
          
          {/* Search Input with Enhanced Gradient Border and Glow */}
          <div className="relative p-px rounded-2xl bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 dark:shadow-purple-600/30 transition-shadow duration-300 hover:shadow-purple-500/40 dark:hover:shadow-purple-600/50 focus-within:shadow-purple-500/40 dark:focus-within:shadow-purple-600/50">
              <div className="flex items-center w-full px-4 py-2 bg-white/80 dark:bg-gray-900/90 rounded-[15px]">
                  <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search the app.."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-1 text-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none flex-1 min-w-0"
                  />
                  <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center justify-center p-1.5 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-inner">
                          <CommandIcon />
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 p-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-inner">
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">K</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Recent Searches Section */}
          {items.length > 0 && (
            <div className="px-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">Recent search</h2>
                <button
                  onClick={handleClear}
                  className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:text-black dark:hover:text-white"
                >
                  Clear all
                </button>
              </div>
              
              <ul className="space-y-2">
                {filteredItems.map(item => (
                  <SearchItem key={item.id} item={item} />
                ))}
                {filteredItems.length === 0 && (
                   <p className="text-center text-gray-400 dark:text-gray-500 py-4">No results found for &quot;{searchTerm}&quot;</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  