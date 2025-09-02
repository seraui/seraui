"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Command, FileText, Home, Settings, Sparkles, User, Bot, X } from "lucide-react";
import { getAllSearchableItems, searchItems, SearchableItem } from "@/lib/search-registry";
import Link from "next/link";

// AI Logo Component with fallback
const AILogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg'; loading?: boolean }> = ({
  className = "",
  size = 'md',
  loading = false
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const sizeStyles = {
    sm: { width: '24px', height: '24px' },
    md: { width: '32px', height: '32px' },
    lg: { width: '48px', height: '48px' }
  };

  if (imageError) {
    return <Sparkles className={`${sizeClasses[size]} ${loading ? 'animate-pulse' : ''} ${className}`} />;
  }

  return (
    <img
      src="/logo.svg"
      alt="AI Assistant"
      className={`${sizeClasses[size]} ${loading ? 'animate-pulse' : ''} ${className} rounded-lg`}
      style={sizeStyles[size]}
      onError={() => setImageError(true)}
    />
  );
};

// Declare marked types for window object
declare global {
  interface Window {
    marked?: {
      parse: (markdown: string) => string;
      setOptions: (options: {
        breaks?: boolean;
        gfm?: boolean;
        sanitize?: boolean;
      }) => void;
    };
  }
}

// Load marked.js for markdown parsing
const loadMarked = (): Promise<typeof window.marked> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.marked) {
      resolve(window.marked);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js';
    script.onload = () => {
      resolve(window.marked);
    };
    document.head.appendChild(script);
  });
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// AI Response Renderer Component with full markdown support
interface AIResponseRendererProps {
  content: string;
  onLinkClick: () => void;
}

const AIResponseRenderer: React.FC<AIResponseRendererProps> = ({ content, onLinkClick }) => {
  const [renderedContent, setRenderedContent] = useState<string>("");
  const [marked, setMarked] = useState<typeof window.marked | null>(null);

  useEffect(() => {
    loadMarked().then((markedLib) => {
      setMarked(markedLib);
    });
  }, []);

  useEffect(() => {
    if (marked && content) {
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        sanitize: false
      });

      // Render markdown to HTML
      const htmlContent = marked.parse(content);
      setRenderedContent(htmlContent);
    } else {
      // Fallback to simple text if marked is not loaded yet
      setRenderedContent(content);
    }
  }, [marked, content]);

  // Handle link clicks to close modal
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        window.location.href = href;
        onLinkClick();
      }
    }
  };

  return (
    <div
      className="markdown-content prose prose-sm dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-100"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
      onClick={handleClick}
      style={{
        // Custom styling for markdown elements
        '--tw-prose-body': 'rgb(63 63 70)', // zinc-700 - light mode body text
        '--tw-prose-headings': 'rgb(39 39 42)', // zinc-800 - light mode headings
        '--tw-prose-links': 'rgb(37 99 235)', // blue-600 - light mode links
        '--tw-prose-bold': 'rgb(39 39 42)', // zinc-800 - light mode bold
        '--tw-prose-code': 'rgb(220 38 127)', // pink-600 - light mode code
        '--tw-prose-pre-code': 'rgb(244 244 245)', // zinc-100 - light mode pre code
        '--tw-prose-pre-bg': 'rgb(39 39 42)', // zinc-800 - light mode pre bg
        '--tw-prose-invert-body': 'rgb(244 244 245)', // zinc-100 - dark mode body text (light)
        '--tw-prose-invert-headings': 'rgb(255 255 255)', // white - dark mode headings
        '--tw-prose-invert-links': 'rgb(96 165 250)', // blue-400 - dark mode links
        '--tw-prose-invert-bold': 'rgb(255 255 255)', // white - dark mode bold
        '--tw-prose-invert-code': 'rgb(251 113 133)', // rose-400 - dark mode code
        '--tw-prose-invert-pre-code': 'rgb(244 244 245)', // zinc-100 - dark mode pre code
        '--tw-prose-invert-pre-bg': 'rgb(24 24 27)', // zinc-900 - dark mode pre bg
      } as React.CSSProperties}
    />
  );
};

