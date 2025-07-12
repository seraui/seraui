"use client"
import { useState, useRef, useEffect } from 'react';

// Utility function to join class names (replaces `cn`)
const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Custom hook for auto-resizing textarea (replaces `useAutoResizeTextarea`)
const useAutoResizeTextarea = ({ minHeight, maxHeight }: { minHeight?: number; maxHeight?: number }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (forceShrink = false) => {
    if (textareaRef.current) {
      // Temporarily set height to auto to calculate scrollHeight correctly
      textareaRef.current.style.height = 'auto';
      let newHeight = textareaRef.current.scrollHeight;

      // Apply min and max height constraints
      if (minHeight && newHeight < minHeight) {
        newHeight = minHeight;
      }
      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
      }

      // If forceShrink is true, reset to minHeight
      if (forceShrink && minHeight) {
        newHeight = minHeight;
      }

      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  // Adjust height on initial render and when value changes
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]); // Include adjustHeight in dependencies

  return { textareaRef, adjustHeight };
};

// Inline SVG Icons (replaces lucide-react components)
const Paperclip = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

// Recreated Button component
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  disabled?: boolean;
  size?: string; // Adding size prop to fix the error
}

const Button = ({ children, className, type = 'button', onClick, variant = 'default', disabled = false }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  let variantClasses = '';

  switch (variant) {
    case 'outline':
      variantClasses = 'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-black dark:hover:bg-gray-900 dark:hover:text-white dark:text-gray-100';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700';
      break;
    case 'ghost':
      variantClasses = 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-300';
      break;
    case 'link':
      variantClasses = 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400';
      break;
    case 'destructive':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800';
      break;
    default: // 'default'
      variantClasses = 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200';
      break;
  }

  return (
    <button type={type} className={classNames(baseClasses, variantClasses, className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export function VercelV0Chat() {
  const [value, setValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('GPT-4'); // State for selected model
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  // Placeholder animation state
  const placeholderTexts = [
    "Ask v0 a question...",
    "Generate a component...",
    "Create a new page...",
    "Design a landing page...",
    "Build a full stack app..."
  ];

  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [showCursor, setShowCursor] = useState(true); // For blinking cursor
  const animationState = useRef<{
    currentTextIndex: number;
    charIndex: number;
    isDeleting: boolean;
    timeoutId: NodeJS.Timeout | null;
  }>({
    currentTextIndex: 0,
    charIndex: 0,
    isDeleting: false,
    timeoutId: null,
  });

  const typingSpeed = 70;
  const deletingSpeed = 40;
  const pauseBeforeDelete = 1500;
  const pauseBeforeType = 500;

  // Animation logic
  useEffect(() => {
    const state = animationState.current;

    const animate = () => {
      const fullText = placeholderTexts[state.currentTextIndex];

      if (!state.isDeleting) {
        // Typing phase
        if (state.charIndex < fullText.length) {
          setDisplayedPlaceholder(fullText.substring(0, state.charIndex + 1));
          state.charIndex++;
          state.timeoutId = setTimeout(animate, typingSpeed);
        } else {
          // Finished typing
          state.isDeleting = true;
          state.timeoutId = setTimeout(animate, pauseBeforeDelete);
        }
      } else {
        // Deleting phase
        if (state.charIndex > 0) {
          setDisplayedPlaceholder(fullText.substring(0, state.charIndex - 1));
          state.charIndex--;
          state.timeoutId = setTimeout(animate, deletingSpeed);
        } else {
          // Finished deleting
          state.isDeleting = false;
          state.currentTextIndex = (state.currentTextIndex + 1) % placeholderTexts.length;
          state.charIndex = 0; // Reset charIndex for next phrase
          state.timeoutId = setTimeout(animate, pauseBeforeType);
        }
      }
    };

    // Start the animation loop
    state.timeoutId = setTimeout(animate, pauseBeforeType);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blinks every 500ms

    return () => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      clearInterval(cursorInterval);
    };
  }, [placeholderTexts]); // Include placeholderTexts in dependencies

  const handleSend = () => {
    if (value.trim()) {
      console.log("Sending message:", value.trim());
      console.log("Using model:", selectedModel); // Log the selected model
      setValue('');
      adjustHeight(true); // Force shrink after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Adjust height on value change
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  return (
    <div className={classNames(
      "mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 p-4 py-24 sm:space-y-8 font-sans",
    )}>
      {/* Note: For production, add Inter font to _document.js or use a proper font loading strategy */}

      <h1 className="text-center text-2xl font-bold sm:text-4xl text-gray-900 dark:text-white">
        What can I help you ship?
      </h1>

      <div className="w-full flex flex-col items-center space-y-4">
        {/* Main Input area */}
        <div className="relative w-full rounded-xl border border-gray-200 bg-gray-50/20 shadow-lg dark:border-gray-700 dark:bg-gray-900/20 dark:shadow-gray-900/20">
          <div className="overflow-y-auto">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={displayedPlaceholder + (showCursor && value.length === 0 ? '|' : '')} // Blinking cursor only when input is empty
              className={classNames(
                'w-full px-4 py-3',
                'resize-none',
                'bg-transparent',
                'border-none',
                'text-sm',
                'focus:outline-none',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                'placeholder:text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400',
                'text-gray-900 dark:text-white',
                'min-h-[60px]',
                'rounded-xl'
              )}
              style={{
                overflow: 'hidden',
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="group flex items-center gap-1 rounded-lg p-2"
              >
                <Paperclip className="h-4 w-4" />
                <span className="hidden text-xs transition-opacity group-hover:inline">
                  Attach
                </span>
              </Button>

              {/* Model Selection Dropdown */}
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className={classNames(
                  'px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900',
                  'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  'dark:focus:ring-blue-400 dark:focus:border-blue-400'
                )}
              >
                <option value="GPT-4">GPT-4</option>
                <option value="DeepSak-R1">DeepSak-R1</option>
                <option value="Gemini Pro">Gemini Pro</option>
                <option value="Claude 3 Opus">Claude 3 Opus</option>
                <option value="Llama 3">Llama 3</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="flex items-center justify-between gap-1 rounded-lg border border-dashed px-2 py-1 text-sm border-gray-300 dark:border-gray-600"
              >
                <PlusIcon className="h-4 w-4" />
                Project
              </Button>
              <Button
                type="button"
                onClick={handleSend}
                disabled={!value.trim()}
                className={classNames(
                  'flex items-center justify-between gap-1 rounded-lg px-2.5 py-2.5 text-sm',
                  value.trim()
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                )}
              >
                <ArrowUpIcon
                  className={classNames(
                    'h-4 w-4',
                    value.trim()
                      ? 'text-white dark:text-black'
                      : 'text-gray-400 dark:text-gray-500'
                  )}
                />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VercelV0Chat;
