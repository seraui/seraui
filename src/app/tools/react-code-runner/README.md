# React Code Runner

A modular React live code editor with built-in support for TailwindCSS, Lucide Icons, and Framer Motion.

## 📁 Project Structure

```
react-code-runner/
├── README.md                    # This documentation
├── index.ts                     # Main exports
├── ReactCodeRunner.tsx          # Main component
├── types.ts                     # TypeScript interfaces
├── constants.ts                 # Configuration constants
├── utils.ts                     # Utility functions
├── components/
│   ├── index.ts                 # Component exports
│   ├── CodeEditor.tsx           # Monaco editor component
│   ├── LivePreview.tsx          # React-live preview component
│   ├── AICodeGenerator.tsx      # AI code generation button
│   └── AIPromptModal.tsx        # AI prompt input modal
├── hooks/
│   ├── index.ts                 # Hook exports
│   ├── useFullscreen.ts         # Fullscreen functionality
│   ├── useCodeFromUrl.ts        # URL parameter handling
│   └── useAICodeGenerator.ts    # AI code generation logic
├── ai/
│   ├── index.ts                 # AI exports
│   ├── client.ts                # AI client library
│   └── codeGenerator.ts         # Code generation service
└── examples/
    └── extending-system.md      # Extension examples
```

## 🧩 Components

### `ReactCodeRunner`
Main component that orchestrates the entire code runner experience.

### `CodeEditor`
- Monaco Editor with JSX syntax highlighting
- TypeScript intellisense for React, Framer Motion, and Lucide icons
- Copy, Reset, and Share functionality
- Configurable editor options

### `LivePreview`
- Real-time React component preview
- Error display with styled error messages
- Fullscreen toggle functionality
- Pre-configured library scope

### `AICodeGenerator`
- AI-powered code generation button
- Integration with multiple AI providers
- Error handling and loading states
- Seamless integration with editor

### `AIPromptModal`
- Clean modal interface for AI prompts
- Example prompts for inspiration
- Keyboard shortcuts (Ctrl+Enter to generate)
- Responsive design with accessibility features

### `ModelSelector`
- Dropdown for selecting AI models
- Shows model descriptions and providers
- Highlights recommended models (DeepSeek R1)
- Responsive design with model information

### `ChatPanel`
- Collapsible AI chat interface positioned between editor and preview
- Real-time streaming responses with typewriter effect
- Message history with timestamps and user/AI avatars
- Smooth slide animations for panel open/close
- Auto-hides text content in editor and preview when open

### `ChatMessage`
- Individual chat message component with role-based styling
- Streaming text animation for AI responses
- User and AI avatar differentiation
- Timestamp display

### `ChatInput`
- Text input with send button for chat messages
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Loading states and disabled states
- Auto-resize textarea

### `StreamingText`
- Typewriter effect component for AI response animation
- Configurable typing speed
- Completion callback support

## 🪝 Hooks

### `useFullscreen`
Manages true fullscreen state with automatic element hiding and keyboard shortcuts. Provides full height/width coverage while hiding navigation, headers, footers, and other page elements automatically.

### `useCodeFromUrl`
Handles loading and saving code from URL parameters for sharing functionality.

### `useAICodeGenerator`
Manages AI code generation state, API calls, and error handling.

### `useAIChat`
Handles AI chat functionality with streaming responses, message history, and error management.

### `useChatPanel`
Manages chat panel visibility state and applies text hiding styles when chat is open.

## 🛠️ Utilities

### Library Scope
Pre-configured scope with:
- React hooks and components
- All Lucide icons (accessible by name)
- Framer Motion (`motion` and `AnimatePresence`)

### Monaco Configuration
- JSX syntax support
- TypeScript definitions for all included libraries
- Optimized editor settings for React development

### AI Services
- **CodeGenerator**: Handles AI-powered code generation with optimized prompts
- **Client**: Flexible AI client supporting multiple providers (Pollinations, DeepInfra, HuggingFace, Together)
- **Error Handling**: Robust error handling with user-friendly messages

## 🎯 Usage

```tsx
import ReactCodeRunner from './react-code-runner';

// Basic usage
<ReactCodeRunner />

// With custom initial code
<ReactCodeRunner
  initialCode={customCode}
  onCodeChange={(code) => console.log('Code changed:', code)}
/>
```

## 🤖 AI Code Generation

