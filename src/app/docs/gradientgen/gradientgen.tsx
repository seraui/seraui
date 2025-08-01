'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  ArrowRightLeft,
  Shuffle,
  Download,
  Upload,
  Palette,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

// Components
import { ColorSwatch } from './components/ColorSwatch';
import { GradientTypeTabs } from './components/GradientTypeTabs';
import { AngleKnob } from './components/AngleKnob';
import { RadialPositionControl } from './components/RadialPositionControl';
import { ConicAngleControl } from './components/ConicAngleControl';
import { CodeOutput } from './components/CodeOutput';

// Constants and utilities
import { gradientPresets, defaultColors } from './constants/gradientPresets';
import { generateRandomColor, getSmoothedColors } from './utils/colorUtils';
import {
  exportGradient,
  exportAnimatedCSS,
  exportAnimatedHTML,
  importGradient,
} from './utils/exportUtils';

export default function Gradientgen() {
  /* ---------------- state --------------- */
  const [colors, setColors] = useState(defaultColors);
  const [smooth, setSmooth] = useState(true);
  const [type, setType] = useState('linear'); // linear | radial | conic
  const [angle, setAngle] = useState(45); // only for linear
  const [history, setHistory] = useState<Array<{ colors: string[]; type: string; angle: number }>>(
    []
  );
  const [showPresets, setShowPresets] = useState(false);
  const [radialPosition, setRadialPosition] = useState({ x: 50, y: 50 }); // for radial gradients
  const [conicAngle, setConicAngle] = useState(0); // for conic gradients
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(3); // seconds for full rotation
  const [showExportMenu, setShowExportMenu] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  // Use next-themes hook for proper theme detection
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  // Save to history when gradient changes
  useEffect(() => {
    const currentState = { colors, type, angle };
    setHistory(prev => {
      const newHistory = [currentState, ...prev.slice(0, 9)]; // Keep last 10
      return newHistory;
    });
  }, [colors, type, angle]);

  // Animation effect
  useEffect(() => {
    if (!isAnimated) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / (animationSpeed * 1000)) % 1;

      if (type === 'linear') {
        setAngle(Math.round(progress * 360));
      } else if (type === 'conic') {
        setConicAngle(Math.round(progress * 360));
      } else if (type === 'radial') {
        // For radial, animate the position in a circular motion
        const centerX = 50 + 30 * Math.cos(progress * 2 * Math.PI);
        const centerY = 50 + 30 * Math.sin(progress * 2 * Math.PI);
        setRadialPosition({
          x: Math.round(Math.max(10, Math.min(90, centerX))),
          y: Math.round(Math.max(10, Math.min(90, centerY))),
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimated, animationSpeed, type]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /* ------------ helpers ----------------- */
  const displayColors = smooth ? getSmoothedColors(colors) : colors;
  const colorStops = displayColors.join(',');

  const gradientCss = (() => {
    if (type === 'linear') return `linear-gradient(${angle}deg, ${colorStops})`;
    if (type === 'radial')
      return `radial-gradient(circle at ${radialPosition.x}% ${radialPosition.y}%, ${colorStops})`;
    return `conic-gradient(from ${conicAngle}deg, ${colorStops})`;
  })();

  const handleColorChange = (i: number, value: string) =>
    setColors(prev => prev.map((c, idx) => (idx === i ? value : c)));

  const addColor = () => setColors(prev => [...prev, '#ffffff']);

  const randomizeColors = () => {
    const numColors = Math.floor(Math.random() * 3) + 2; // 2-4 colors
    const newColors = Array.from({ length: numColors }, () => generateRandomColor());
    setColors(newColors);
  };

  const applyPreset = (preset: (typeof gradientPresets)[0]) => {
    setColors(preset.colors);
    setShowPresets(false);
  };

  const resetToDefault = () => {
    setColors(defaultColors);
    setType('linear');
    setAngle(45);
    setRadialPosition({ x: 50, y: 50 });
    setConicAngle(0);
    setSmooth(true);
  };

  const handleExportGradient = () => {
    exportGradient({
      colors,
      type,
      angle,
      radialPosition,
      conicAngle,
      smooth,
      isAnimated,
      animationSpeed,
    });
  };

  const handleExportAnimatedCSS = () => {
    exportAnimatedCSS(type, colorStops, animationSpeed);
  };

  const handleExportAnimatedHTML = () => {
    exportAnimatedHTML(type, colorStops, animationSpeed);
  };

  const handleImportGradient = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importGradient(
      file,
      data => {
        if (data.colors) setColors(data.colors);
        if (data.type) setType(data.type);
        if (data.angle !== undefined) setAngle(data.angle);
        if (data.radialPosition) setRadialPosition(data.radialPosition);
        if (data.conicAngle !== undefined) setConicAngle(data.conicAngle);
        if (data.smooth !== undefined) setSmooth(data.smooth);
        if (data.isAnimated !== undefined) setIsAnimated(data.isAnimated);
        if (data.animationSpeed !== undefined) setAnimationSpeed(data.animationSpeed);
      },
      error => {
        console.error('Failed to import gradient:', error);
      }
    );
    event.target.value = ''; // Reset input
  };

  const restoreFromHistory = (historyItem: (typeof history)[0]) => {
    setColors(historyItem.colors);
    setType(historyItem.type);
    setAngle(historyItem.angle);
  };

  // Custom dark background color
  const darkBg = '#040609';
  const cardBgStyle = { backgroundColor: isDark ? darkBg : 'white' };

  /* --------------- render --------------- */
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 font-sans">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
        {/* Left Panel - Tools */}
        <div className="lg:col-span-2 space-y-6">
          {/* Color Controls */}
          <section
            className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4"
            style={cardBgStyle}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Colors</h3>
            <div className="flex flex-wrap items-center gap-2 mb-4">
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
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = isDark ? darkBg : '#f3f4f6';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Add color"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={randomizeColors}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                title="Randomize colors"
              >
                <Shuffle size={16} />
                <span>Random</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                  title="Gradient presets"
                >
                  <Palette size={16} />
                  <span>Presets</span>
                </button>

                {showPresets && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg z-10 p-2 max-h-80 overflow-y-auto"
                    style={cardBgStyle}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {gradientPresets.map(preset => (
                        <button
                          key={preset.name}
                          onClick={() => applyPreset(preset)}
                          className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                          title={preset.name}
                        >
                          <div
                            className="w-full h-6 rounded mb-1"
                            style={{
                              background: `linear-gradient(45deg, ${preset.colors.join(',')})`,
                            }}
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Gradient Type & Controls */}
          <section
            className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4"
            style={cardBgStyle}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Type & Controls
            </h3>
            <div className="space-y-6">
              <GradientTypeTabs active={type} onChange={setType} isDark={isDark} />
              {type === 'linear' && <AngleKnob angle={angle} onChange={setAngle} />}
              {type === 'radial' && (
                <RadialPositionControl
                  position={radialPosition}
                  onChange={setRadialPosition}
                  isDark={isDark}
                />
              )}
              {type === 'conic' && (
                <ConicAngleControl angle={conicAngle} onChange={setConicAngle} isDark={isDark} />
              )}
            </div>
          </section>

          {/* Animation Controls */}
          <section
            className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4"
            style={cardBgStyle}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Animation
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAnimated(!isAnimated)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
                    isAnimated
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400'
                      : 'bg-gray-50 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400',
                    'hover:shadow-md transition-all duration-200'
                  )}
                  style={!isAnimated ? { backgroundColor: isDark ? darkBg : '#f9fafb' } : undefined}
                  title="Toggle animation"
                >
                  {isAnimated ? <Pause size={16} /> : <Play size={16} />}
                  <span>Animate</span>
                </button>

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

              {/* Animation Speed Control */}
              {isAnimated && (
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Speed:
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Slow</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={animationSpeed}
                      onChange={e => setAnimationSpeed(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((animationSpeed - 1) / 9) * 100}%, #e5e7eb ${((animationSpeed - 1) / 9) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Fast</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[3rem]">
                    {animationSpeed}s
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Export & Import */}
          <section
            className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4"
            style={cardBgStyle}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Export & Import
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                title="Reset to default"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                  title="Export options"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>

                {showExportMenu && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg z-10 p-2"
                    style={cardBgStyle}
                  >
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleExportGradient();
                          setShowExportMenu(false);
                        }}
                        className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-medium text-sm text-gray-700 dark:text-gray-200">
                          Export Config
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Save gradient settings as JSON
                        </div>
                      </button>

                      {isAnimated && (
                        <>
                          <button
                            onClick={() => {
                              handleExportAnimatedCSS();
                              setShowExportMenu(false);
                            }}
                            className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="font-medium text-sm text-gray-700 dark:text-gray-200">
                              Export Animated CSS
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              CSS keyframes for animation
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              handleExportAnimatedHTML();
                              setShowExportMenu(false);
                            }}
                            className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="font-medium text-sm text-gray-700 dark:text-gray-200">
                              Export HTML Demo
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Complete HTML page with animation
                            </div>
                          </button>
                        </>
                      )}

                      {!isAnimated && (
                        <div className="p-2 text-xs text-gray-400 dark:text-gray-500 italic border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                          Enable animation to export animated gradients
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <label
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                title="Import gradient"
              >
                <Upload size={16} />
                <span>Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportGradient}
                  className="sr-only"
                />
              </label>
            </div>
          </section>

          {/* History */}
          {history.length > 1 && (
            <section
              className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4"
              style={cardBgStyle}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Recent
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {history.slice(1, 9).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => restoreFromHistory(item)}
                    className="aspect-video rounded border border-gray-200 dark:border-gray-600 hover:ring-2 hover:ring-indigo-200 dark:hover:ring-indigo-400 transition-all duration-200"
                    style={{ background: `linear-gradient(45deg, ${item.colors.join(',')})` }}
                    title={`Restore gradient (${item.type}, ${item.angle}°)`}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Panel - Preview & Code */}
        <div className="lg:col-span-3 space-y-6">
          {/* Gradient Preview */}
          <section
            className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-6"
            style={cardBgStyle}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Preview</h3>
            <div className="relative">
              <div
                style={{ background: gradientCss }}
                className="w-full h-80 rounded-xl transition-all duration-200 ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <div className="absolute inset-x-4 -bottom-4 h-6 rounded-xl blur-md bg-black/20 dark:bg-black/40 opacity-20 pointer-events-none" />
            </div>
          </section>

          {/* Code Output */}
          <CodeOutput
            type={type}
            angle={angle}
            colorStops={colorStops}
            gradientCss={gradientCss}
            isDark={isDark}
            isAnimated={isAnimated}
            animationSpeed={animationSpeed}
            radialPosition={radialPosition}
            conicAngle={conicAngle}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {/* 🎨 Toolbar */}
        <section
          className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4"
          style={cardBgStyle}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={randomizeColors}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                title="Randomize colors"
              >
                <Shuffle size={16} />
                <span>Random</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                  title="Gradient presets"
                >
                  <Palette size={16} />
                  <span>Presets</span>
                </button>

                {showPresets && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg z-10 p-2"
                    style={cardBgStyle}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {gradientPresets.map(preset => (
                        <button
                          key={preset.name}
                          onClick={() => applyPreset(preset)}
                          className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                          title={preset.name}
                        >
                          <div
                            className="w-full h-6 rounded mb-1"
                            style={{
                              background: `linear-gradient(45deg, ${preset.colors.join(',')})`,
                            }}
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                title="Reset to default"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                  title="Export options"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>

                {showExportMenu && (
                  <div
                    className="absolute top-full right-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg z-10 p-2"
                    style={cardBgStyle}
                  >
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleExportGradient();
                          setShowExportMenu(false);
                        }}
                        className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-medium text-sm text-gray-700 dark:text-gray-200">
                          Export Config
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Save gradient settings as JSON
                        </div>
                      </button>

                      {isAnimated && (
                        <>
                          <button
                            onClick={() => {
                              handleExportAnimatedCSS();
                              setShowExportMenu(false);
                            }}
                            className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="font-medium text-sm text-gray-700 dark:text-gray-200">
                              Export Animated CSS
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              CSS keyframes for animation
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              handleExportAnimatedHTML();
                              setShowExportMenu(false);
                            }}
                            className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="font-medium text-sm text-gray-700 dark:text-gray-200">
                              Export HTML Demo
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Complete HTML page with animation
                            </div>
                          </button>
                        </>
                      )}

                      {!isAnimated && (
                        <div className="p-2 text-xs text-gray-400 dark:text-gray-500 italic border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                          Enable animation to export animated gradients
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <label
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: isDark ? darkBg : '#f9fafb' }}
                title="Import gradient"
              >
                <Upload size={16} />
                <span>Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportGradient}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* History */}
          {history.length > 1 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Recent:
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {history.slice(1, 6).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => restoreFromHistory(item)}
                    className="flex-shrink-0 w-16 h-8 rounded border border-gray-200 dark:border-gray-600 hover:ring-2 hover:ring-indigo-200 dark:hover:ring-indigo-400 transition-all duration-200"
                    style={{ background: `linear-gradient(45deg, ${item.colors.join(',')})` }}
                    title={`Restore gradient (${item.type}, ${item.angle}°)`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 🔵 Main gradient display */}
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
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = isDark ? darkBg : '#f3f4f6';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Add color"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAnimated(!isAnimated)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
                  isAnimated
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400'
                    : 'bg-gray-50 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400',
                  'hover:shadow-md transition-all duration-200'
                )}
                style={!isAnimated ? { backgroundColor: isDark ? darkBg : '#f9fafb' } : undefined}
                title="Toggle animation"
              >
                {isAnimated ? <Pause size={16} /> : <Play size={16} />}
                <span>Animate</span>
              </button>
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
          </div>
          {/* Animation Speed Control */}
          {isAnimated && (
            <div className="mt-4 flex items-center justify-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Speed:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Slow</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={animationSpeed}
                  onChange={e => setAnimationSpeed(Number(e.target.value))}
                  className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((animationSpeed - 1) / 9) * 100}%, #e5e7eb ${((animationSpeed - 1) / 9) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">Fast</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[3rem]">
                {animationSpeed}s
              </span>
            </div>
          )}

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
          className="rounded-2xl shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-6"
          style={cardBgStyle}
        >
          <GradientTypeTabs active={type} onChange={setType} isDark={isDark} />
          {type === 'linear' && <AngleKnob angle={angle} onChange={setAngle} />}
          {type === 'radial' && (
            <RadialPositionControl
              position={radialPosition}
              onChange={setRadialPosition}
              isDark={isDark}
            />
          )}
          {type === 'conic' && (
            <ConicAngleControl angle={conicAngle} onChange={setConicAngle} isDark={isDark} />
          )}
        </section>

        {/* 📄 Code Output */}
        <CodeOutput
          type={type}
          angle={angle}
          colorStops={colorStops}
          gradientCss={gradientCss}
          isDark={isDark}
          isAnimated={isAnimated}
          animationSpeed={animationSpeed}
          radialPosition={radialPosition}
          conicAngle={conicAngle}
        />
      </div>
    </div>
  );
}
