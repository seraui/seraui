'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AIButtonProps {
  dir?: 'left' | 'right';
}

export function AIButton({ dir = 'right' }: AIButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Construct URLs
  const baseUrl = 'https://seraui.com';
  const currentUrl = `${baseUrl}${pathname}`;
  
  // Extract component name from pathname
  const componentMatch = pathname.match(/\/docs\/([^\/]+)/);
  const componentName = componentMatch ? componentMatch[1] : 'index';
  const markdownUrl = `${baseUrl}/docs-md/${componentName}.md`;

  // Create specific prompts for different AI assistants
  const getChatGPTPrompt = (url: string) => {
    if (componentName === 'index') {
      return `I need help understanding the SeraUI component library documentation at ${url}. Please explain the overall architecture and available components.`;
    }
    return `I need help understanding the SeraUI ${componentName} component documentation at ${url}. Please explain the available props, styling options, and provide usage examples.`;
  };

  const getClaudePrompt = (url: string) => {
    if (componentName === 'index') {
      return `I'm exploring the SeraUI component library from ${url}. Can you help me understand the component system and how to get started?`;
    }
    return `I'm implementing SeraUI ${componentName} from ${url} but need clarification on the component API, customization options, and best practices. Can you help me understand this documentation?`;
  };

  const chatGptUrl = `https://chatgpt.com/?model=gpt-4&q=${encodeURIComponent(getChatGPTPrompt(currentUrl))}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(getClaudePrompt(currentUrl))}`;

  const handleCopyPage = async () => {
    try {
      // Create a ChatGPT prompt with the markdown URL
      const chatGPTPrompt = componentName === 'index' 
        ? `I need help understanding the SeraUI component library documentation. Please analyze this markdown documentation: ${markdownUrl}

Can you explain the overall architecture and available components?`
        : `I need help understanding the SeraUI ${componentName} component. Please analyze this markdown documentation: ${markdownUrl}

Can you explain the available props, styling options, and provide usage examples?`;
      
      await navigator.clipboard.writeText(chatGPTPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to copy ChatGPT prompt:', err);
    }
  };

  const handleViewAsMarkdown = () => {
    window.open(markdownUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleChatGPTClick = () => {
    window.open(chatGptUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleClaudeClick = () => {
    window.open(claudeUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <span className={`relative inline-block ${dir === 'left' ? 'justify-start' : 'justify-end'} ml-3`} ref={dropdownRef}>
      <button
        onClick={handleCopyPage}
        className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer duration-200 ease-out transition hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md py-1.5 px-2 gap-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm"
        title="Copy Page URL"
      >
        {isCopied ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-1 shrink-0 text-green-600 dark:text-green-400"
          >
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-1 shrink-0"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
        )}
        {isCopied ? 'Copied!' : 'Copy Page'}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="ml-1 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
          title="More options"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 ${dir === 'left' ? 'left-0' : 'right-0'} w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-[9999] overflow-hidden`}>
          <div className="py-1">
            <button
              onClick={handleViewAsMarkdown}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-3 shrink-0"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              View as Markdown
            </button>

            <button
              onClick={handleChatGPTClick}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 font-medium"
            >
              <svg
                fill="currentColor"
                fillRule="evenodd"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-3 shrink-0"
              >
                <path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" />
              </svg>
              Open in ChatGPT
            </button>
            
            <button
              onClick={handleClaudeClick}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 font-medium"
            >
              <svg
                fill="currentColor"
                fillRule="evenodd"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-3 shrink-0"
              >
                <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
              </svg>
              Open in Claude
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

// Export with a more semantic name for inline usage
export const AI = AIButton;