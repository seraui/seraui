export { default } from './ReactCodeRunner';

// Export types with explicit naming to avoid conflicts
export type {
  CodeRunnerProps,
  EditorConfig,
  LibraryScope,
  ChatMessage as ChatMessageType,
  ChatCompletionParams,
  Model,
  ClientOptions,
  AICodeGeneratorProps,
  AIPromptModalProps,
  ModelSelectorProps,
  AvailableModel,
  AIChatMessage,
  ChatInputProps,
  ChatMessageProps,
  StreamingTextProps,
  ChatPanelProps
} from './types';

// Export constants
export * from './constants';

// Export utils
export * from './utils';

// Export components with explicit naming to avoid conflicts
export {
  CodeEditor,
  LivePreviewComponent,
  AICodeGenerator,
  AIPromptModal,
  ModelSelector,
  ChatPanel,
  ChatMessage as ChatMessageComponent,
  ChatInput,
  StreamingText
} from './components';

// Export hooks
export * from './hooks';

// Export AI utilities
export * from './ai';
