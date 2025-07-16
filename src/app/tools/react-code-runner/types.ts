export interface CodeRunnerProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

export interface EditorConfig {
  language: string;
  theme: string;
  options: {
    minimap: { enabled: boolean };
    fontSize: number;
    lineNumbers: string;
    roundedSelection: boolean;
    scrollBeyondLastLine: boolean;
    automaticLayout: boolean;
    tabSize: number;
    insertSpaces: boolean;
    wordWrap: string;
    contextmenu: boolean;
    selectOnLineNumbers: boolean;
    glyphMargin: boolean;
    folding: boolean;
    foldingHighlight: boolean;
    showFoldingControls: string;
    matchBrackets: string;
    autoIndent: string;
    formatOnPaste: boolean;
    formatOnType: boolean;
    suggestOnTriggerCharacters: boolean;
    acceptSuggestionOnEnter: string;
    snippetSuggestions: string;
  };
}

export interface LibraryScope {
  React: typeof import('react');
  motion: typeof import('framer-motion').motion;
  AnimatePresence: typeof import('framer-motion').AnimatePresence;
  [key: string]: unknown;
}

// AI-related interfaces
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionParams {
  model?: string;
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface Model {
  id: string;
  name?: string;
  type?: string;
}

export interface ClientOptions {
  baseUrl?: string;
  apiEndpoint?: string;
  imageEndpoint?: string;
  defaultModel?: string;
  defaultImageModel?: string;
  apiKey?: string;
  referrer?: string;
  extraHeaders?: Record<string, string>;
  modelAliases?: Record<string, string>;
}

export interface AIPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  currentModel?: string;
}

export interface AICodeGeneratorProps {
  onCodeGenerated: (code: string) => void;
}

export interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (model: string) => void;
  isLoading?: boolean;
}

export interface AvailableModel {
  id: string;
  name: string;
  description: string;
  provider: string;
}

// AI Chat interfaces
export interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  currentModel: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface ChatMessageProps {
  message: AIChatMessage;
  isLatest?: boolean;
}

export interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}
