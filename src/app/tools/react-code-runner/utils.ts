import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LibraryScope } from './types';

// Create the scope object for react-live
export const createLibraryScope = (): LibraryScope => ({
  React,
  motion,
  AnimatePresence,
  // All Lucide icons available directly
  ...LucideIcons
});

// Configure Monaco Editor for better JSX support
export const configureMonacoEditor = (monaco: typeof import('monaco-editor')) => {
  // Configure JavaScript language to support JSX
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types']
  });

  // Add React, Framer Motion, and Lucide types
  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    declare namespace React {
      function useState<T>(initialState: T): [T, (value: T) => void];
      function useEffect(effect: () => void, deps?: any[]): void;
      function useRef<T>(initialValue: T): { current: T };
      function useMemo<T>(factory: () => T, deps: any[]): T;
      function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
      function createElement(type: any, props?: any, ...children: any[]): any;
      interface Component<P = {}, S = {}> {
        render(): any;
      }
    }
    declare const React: any;
    
    declare const motion: {
      div: any;
      span: any;
      p: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
      button: any;
      a: any;
      img: any;
      svg: any;
      path: any;
      circle: any;
      rect: any;
      line: any;
      [key: string]: any;
    };
    
    declare const AnimatePresence: any;
    
    // Common Lucide icons
    declare const Plus: any;
    declare const Minus: any;
    declare const Heart: any;
    declare const Star: any;
    declare const Eye: any;
    declare const Home: any;
    declare const User: any;
    declare const Settings: any;
    declare const Search: any;
    declare const Bell: any;
    declare const Mail: any;
    declare const Calendar: any;
    declare const Clock: any;
    declare const Camera: any;
    declare const Download: any;
    declare const Upload: any;
    declare const Share: any;
    declare const Copy: any;
    declare const Edit: any;
    declare const Trash: any;
    declare const Save: any;
    declare const Check: any;
    declare const X: any;
    declare const ChevronLeft: any;
    declare const ChevronRight: any;
    declare const ChevronUp: any;
    declare const ChevronDown: any;
    declare const ArrowLeft: any;
    declare const ArrowRight: any;
    declare const ArrowUp: any;
    declare const ArrowDown: any;
    declare const Play: any;
    declare const Pause: any;
    declare const Stop: any;
    declare const RotateCcw: any;
    declare const RefreshCw: any;
    declare const Sparkles: any;
    declare const Zap: any;
    declare const Sun: any;
    declare const Moon: any;
    declare const Shield: any;
    declare const Lock: any;
    declare const Unlock: any;
    declare const AlertCircle: any;
    declare const Info: any;
    declare const HelpCircle: any;
    declare const ExternalLink: any;
    declare const Link: any;
    declare const Maximize: any;
    declare const Minimize: any;
    declare const Volume: any;
    declare const VolumeOff: any;
    declare const Wifi: any;
    declare const Battery: any;
    declare const Bluetooth: any;
    declare const ShoppingCart: any;
    declare const CreditCard: any;
    declare const TrendingUp: any;
    declare const Activity: any;
    declare const BarChart: any;
    declare const PieChart: any;
    declare const Target: any;
    declare const Focus: any;
    declare const Palette: any;
    declare const Brush: any;
    declare const Coffee: any;
    declare const Gift: any;
    declare const Trophy: any;
    declare const Gamepad: any;
    declare const Car: any;
    declare const Plane: any;
    declare const MapPin: any;
    declare const Cloud: any;
    declare const Umbrella: any;
    declare const Thermometer: any;
    declare const Droplets: any;
    declare const Mountain: any;
    declare const Tree: any;
    declare const Flower: any;
    declare const Apple: any;
    declare const Pizza: any;
    // And many more Lucide icons are available...
  `, 'libraries.d.ts');
};

// Utility functions for code operations
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    throw error;
  }
};

export const shareCodeViaUrl = (code: string): string => {
  const encodedCode = encodeURIComponent(code);
  return `${window.location.origin}${window.location.pathname}?tool=react-code-runner&code=${encodedCode}`;
};

export const decodeCodeFromUrl = (codeParam: string): string => {
  try {
    return decodeURIComponent(codeParam);
  } catch (error) {
    console.error('Failed to decode code from URL:', error);
    throw error;
  }
};