The React Code Runner includes powerful AI-powered code generation capabilities:

### How to Use AI Generation

1. **Select your preferred AI model** using the model selector dropdown (defaults to DeepSeek R1)
2. **Click the "AI Generate" button** in the code editor header (magic wand icon)
3. **Describe your component** in natural language in the modal that appears
4. **Click "Generate Code"** or press Ctrl+Enter (Cmd+Enter on Mac)
5. **Watch as AI generates** working React code that uses TailwindCSS, Lucide icons, and Framer Motion

### Example Prompts

- "Create a todo list with animations"
- "Make a card component with hover effects"
- "Build a simple calculator"
- "Design a user profile card"
- "Create a loading spinner animation"
- "Make a responsive navigation menu"

### AI Features

- **Model Selection**: Choose from multiple AI models (DeepSeek R1, DeepSeek V3, GPT-4.1 Mini, etc.)
- **Smart Prompting**: Optimized system prompts ensure generated code works with available libraries
- **Multiple Providers**: Support for Pollinations, DeepInfra, HuggingFace, and Together AI
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Visual feedback during code generation
- **Example Suggestions**: Built-in example prompts for inspiration
- **Default Model**: Uses DeepSeek R1 for best code generation results

## 💬 AI Chat Interface

The React Code Runner includes an integrated AI chat assistant that provides real-time help and guidance:

### How to Use AI Chat

1. **Open Chat Panel**: Click the "Chat" button in the code editor header
2. **Ask Questions**: Type your questions or requests in the chat input
3. **Get Real-time Responses**: Watch AI responses stream in with typewriter animation
4. **Focused Environment**: Text content in editor and preview automatically dims for distraction-free chat

### Chat Features

- **Streaming Responses**: Real-time AI responses with typewriter effect
- **Message History**: Persistent conversation history with timestamps
- **Smart Context**: AI understands the React Code Runner environment
- **Responsive Design**: Adapts to different screen sizes (300px-400px width)
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines
- **Error Handling**: Graceful error handling with retry options

### What You Can Ask

- **React Questions**: "How do I use useEffect with dependencies?"
- **Code Help**: "Explain this React pattern to me"
- **Debugging**: "Why isn't my component re-rendering?"
- **Best Practices**: "What's the best way to handle form state?"
- **Library Usage**: "How do I create animations with Framer Motion?"
- **Styling Help**: "Show me TailwindCSS grid examples"

### Chat Interface

- **User Messages**: Blue background with user avatar
- **AI Responses**: Gray background with bot avatar and streaming animation
- **Timestamps**: Show when each message was sent
- **Clear Chat**: Reset conversation history
- **Auto-scroll**: Automatically scrolls to latest messages

## 🔧 Extending the System

### Adding New Libraries

1. **Update `utils.ts`**: Add the library to `createLibraryScope()`
2. **Update `utils.ts`**: Add TypeScript definitions in `configureMonacoEditor()`
3. **Update `constants.ts`**: Add example usage to `DEFAULT_CODE`

### Adding New Components

1. Create component in `components/` directory
2. Export from `components/index.ts`
3. Import and use in `ReactCodeRunner.tsx`

### Adding New Hooks

1. Create hook in `hooks/` directory
2. Export from `hooks/index.ts`
3. Import and use in components as needed

## 📦 Dependencies

- `@monaco-editor/react` - Code editor
- `react-live` - Live React component preview
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS framework

## 🚀 Features

- ✅ Real-time code execution
- ✅ Syntax highlighting and intellisense
- ✅ Error handling and display
- ✅ **True fullscreen mode** (full height/width, auto-hide other elements)
- ✅ Code sharing via URL
- ✅ Copy/paste functionality
- ✅ Reset to default code
- ✅ Responsive design
- ✅ Dark/light theme support
- ✅ All Lucide icons available
- ✅ Framer Motion animations
- ✅ TailwindCSS styling
- ✅ **AI-powered code generation**
- ✅ **Natural language to React code**
- ✅ **Multiple AI model selection**
- ✅ **DeepSeek R1 as default model**
- ✅ **Multiple AI provider support**
- ✅ **Smart prompt engineering**
- ✅ **Example prompts and suggestions**
- ✅ **Integrated AI chat interface**
- ✅ **Real-time streaming responses**
- ✅ **Typewriter animation effects**
- ✅ **Auto-hide text content during chat**
- ✅ **Message history and timestamps**
