# Extending the React Code Runner System

This document shows examples of how to extend the modular React Code Runner system.

## Example 1: Adding a Template System

### 1. Create Template Types

```typescript
// types.ts - Add to existing types
export interface CodeTemplate {
  name: string;
  description: string;
  code: string;
  category: 'basic' | 'animation' | 'ui' | 'advanced';
}

export interface TemplateManagerProps {
  onSelectTemplate: (code: string) => void;
}
```

### 2. Create Template Data

```typescript
// templates.ts - New file
import { CodeTemplate } from './types';

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    name: 'Basic Counter',
    description: 'Simple counter with increment/decrement',
    category: 'basic',
    code: `function App() {
      const [count, setCount] = React.useState(0);
      return (
        <div className="p-8">
          <h1 className="text-2xl mb-4">Count: {count}</h1>
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
        </div>
      );
    }`
  },
  {
    name: 'Animated Card',
    description: 'Card with hover animations',
    category: 'animation',
    code: `function App() {
      return (
        <motion.div
          className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Heart className="w-8 h-8 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Animated Card</h2>
          <p className="text-gray-600">Hover me to see the animation!</p>
        </motion.div>
      );
    }`
  }
];
```

### 3. Create Template Component

```typescript
// components/TemplateManager.tsx - New file
import { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import Button from '@/app/docs/button/button';
import { CODE_TEMPLATES } from '../templates';
import type { TemplateManagerProps } from '../types';

export const TemplateManager = ({ onSelectTemplate }: TemplateManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        iconLeft={<FileText className="w-4 h-4" />}
        iconRight={<ChevronDown className="w-4 h-4" />}
      >
        Templates
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-lg z-10">
          {CODE_TEMPLATES.map((template) => (
            <button
              key={template.name}
              onClick={() => {
                onSelectTemplate(template.code);
                setIsOpen(false);
              }}
              className="w-full text-left p-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              <div className="font-medium text-sm">{template.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {template.description}
              </div>
              <div className="text-xs text-blue-500 mt-1 capitalize">
                {template.category}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 4. Integrate into CodeEditor

```typescript
// components/CodeEditor.tsx - Update existing file
import { TemplateManager } from './TemplateManager';

// In the header section, add:
<div className="flex items-center gap-2">
  <TemplateManager onSelectTemplate={onCodeChange} />
  <Button onClick={handleResetCode}>Reset</Button>
  {/* ... other buttons */}
</div>
```

## Example 2: Adding a New Library (Three.js)

### 1. Install the Library

```bash
npm install three @types/three
```

### 2. Update Library Scope

```typescript
// utils.ts - Update createLibraryScope function
import * as THREE from 'three';

export const createLibraryScope = (): LibraryScope => ({
  React: require('react'),
  motion,
  AnimatePresence,
  THREE, // Add Three.js
  ...LucideIcons
});
```

### 3. Add TypeScript Definitions

```typescript
// utils.ts - Update configureMonacoEditor function
monaco.languages.typescript.javascriptDefaults.addExtraLib(`
  // ... existing declarations
  
  declare const THREE: {
    Scene: any;
    PerspectiveCamera: any;
    WebGLRenderer: any;
    BoxGeometry: any;
    MeshBasicMaterial: any;
    Mesh: any;
    // Add more Three.js types as needed
  };
`, 'libraries.d.ts');
```

### 4. Add Example Template

```typescript
// templates.ts - Add new template
{
  name: '3D Cube',
  description: 'Rotating 3D cube with Three.js',
  category: 'advanced',
  code: `function App() {
    const mountRef = React.useRef(null);
    
    React.useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      
      renderer.setSize(400, 400);
      mountRef.current.appendChild(renderer.domElement);
      
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      
      camera.position.z = 5;
      
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
      
      return () => {
        mountRef.current?.removeChild(renderer.domElement);
      };
    }, []);
    
    return (
      <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl mb-4">Three.js Cube</h1>
        <div ref={mountRef} className="border rounded-lg" />
      </div>
    );
  }`
}
```

## Example 3: Adding Custom Hooks

### 1. Create Custom Hook

```typescript
// hooks/useLocalStorage.ts - New file
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
```

### 2. Export the Hook

```typescript
// hooks/index.ts - Update exports
export { useFullscreen } from './useFullscreen';
export { useCodeFromUrl } from './useCodeFromUrl';
export { useLocalStorage } from './useLocalStorage';
```

### 3. Use in Components

```typescript
// ReactCodeRunner.tsx - Use the new hook
import { useLocalStorage } from './hooks';

const ReactCodeRunner = ({ initialCode = DEFAULT_CODE }: CodeRunnerProps = {}) => {
  const [savedCodes, setSavedCodes] = useLocalStorage<string[]>('saved-codes', []);
  
  // Add save functionality
  const saveCurrentCode = () => {
    setSavedCodes(prev => [...prev, code]);
  };
  
  // ... rest of component
};
```

This modular structure makes it easy to extend the React Code Runner with new features, libraries, and functionality while keeping the codebase organized and maintainable.
