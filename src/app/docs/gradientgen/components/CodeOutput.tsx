'use client';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';

interface CodeOutputProps {
  type: string;
  angle: number;
  colorStops: string;
  gradientCss: string;
  isDark: boolean;
  isAnimated: boolean;
  animationSpeed: number;
  radialPosition: { x: number; y: number };
  conicAngle: number;
}

export function CodeOutput({
  type,
  angle,
  colorStops,
  gradientCss,
  isDark,
  isAnimated,
  animationSpeed,
}: CodeOutputProps) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const tailwindClass = (() => {
    // Tailwind's arbitrary value syntax requires spaces to be underscores.
    const safeColorStops = colorStops.replace(/ /g, '_');
    if (type === 'linear') return `bg-[linear-gradient(${angle}deg,${safeColorStops})]`;
    if (type === 'radial') return `bg-[radial-gradient(circle,${safeColorStops})]`;
    return `bg-[conic-gradient(${safeColorStops})]`;
  })();

  const generateAnimationCode = () => {
    const animationName = `gradient-animation`;
    let keyframes = '';

    if (type === 'linear') {
      keyframes = `@keyframes ${animationName} {
  0% { background: linear-gradient(0deg, ${colorStops}); }
  25% { background: linear-gradient(90deg, ${colorStops}); }
  50% { background: linear-gradient(180deg, ${colorStops}); }
  75% { background: linear-gradient(270deg, ${colorStops}); }
  100% { background: linear-gradient(360deg, ${colorStops}); }
}

.animated-gradient {
  animation: ${animationName} ${animationSpeed}s linear infinite;
}`;
    } else if (type === 'conic') {
      keyframes = `@keyframes ${animationName} {
  0% { background: conic-gradient(from 0deg, ${colorStops}); }
  25% { background: conic-gradient(from 90deg, ${colorStops}); }
  50% { background: conic-gradient(from 180deg, ${colorStops}); }
  75% { background: conic-gradient(from 270deg, ${colorStops}); }
  100% { background: conic-gradient(from 360deg, ${colorStops}); }
}

.animated-gradient {
  animation: ${animationName} ${animationSpeed}s linear infinite;
}`;
    } else if (type === 'radial') {
      keyframes = `@keyframes ${animationName} {
  0% { background: radial-gradient(circle at 80% 50%, ${colorStops}); }
  25% { background: radial-gradient(circle at 50% 80%, ${colorStops}); }
  50% { background: radial-gradient(circle at 20% 50%, ${colorStops}); }
  75% { background: radial-gradient(circle at 50% 20%, ${colorStops}); }
  100% { background: radial-gradient(circle at 80% 50%, ${colorStops}); }
}

.animated-gradient {
  animation: ${animationName} ${animationSpeed}s linear infinite;
}`;
    }

    return keyframes;
  };

  const cssCode = `background: ${gradientCss};`;
  const animationCode = generateAnimationCode();

  const codeToDisplay = (() => {
    if (activeTab === 'css') return cssCode;
    if (activeTab === 'tailwind') return tailwindClass;
    if (activeTab === 'animation') return animationCode;
    return cssCode;
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeToDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = codeToDisplay;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const darkBg = '#040609';
  const cardBgStyle = { backgroundColor: isDark ? darkBg : 'white' };
  const tabsBgStyle = { backgroundColor: isDark ? darkBg : '#f3f4f6' };
  const copyBtnBgStyle = { backgroundColor: isDark ? darkBg : '#f9fafb' };
  const preBgStyle = { backgroundColor: isDark ? darkBg : '#1e293b' };

  return (
    <section
      className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 mt-6 p-4 sm:p-6"
      style={cardBgStyle}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg" style={tabsBgStyle}>
          <button
            onClick={() => setActiveTab('css')}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === 'css'
                ? 'bg-white text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
            )}
            style={activeTab === 'css' ? { backgroundColor: isDark ? darkBg : 'white' } : undefined}
            onMouseEnter={e => {
              if (activeTab !== 'css') {
                e.currentTarget.style.backgroundColor = isDark
                  ? `${darkBg}80`
                  : 'rgba(255,255,255,0.5)';
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== 'css') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab('tailwind')}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === 'tailwind'
                ? 'bg-white text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
            )}
            style={
              activeTab === 'tailwind' ? { backgroundColor: isDark ? darkBg : 'white' } : undefined
            }
            onMouseEnter={e => {
              if (activeTab !== 'tailwind') {
                e.currentTarget.style.backgroundColor = isDark
                  ? `${darkBg}80`
                  : 'rgba(255,255,255,0.5)';
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== 'tailwind') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            Tailwind
          </button>
          {isAnimated && (
            <button
              onClick={() => setActiveTab('animation')}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                activeTab === 'animation'
                  ? 'bg-white text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
              )}
              style={
                activeTab === 'animation'
                  ? { backgroundColor: isDark ? darkBg : 'white' }
                  : undefined
              }
              onMouseEnter={e => {
                if (activeTab !== 'animation') {
                  e.currentTarget.style.backgroundColor = isDark
                    ? `${darkBg}80`
                    : 'rgba(255,255,255,0.5)';
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== 'animation') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Animation
            </button>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 shadow-sm"
          style={copyBtnBgStyle}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = isDark ? '#0a0e14' : '#f3f4f6';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = isDark ? darkBg : '#f9fafb';
          }}
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre
        className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto border border-slate-700 dark:border-gray-700"
        style={preBgStyle}
      >
        <code className="text-sm font-mono">{codeToDisplay}</code>
      </pre>
    </section>
  );
}
