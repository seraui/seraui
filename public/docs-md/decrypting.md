# Decrypting Text 

A mesmerizing text animation component that simulates the process of decrypting or revealing text character by character. Perfect for creating dramatic reveals, loading states, or adding a cyberpunk aesthetic to your applications.

## 🎬 Live Demo
Watch the decrypting animation in action:

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/decrypting/decrypting.tsx`

## ✨ Features

- **🔐 Scrambling Effect**: Characters scramble with random symbols before revealing the final text
- **⚡ Customizable Speed**: Control the animation speed to match your design needs
- **🎯 Character-by-Character Reveal**: Progressive revelation from left to right
- **🎨 Smooth Transitions**: Built with Framer Motion for buttery smooth animations
- **📱 Responsive Design**: Adapts beautifully to different screen sizes
- **🔧 TypeScript Support**: Fully typed for better development experience

## 🚀 Quick Start

### Basic Usage

```tsx

function App() {
  return (
    
  );
}
```

### Advanced Example

```tsx

function CyberpunkInterface() {
  const [currentMessage, setCurrentMessage] = useState("SYSTEM INITIALIZING...");

  const messages = [
    "SYSTEM INITIALIZING...",
    "ACCESSING MAINFRAME...",
    "DECRYPTING DATA...",
    "ACCESS GRANTED"
  ];

  return (

       {
          const nextIndex = (messages.indexOf(currentMessage) + 1) % messages.length;
          setCurrentMessage(messages[nextIndex]);
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-black"
      >
        Next Message

  );
}
```

## 📋 API Reference

### Props

targetText,
      string,
      Required,
      "The final text to be revealed after decryption"
    ],
    [
      speed,
      number,
      8,
      "Controls animation speed (lower = faster, higher = slower)"
    ]
  ]}
/>

### Animation Behavior

- **Character Pool**: Uses A-Z, a-z, and special symbols (`!@#$%^&*()-+=[]{}|;:,.<>?`)
- **Reveal Pattern**: Characters are revealed sequentially from left to right
- **Space Handling**: Spaces are preserved and not scrambled
- **Performance**: Uses `requestAnimationFrame` for smooth 60fps animations

## 🎨 Styling Guide

The component uses these default classes:

```css
.decrypting-text {
  @apply text-2xl md:text-4xl lg:text-5xl
         font-bold text-center break-words
         z-10 text-gray-200;
}
```

### Custom Styling

```tsx
// Override with custom classes

```

## 🎯 Use Cases

### 1. **Loading States**
Perfect for indicating system processes or data loading:

```tsx

```

### 2. **Hero Sections**
Create dramatic text reveals for landing pages:

```tsx

```

### 3. **Gaming Interfaces**
Add cyberpunk aesthetics to game UIs:

```tsx

```

### 4. **Terminal Simulations**
Simulate command-line interfaces:

```tsx

```

## 🔧 Customization Examples

### Slow Dramatic Reveal

```tsx

```

### Fast Hacker-Style

```tsx

```

### Multi-line Poetry

```tsx

```

## 🎪 Interactive Playground

Try different configurations and see the results instantly:

  🔬 Experiment Zone
  
    Modify the component above using the reload button to see different speed settings and text combinations.

      Speed Settings:
      
        • Speed 1-3: Lightning fast
        • Speed 4-8: Balanced
        • Speed 9-15: Dramatic slow

      Best Practices:
      
        • Use monospace fonts
        • Dark backgrounds work best
        • Keep text concise for impact

## 🚨 Performance Notes

- Uses `requestAnimationFrame` for optimal performance
- Automatically cleans up animations on unmount
- Minimal re-renders with efficient state management
- Handles edge cases like empty strings and special characters

## 🎭 Animation Inspiration

This component draws inspiration from:
- **Matrix-style** digital rain effects
- **Cyberpunk** terminal interfaces
- **Hacker movie** decryption sequences
- **Retro computer** boot screens

Perfect for creating that authentic "digital archaeology" feeling where secrets are gradually unearthed from the digital realm! 🕵️‍♂️✨

---

**Component Path:** `decrypting\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
