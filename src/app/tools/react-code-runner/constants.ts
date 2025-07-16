// Default React code example with TailwindCSS, Lucide icons, and Framer Motion
export const DEFAULT_CODE = `function App() {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            React Live Runner
          </h1>
          <p className="text-gray-600">
            TailwindCSS + Lucide Icons + Framer Motion
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center mb-6">
            <motion.div
              key={count}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-indigo-600 mb-2"
            >
              {count}
            </motion.div>
            <p className="text-gray-500">Current Count</p>
          </div>

          <div className="flex gap-3 justify-center">
            <motion.button
              onClick={() => setCount(count - 1)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minus className="w-4 h-4" />
              Decrease
            </motion.button>
            
            <motion.button
              onClick={() => setCount(count + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Increase
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500" />
              Toggle Demo
            </h3>
            <motion.button
              onClick={() => setIsVisible(!isVisible)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"
              >
                <Heart className="w-6 h-6 text-pink-500" />
                <div>
                  <p className="font-medium text-gray-800">Amazing!</p>
                  <p className="text-sm text-gray-600">
                    You can use any Lucide icon and Framer Motion animations!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}`;

// Monaco Editor configuration
export const EDITOR_CONFIG = {
  language: 'javascript',
  theme: 'vs-dark',
  options: {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: 'on' as const,
    contextmenu: true,
    selectOnLineNumbers: true,
    glyphMargin: false,
    folding: true,
    foldingHighlight: true,
    showFoldingControls: 'mouseover' as const,
    matchBrackets: 'always' as const,
    autoIndent: 'full' as const,
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on' as const,
    snippetSuggestions: 'top' as const,
  }
};

// Error styling for LiveError component
export const ERROR_STYLES = {
  background: '#fee2e2',
  color: '#dc2626',
  padding: '12px',
  borderRadius: '6px',
  marginTop: '16px',
  fontFamily: 'monospace',
  fontSize: '14px',
  border: '1px solid #fecaca'
};

// Available AI models for code generation
export const AVAILABLE_MODELS = [
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    description: 'Advanced reasoning model, best for complex code generation',
    provider: 'Pollinations'
  },
  {
    id: 'deepseek-reasoning',
    name: 'DeepSeek Reasoning',
    description: 'Optimized for logical reasoning and code structure',
    provider: 'Pollinations'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    description: 'Latest DeepSeek model with improved performance',
    provider: 'Pollinations'
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    description: 'Fast and efficient OpenAI model',
    provider: 'Pollinations'
  },
  {
    id: 'llama-4-scout',
    name: 'Llama 4 Scout',
    description: 'Meta\'s latest Llama model for code generation',
    provider: 'Pollinations'
  },
  {
    id: 'qwen2.5-coder',
    name: 'Qwen 2.5 Coder',
    description: 'Specialized coding model from Alibaba',
    provider: 'Pollinations'
  },
  {
    id: 'mistral-small-3.1',
    name: 'Mistral Small 3.1',
    description: 'Efficient Mistral model for code tasks',
    provider: 'Pollinations'
  }
];

export const DEFAULT_MODEL = 'deepseek-r1';

// Fullscreen CSS utilities
export const FULLSCREEN_STYLES = {
  container: 'fixed inset-0 z-[9999] bg-background flex w-screen h-screen overflow-hidden m-0 p-0',
  normal: 'h-screen bg-background flex'
};

// Chat panel CSS utilities
export const CHAT_PANEL_STYLES = `
  .chat-panel-open .monaco-editor .view-lines .view-line,
  .chat-panel-open .monaco-editor .margin-view-overlays,
  .chat-panel-open .monaco-editor .minimap,
  .chat-panel-open .monaco-editor .decorationsOverviewRuler {
    opacity: 0.15 !important;
    transition: opacity 0.3s ease-in-out !important;
  }

  .chat-panel-open .react-live-preview > div > * {
    opacity: 0.15 !important;
    transition: opacity 0.3s ease-in-out !important;
  }

  .chat-panel-open .monaco-editor .view-lines .view-line span {
    opacity: 0.15 !important;
  }

  .chat-panel-open .monaco-editor .current-line {
    opacity: 0.3 !important;
  }
`;
