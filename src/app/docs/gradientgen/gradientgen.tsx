'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Plus, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

const defaultColors = ['#4f46e5', '#06b6d4']; // indigo-600 → cyan-500

// --- Helper functions for color interpolation ---

// Converts a hex color string to an RGB object.
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Converts a single color component (0-255) to its two-digit hex representation.
const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

// Converts an RGB color object to a hex color string.
const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// Calculates an intermediate color between two hex colors.
const interpolateColor = (color1: string, color2: string, factor = 0.5) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return color1; // Fallback if conversion fails
    const result = {
        r: Math.round(rgb1.r + factor * (rgb2.r - rgb1.r)),
        g: Math.round(rgb1.g + factor * (rgb2.g - rgb1.g)),
        b: Math.round(rgb1.b + factor * (rgb2.b - rgb1.b)),
    };
    return rgbToHex(result.r, result.g, result.b);
};

// Generates an array of intermediate colors for a smoother gradient.
const getSmoothedColors = (colorList: string[], steps = 8) => {
    if (colorList.length < 2) return colorList;
    const smoothed: string[] = [];
    for (let i = 0; i < colorList.length - 1; i++) {
        const c1 = colorList[i];
        const c2 = colorList[i + 1];
        for (let j = 0; j < steps; j++) {
            smoothed.push(interpolateColor(c1, c2, j / steps));
        }
    }
    smoothed.push(colorList[colorList.length - 1]);
    return smoothed;
}


export default function Gradientgen() {
    /* ---------------- state --------------- */
    const [colors, setColors] = useState(defaultColors);
    const [smooth, setSmooth] = useState(true);
    const [type, setType] = useState('linear'); // linear | radial | conic
    const [angle, setAngle] = useState(45);       // only for linear

    // Use next-themes hook for proper theme detection
    const { theme, resolvedTheme } = useTheme();
    const isDark = theme === 'dark' || resolvedTheme === 'dark';

    /* ------------ helpers ----------------- */
    const displayColors = smooth ? getSmoothedColors(colors) : colors;
    const colorStops = displayColors.join(',');

    const gradientCss = (() => {
        if (type === 'linear')
            return `linear-gradient(${angle}deg, ${colorStops})`;
        if (type === 'radial')
            return `radial-gradient(circle, ${colorStops})`;
        return `conic-gradient(${colorStops})`;
    })();

    const handleColorChange = (i: number, value: string) =>
        setColors(prev => prev.map((c, idx) => (idx === i ? value : c)));

    const addColor = () => setColors(prev => [...prev, '#ffffff']);

    // Custom dark background color
    const darkBg = '#040609';
    const cardBgStyle = { backgroundColor: isDark ? darkBg : 'white' };

    /* --------------- render --------------- */
    return (
        <div className="mx-auto max-w-xl p-4 sm:p-6 font-sans">
            {/* 🔵 Top card */}
            <section
                className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4 sm:p-6"
                style={cardBgStyle}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {colors.map((c, i) => (
                            <ColorSwatch
                                key={i}
                                color={c}
                                onRemove={() => setColors(prev => prev.filter((_, idx) => idx !== i))}
                                canRemove={colors.length > 2}
                                onChange={val => handleColorChange(i, val)}
                            />
                        ))}
                        <button
                            onClick={addColor}
                            className="h-8 w-8 rounded-full border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 transition-colors"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? darkBg : '#f3f4f6';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                            title="Add color"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <button
                        onClick={() => setSmooth(s => !s)}
                        className={clsx(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
                            smooth
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                                : 'bg-gray-50 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400',
                            'hover:shadow-md transition-all duration-200'
                        )}
                        style={!smooth ? { backgroundColor: isDark ? darkBg : '#f9fafb' } : undefined}
                    >
                        <ArrowRightLeft size={16} />
                        <span>Smoothen</span>
                    </button>
                </div>
                <div className="mt-6 relative">
                    <div
                        style={{ background: gradientCss }}
                        className="w-full h-52 rounded-xl transition-all duration-200 ring-1 ring-gray-200 dark:ring-gray-700"
                    />
                    <div className="absolute inset-x-4 -bottom-4 h-6 rounded-xl blur-md bg-black/20 dark:bg-black/40 opacity-20 pointer-events-none" />
                </div>
            </section>

            {/* 🎛 Controls */}
            <section
                className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 mt-6 p-4 sm:p-6 flex flex-col gap-6"
                style={cardBgStyle}
            >
                <GradientTypeTabs active={type} onChange={setType} isDark={isDark} />
                {type === 'linear' && <AngleKnob angle={angle} onChange={setAngle} isDark={isDark} />}
            </section>

            {/* 📄 Code Output */}
            <CodeOutput
                type={type}
                angle={angle}
                colorStops={colorStops}
                gradientCss={gradientCss}
                isDark={isDark}
            />
        </div>
    )
}

/* ---------------------------------------------------------------- */
/* ----------------------- Sub-Components ------------------------- */
/* ---------------------------------------------------------------- */

interface ColorSwatchProps {
    color: string;
    onChange: (value: string) => void;
    onRemove: () => void;
    canRemove: boolean;
}

