# AI Code Generation Examples

This document shows examples of how to use the AI-powered code generation feature in the React Code Runner.

## Basic Usage

1. **Select your AI model** from the model selector dropdown (defaults to DeepSeek R1)
2. Click the "AI Generate" button (magic wand icon) in the code editor header
3. Enter a natural language description of what you want to build
4. Click "Generate Code" or press Ctrl+Enter (Cmd+Enter on Mac)
5. The AI will generate working React code that uses the available libraries

## Available AI Models

The React Code Runner supports multiple AI models via the Pollinations provider:

- **DeepSeek R1** (Recommended) - Advanced reasoning model, best for complex code generation
- **DeepSeek Reasoning** - Optimized for logical reasoning and code structure
- **DeepSeek V3** - Latest DeepSeek model with improved performance
- **GPT-4.1 Mini** - Fast and efficient OpenAI model
- **Llama 4 Scout** - Meta's latest Llama model for code generation
- **Qwen 2.5 Coder** - Specialized coding model from Alibaba
- **Mistral Small 3.1** - Efficient Mistral model for code tasks

**Recommendation**: Use **DeepSeek R1** for the best code generation results. It provides superior reasoning capabilities and generates more accurate, functional React components.

## Example Prompts and Expected Outputs

### Simple Counter
**Prompt:** "Create a simple counter with increment and decrement buttons"

**Generated Code:**
```jsx
function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Counter</h1>
          <div className="text-center mb-6">
            <motion.div
              key={count}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-indigo-600"
            >
              {count}
            </motion.div>
          </div>
          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={() => setCount(count - 1)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minus className="w-4 h-4" />
              Decrease
            </motion.button>
            <motion.button
              onClick={() => setCount(count + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Increase
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

### Todo List
**Prompt:** "Create a todo list with animations"

**Expected Features:**
- Add new todos
- Mark todos as complete
- Delete todos
- Smooth animations for adding/removing items
- Uses Framer Motion for animations
- Styled with TailwindCSS
- Uses appropriate Lucide icons

### Card Component
**Prompt:** "Make a card component with hover effects"

**Expected Features:**
- Hover animations using Framer Motion
- Clean card design with TailwindCSS
- Icons from Lucide React
- Responsive design
- Smooth transitions

### Loading Animation
**Prompt:** "Create a loading spinner animation"

**Expected Features:**
- Rotating spinner using Framer Motion
- Multiple loading states
- Clean, modern design
- Customizable colors and sizes

## Tips for Better AI Generation

### 1. Be Specific
Instead of: "Make a button"
Try: "Create a button with hover animation and an icon"

### 2. Mention Desired Libraries
- "Use Framer Motion for animations"
- "Include Lucide icons"
- "Style with TailwindCSS"

### 3. Specify Functionality
- "Add state management with useState"
- "Include form validation"
- "Make it responsive"

### 4. Describe the UI
- "Modern card design"
- "Gradient background"
- "Clean and minimal"
- "Dark theme"

## Advanced Examples

### Complex Component
**Prompt:** "Create a user profile card with avatar, name, bio, social links, and follow button with animations"

### Interactive Dashboard
**Prompt:** "Build a simple dashboard with cards showing stats, charts, and a sidebar navigation"

### Form Component
**Prompt:** "Create a contact form with validation, error states, and success animation"

## Troubleshooting

### Common Issues

1. **Generated code doesn't work**
   - Try being more specific in your prompt
   - Mention the libraries you want to use explicitly

2. **Missing animations**
   - Add "with Framer Motion animations" to your prompt
   - Specify the type of animation you want

3. **Poor styling**
   - Mention "styled with TailwindCSS"
   - Describe the visual style you want

4. **Missing icons**
   - Add "using Lucide icons" to your prompt
   - Specify which icons you want

### Best Practices

- Start with simple prompts and iterate
- Use the example prompts as inspiration
- Be specific about the functionality you need
- Mention responsive design if needed
- Ask for specific color schemes or themes

The AI system is designed to generate code that works immediately in the React Code Runner environment, utilizing all the pre-loaded libraries for the best development experience.