// Icon mapping for different categories and items
const getItemIcon = (item: SearchableItem) => {
  const title = item.title.toLowerCase();

  if (title.includes("introduction") || title.includes("home")) {
    return <Home className="w-4 h-4" />;
  }
  if (title.includes("installation") || title.includes("setup")) {
    return <Settings className="w-4 h-4" />;
  }
  return <FileText className="w-4 h-4" />;
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allItems] = useState(() => getAllSearchableItems());
  const [filteredItems, setFilteredItems] = useState<SearchableItem[]>([]);
  const [isAIMode, setIsAIMode] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiConversation, setAiConversation] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelectAndClose = useCallback(() => {
    setQuery("");
    setAiResponse("");
    setAiConversation([]);
    onClose();
  }, [onClose]);

  // Clear search function
  const handleClearSearch = useCallback(() => {
    setQuery("");
    setAiResponse("");
    setAiConversation([]);
    setSelectedIndex(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // AI Search Function
  const fetchAIResponse = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsAILoading(true);
    setAiResponse("");

    // Add user message to conversation
    setAiConversation(prev => [...prev, { type: 'user', content: prompt }]);

    try {
      const currentUrl = window.location.origin;
      const componentsWithLinks = allItems.map(item =>
        `${item.title}: ${item.description} - Link: ${currentUrl}${item.href}`
      ).join('\n');

     const enhancedPrompt = `You are "Sera UI Search," an expert assistant for the SeraUI component library. Here are the available components with their documentation links:\n\n${componentsWithLinks}\n\nWhen recommending components, follow these guidelines:
1. Understand the user's intent, even if their keywords are unclear or imperfect.
2. Suggest the most relevant SeraUI components based on reasoning, context, and functionality—not just keyword matching.
3. Always include the direct link to the component documentation. Format links as: [Component Name](${currentUrl}/docs/component-name)
4. Use markdown formatting consistently:
   - **Bold** for key terms or important points
   - *Italic* for emphasis
   - \`code\` for component names, props, or code snippets
   - Lists for multiple items or steps
   - > Blockquotes for tips, advice, or cautions

Respond clearly and helpfully. Explain why each component is suitable for the user's request and provide guidance on how to use it effectively.

User question: ${prompt}`;

      const res = await fetch(`https://studio.seraprogrammer.com/api/ai?model=gpt-4o-mini&prompt=${encodeURIComponent(enhancedPrompt)}`);

      if (!res.body) {
        console.error("No response body");
        setIsAILoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setAiResponse(fullText);

        // Auto-scroll to bottom
        if (resultsRef.current) {
          resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
        }
      }

      // Add AI response to conversation and clear current response
      setAiConversation(prev => [...prev, { type: 'ai', content: fullText }]);
      setAiResponse(""); // Clear current response to prevent duplication
    } catch (error) {
      console.error("AI request failed:", error);
      const errorMessage = "**Error**: Sorry, I encountered an error while processing your request. Please try again.";
      setAiResponse("");
      setAiConversation(prev => [...prev, { type: 'ai', content: errorMessage }]);
    } finally {
      setIsAILoading(false);
    }
  }, [allItems]);

  // Handle AI query submission
  const handleAIQuery = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && isAIMode) {
      fetchAIResponse(query);
      setQuery("");
    }
  }, [query, isAIMode, fetchAIResponse]);

  // Update filtered items when query changes
  useEffect(() => {
    if (query.trim()) {
      const results = searchItems(query, allItems);
      setFilteredItems(results); // Show all search results
    } else {
      // Show all components when no query, grouped by category
      const componentItems = allItems.filter(item => item.category === 'Components');
      const otherItems = allItems.filter(item => item.category !== 'Components');
      setFilteredItems([...componentItems, ...otherItems]); // Show all items, components first
    }
    setSelectedIndex(0);
  }, [query, allItems]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (isAIMode && query.trim()) {
            fetchAIResponse(query);
            setQuery("");
          } else if (filteredItems[selectedIndex]) {
            window.location.href = filteredItems[selectedIndex].href;
            handleSelectAndClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "k":
          // Ctrl+K to clear search
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleClearSearch();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isAIMode, filteredItems, selectedIndex, onClose, handleSelectAndClose, fetchAIResponse, query, handleClearSearch]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Custom styles for markdown content */}
      <style jsx global>{`
        .markdown-content {
          font-size: 0.875rem;
          line-height: 1.4;
          color: rgb(63 63 70); /* zinc-700 for light mode */
        }
        .dark .markdown-content {
          color: rgb(244 244 245); /* zinc-100 for dark mode */
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
          margin: 0.5em 0 0.25em 0;
          font-weight: 600;
          color: rgb(39 39 42); /* zinc-800 for light mode */
        }
        .dark .markdown-content h1,
        .dark .markdown-content h2,
        .dark .markdown-content h3,
        .dark .markdown-content h4,
        .dark .markdown-content h5,
        .dark .markdown-content h6 {
          color: rgb(255 255 255); /* white for dark mode headings */
        }
        .markdown-content h1 { font-size: 1.1em; }
        .markdown-content h2 { font-size: 1.05em; }
        .markdown-content h3 { font-size: 1em; }
        .markdown-content p {
          margin: 0.5em 0;
          color: inherit;
        }
        .markdown-content ul,
        .markdown-content ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
          color: inherit;
        }
        .markdown-content li {
          margin: 0.25em 0;
          color: inherit;
        }
        .markdown-content code {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-size: 0.8em;
        }
        .dark .markdown-content code {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .markdown-content pre {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 0.375rem;
          padding: 0.75rem;
          margin: 0.5em 0;
          overflow-x: auto;
        }
        .dark .markdown-content pre {
          background-color: rgba(255, 255, 255, 0.05);
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
        }
        .markdown-content a {
          color: rgb(37 99 235);
          text-decoration: underline;
          text-decoration-color: rgba(37, 99, 235, 0.3);
          transition: all 0.2s ease;
        }
        .markdown-content a:hover {
          color: rgb(29 78 216);
          text-decoration-color: rgba(29, 78, 216, 0.6);
        }
        .dark .markdown-content a {
          color: rgb(96 165 250);
          text-decoration-color: rgba(96, 165, 250, 0.3);
        }
        .dark .markdown-content a:hover {
          color: rgb(147 197 253);
          text-decoration-color: rgba(147, 197, 253, 0.6);
        }
        .markdown-content blockquote {
          border-left: 3px solid rgba(37, 99, 235, 0.3);
          padding-left: 1rem;
          margin: 0.5em 0;
          font-style: italic;
          opacity: 0.8;
          color: inherit;
        }
        .dark .markdown-content blockquote {
          border-left-color: rgba(96, 165, 250, 0.3);
          color: rgb(212 212 216); /* zinc-300 for dark mode blockquotes */
        }
        .markdown-content strong {
          font-weight: 600;
          color: rgb(39 39 42); /* zinc-800 for light mode */
        }
        .dark .markdown-content strong {
          color: rgb(255 255 255); /* white for dark mode */
        }
        .markdown-content em {
          font-style: italic;
          color: inherit;
        }
      `}</style>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-99999 bg-black/40 backdrop-blur-md"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-zinc-800/50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/20 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              {/* AI Toggle Switch */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => {
                    setIsAIMode(!isAIMode);
                    setQuery("");
                    setAiResponse("");
                    setAiConversation([]);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isAIMode ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  role="switch"
                  aria-checked={isAIMode}
                  aria-label="Toggle AI search mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAIMode ? 'translate-x-6' : 'translate-x-1'
                    } flex items-center justify-center`}
                  >
                    {isAIMode ? (
                      <div className="m-1 w-2 h-2 bg-blue-600 rounded-full" />
                    ) : (
                      <div className="m-1 w-2 h-2 bg-zinc-400 rounded-full" />
                    )}
                  </span>
                </button>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isAIMode ? 'AI' : 'Search'}
                </span>
              </div>

              {/* Search Icon */}
              {isAIMode ? (
                <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Search className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              )}

              {/* Input Field */}
              <form onSubmit={handleAIQuery} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isAIMode ? "Ask AI about components..." : "Search components and documentation..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 outline-none text-lg"
                />
              </form>

              {/* Results Counter / AI Status */}
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                {isAIMode ? (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 backdrop-blur-sm rounded text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50">
                    {isAILoading ? 'AI thinking...' : 'AI Ready'}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded text-zinc-600 dark:text-zinc-400 border border-white/20 dark:border-zinc-700/50">
                    {filteredItems.length} results
                  </span>
                )}
                <kbd className="px-2 py-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded text-zinc-600 dark:text-zinc-400 border border-white/20 dark:border-zinc-700/50">
                  <Command className="w-3 h-3 inline mr-1" />K
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-[500px] overflow-y-auto bg-white/30 dark:bg-black/30 backdrop-blur-sm">
              {isAIMode ? (
                /* AI Chat Interface */
                <div className="p-4 space-y-4">
                  {/* Conversation History */}
                  {aiConversation.map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          {message.type === 'user' ? (
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                          ) : (
                            <AILogo size="md" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-white/20 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100'
                        }`}>
                          <div className="text-sm whitespace-pre-wrap">
                            {message.type === 'ai' ? (
                              <AIResponseRenderer content={message.content} onLinkClick={handleSelectAndClose} />
                            ) : (
                              message.content
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Current AI Response */}
                  {(isAILoading || aiResponse) && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <AILogo size="md" loading={isAILoading} />
                        </div>
                        <div className="rounded-2xl px-4 py-3 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-white/20 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100">
                          {isAILoading && !aiResponse ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                              <span className="text-sm text-zinc-500">AI is thinking...</span>
                            </div>
                          ) : (
                            <div className="text-sm whitespace-pre-wrap">
                              <AIResponseRenderer content={aiResponse} onLinkClick={handleSelectAndClose} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Welcome Message */}
                  {aiConversation.length === 0 && !aiResponse && (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
                        <AILogo size="lg" />
                      </div>
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">AI Assistant Ready</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                        Ask me anything about the SeraUI components! I can help you find the right component, explain usage patterns, or provide implementation guidance.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {[
                          'How do I use the Button component?',
                          'Show me Modal examples',
                          'What video components are available?',
                          'Guide me to Accordion usage',
                          'Find Carousel components'
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setQuery(suggestion);
                              fetchAIResponse(suggestion);
                              setQuery("");
                            }}
                            className="px-3 py-1.5 text-xs bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm rounded-full text-zinc-600 dark:text-zinc-400 border border-white/20 dark:border-zinc-700/50 hover:bg-white/90 dark:hover:bg-zinc-700/90 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Regular Search Results */
                filteredItems.length > 0 ? (
                  <div className="py-2">
                    {filteredItems.map((item, index) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={handleSelectAndClose}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-white/50 dark:hover:bg-zinc-900/50 transition-colors ${
                          index === selectedIndex
                            ? "bg-white/50 dark:bg-zinc-900/50"
                            : ""
                        }`}
                      >
                        <div className="flex-shrink-0 text-zinc-600 dark:text-zinc-500">
                          {getItemIcon(item)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                            {item.title}
                          </div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                            {item.description}
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-xs text-zinc-400 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm px-2 py-1 rounded border border-white/20 dark:border-zinc-700/50">
                          {item.category}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-zinc-600 dark:text-zinc-500">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No results found for &quot;{query}&quot;</p>
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/20 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">↵</kbd>
                    {isAIMode ? 'to send' : 'to select'}
                  </span>
                  {/* Clear Search Button */}
                  <button
                    onClick={handleClearSearch}
                    className="flex items-center gap-1 px-2 py-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50 hover:bg-white/90 dark:hover:bg-zinc-700/90 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    title={isAIMode ? "Clear AI conversation (Ctrl+K)" : "Clear search (Ctrl+K)"}
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                    <kbd className="ml-1 px-1 py-0.5 bg-black/10 dark:bg-white/10 rounded text-xs">
                      ⌘K
                    </kbd>
                  </button>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded border border-white/20 dark:border-zinc-700/50">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
    </>
  );
};