function ColorSwatch({ color, onChange, onRemove, canRemove }: ColorSwatchProps) {
    return (
        <div className="relative group">
            <label
                className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-700 shadow-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-indigo-200 dark:hover:ring-indigo-400 hover:ring-offset-white dark:hover:ring-offset-gray-800 block transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: color }}
            >
                <input
                    type="color"
                    className="sr-only"
                    value={color}
                    onChange={e => onChange(e.target.value)}
                />
            </label>
            {canRemove && (
                <button onClick={onRemove} className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex transition-all duration-200 shadow-md">
                    &times;
                </button>
            )}
        </div>
    )
}

interface GradientTypeTabsProps {
    active: string;
    onChange: (type: string) => void;
    isDark: boolean;
}

function GradientTypeTabs({ active, onChange, isDark }: GradientTypeTabsProps) {
    const tabs = ['linear', 'radial', 'conic'] as const;
    const darkBg = '#040609';

    return (
        <div
            className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full"
            style={{ backgroundColor: isDark ? darkBg : '#f3f4f6' }}
        >
            {tabs.map(t => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    className={clsx(
                        'px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200',
                        active === t
                            ? 'bg-white text-indigo-600 dark:text-indigo-400 shadow-md border border-gray-200 dark:border-gray-600'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
                    )}
                    style={active === t ? { backgroundColor: isDark ? darkBg : 'white' } : undefined}
                    onMouseEnter={(e) => {
                        if (active !== t) {
                            e.currentTarget.style.backgroundColor = isDark ? `${darkBg}80` : 'rgba(255,255,255,0.5)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (active !== t) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }
                    }}
                >
                    {t}
                </button>
            ))}
        </div>
    )
}

interface AngleKnobProps {
    angle: number;
    onChange: (angle: number) => void;
    isDark: boolean;
}

function AngleKnob({ angle, onChange, isDark }: AngleKnobProps) {
    const knobRef = useRef<HTMLDivElement>(null);

    const handlePointer = useCallback((e: PointerEvent | TouchEvent) => {
        if (!knobRef.current) return;
        const knob = knobRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - (knob.left + knob.width / 2);
        const y = clientY - (knob.top + knob.height / 2);
        const deg = Math.round((Math.atan2(y, x) * 180) / Math.PI + 90);
        onChange((deg + 360) % 360);
    }, [onChange]);

    const handleInteraction = useCallback((e: React.PointerEvent | React.TouchEvent) => {
        e.preventDefault();
        handlePointer(e.nativeEvent);
        const move = (ev: PointerEvent | TouchEvent) => handlePointer(ev);
        const up = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('touchmove', move);
            window.removeEventListener('touchend', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', up);
    }, [handlePointer]);

    return (
        <div className="flex items-center gap-4 justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Angle</span>
            <div
                ref={knobRef}
                onPointerDown={handleInteraction}
                onTouchStart={handleInteraction}
                className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-900/20 dark:via-[#040609] dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 cursor-pointer select-none flex items-center justify-center touch-none shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
                <div
                    className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 absolute shadow-sm"
                    style={{
                        top: '8px',
                        left: 'calc(50% - 4px)',
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '4px 40px',
                    }}
                />
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{angle}°</span>
            </div>
        </div>
    )
}

interface CodeOutputProps {
    type: string;
    angle: number;
    colorStops: string;
    gradientCss: string;
    isDark: boolean;
}

function CodeOutput({ type, angle, colorStops, gradientCss, isDark }: CodeOutputProps) {
    const [activeTab, setActiveTab] = useState('css');
    const [copied, setCopied] = useState(false);

    const tailwindClass = (() => {
        // Tailwind's arbitrary value syntax requires spaces to be underscores.
        const safeColorStops = colorStops.replace(/ /g, '_');
        if (type === 'linear') return `bg-[linear-gradient(${angle}deg,${safeColorStops})]`;
        if (type === 'radial') return `bg-[radial-gradient(circle,${safeColorStops})]`;
        return `bg-[conic-gradient(${safeColorStops})]`;
    })();

    const cssCode = `background: ${gradientCss};`;
    const codeToDisplay = activeTab === 'css' ? cssCode : tailwindClass;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeToDisplay);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
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
                <div
                    className="flex gap-1 p-1 bg-gray-100 rounded-lg"
                    style={tabsBgStyle}
                >
                    <button
                        onClick={() => setActiveTab('css')}
                        className={clsx(
                            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                            activeTab === 'css'
                                ? 'bg-white text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
                        )}
                        style={activeTab === 'css' ? { backgroundColor: isDark ? darkBg : 'white' } : undefined}
                        onMouseEnter={(e) => {
                            if (activeTab !== 'css') {
                                e.currentTarget.style.backgroundColor = isDark ? `${darkBg}80` : 'rgba(255,255,255,0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
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
                        style={activeTab === 'tailwind' ? { backgroundColor: isDark ? darkBg : 'white' } : undefined}
                        onMouseEnter={(e) => {
                            if (activeTab !== 'tailwind') {
                                e.currentTarget.style.backgroundColor = isDark ? `${darkBg}80` : 'rgba(255,255,255,0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== 'tailwind') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        Tailwind
                    </button>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 shadow-sm"
                    style={copyBtnBgStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? '#0a0e14' : '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
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
                <code className="text-sm font-mono">
                    {codeToDisplay}
                </code>
            </pre>
        </section>
    );
}

