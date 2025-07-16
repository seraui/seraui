'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Plus, Trash2 } from 'lucide-react';

// A utility function to clamp a number between a min and max value.
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Type definition for a single color stop in the gradient.
type ColorStop = { color: string; pos: number };

// A curated list of preset gradient swatches for users to start with.
const PRESET_SWATCHES: ColorStop[][] = [
    [{ color: '#833AB4', pos: 0 },{ color: '#FD1D1D', pos: 50 },{ color: '#FCB045', pos: 100 }],
    [{ color: '#43e97b', pos: 0 },{ color: '#38f9d7', pos: 100 }],
    [{ color: '#4158D0', pos: 0 },{ color: '#C850C0', pos: 46 },{ color: '#FFCC70', pos: 100 }],
    [{ color: '#0093E9', pos: 0 },{ color: '#80D0C7', pos: 100 }],
    [{ color: '#ff9a9e', pos: 0 },{ color: '#fecfef', pos: 50 },{ color: '#fecfef', pos: 100 }],
    [{ color: '#f6d365', pos: 0 },{ color: '#fda085', pos: 100 }],
    [{ color: '#a1c4fd', pos: 0 },{ color: '#c2e9fb', pos: 100 }],
    [{ color: '#30cfd0', pos: 0 },{ color: '#330867', pos: 100 }],
    [{ color: '#ffaf7b', pos: 0 },{ color: '#d76d77', pos: 50 },{ color: '#3a1c71', pos: 100 }],
    [{ color: '#667eea', pos: 0 },{ color: '#764ba2', pos: 100 }],
    [{ color: '#fbc2eb', pos: 0 },{ color: '#a6c1ee', pos: 100 }],
    [{ color: '#fa709a', pos: 0 },{ color: '#fee140', pos: 100 }],
];

// Converts a HEX color string to an RGBA object.
function hexToRgba(hex: string) {
  let c = hex.startsWith('#') ? hex.substring(1) : hex;
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return { r: 0, g: 0, b: 0, a: 1 };
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    a: 1,
  };
}

// Converts an RGBA color object to a HEX string.
function rgbaToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  return (
    '#' +
    [r, g, b]
      .map((x: number) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

// A reusable component for a single input field with a label.
const InputField = ({ label, value, onChange, type = "number", min, max, unit }: {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  min?: number;
  max?: number;
  unit?: string;
}) => (
    <div className="relative">
        <label className="text-xs text-slate-500 absolute top-1 left-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            className="w-full pt-5 pb-1 px-2 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {unit && <span className="absolute right-2 bottom-1.5 text-xs text-slate-400">{unit}</span>}
    </div>
);

// Main component for the Gradient Generator application.
export default function App() {
  // State management for gradient properties.
  const [stops, setStops] = useState<ColorStop[]>([
    { color: '#833AB4', pos: 0 },
    { color: '#FD1D1D', pos: 50 },
    { color: '#FCB045', pos: 100 },
  ]);
  const [selected, setSelected] = useState<number>(1);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(90);
  
  // Refs for DOM elements to handle dragging.
  const barRef = useRef<HTMLDivElement>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  // Memoized gradient CSS string.
  const gradient = React.useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);
    const colorStops = sortedStops.map(s => `${s.color} ${s.pos}%`).join(', ');
    return type === 'linear'
      ? `linear-gradient(${angle}deg, ${colorStops})`
      : `radial-gradient(circle, ${colorStops})`;
  }, [stops, type, angle]);

  // Handler for starting the drag of a color stop.
  const onBarMouseDown = useCallback((idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    setDragIdx(idx);
    setSelected(idx);
    e.preventDefault();
  }, []);

  // Handler for moving a color stop.
  const onBarMouseMove = useCallback((e: MouseEvent) => {
    if (dragIdx === null || !barRef.current) return;
    const bar = barRef.current;
    const rect = bar.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const percent = Math.round((x / rect.width) * 100);
    
    setStops(currentStops => currentStops.map((s, i) => i === dragIdx ? { ...s, pos: percent } : s));
  }, [dragIdx]);

  // Handler for ending the drag of a color stop.
  const onBarMouseUp = useCallback(() => {
    setDragIdx(null);
  }, []);

  // Effect to manage global mouse event listeners for dragging.
  useEffect(() => {
    if (dragIdx !== null) {
      window.addEventListener('mousemove', onBarMouseMove);
      window.addEventListener('mouseup', onBarMouseUp);
      return () => {
        window.removeEventListener('mousemove', onBarMouseMove);
        window.removeEventListener('mouseup', onBarMouseUp);
      };
    }
  }, [dragIdx, onBarMouseMove, onBarMouseUp]);
  
  // Handlers for modifying color, position, and other properties.
  const handleColorChange = (idx: number, color: string) => {
    setStops(stops.map((s, i) => (i === idx ? { ...s, color } : s)));
  };

  const removeStop = (idx: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
    if (selected >= idx) {
      setSelected(Math.max(0, selected - 1));
    }
  };

  const addStop = () => {
    // Find a gap to insert the new stop
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    let newPos = 50;
    let newColor = '#888888';

    if (sorted.length > 1) {
        let maxGap = 0;
        let bestPos = -1;

        for(let i=0; i<sorted.length - 1; i++){
            const gap = sorted[i+1].pos - sorted[i].pos;
            if(gap > maxGap){
                maxGap = gap;
                bestPos = sorted[i].pos + gap / 2;
                // Interpolate color
                const c1 = hexToRgba(sorted[i].color);
                const c2 = hexToRgba(sorted[i+1].color);
                newColor = rgbaToHex({
                    r: c1.r + (c2.r-c1.r) * 0.5,
                    g: c1.g + (c2.g-c1.g) * 0.5,
                    b: c1.b + (c2.b-c1.b) * 0.5,
                });
            }
        }
        if(bestPos !== -1){
            newPos = bestPos;
        }
    }

    const newStops = [...stops, { color: newColor, pos: Math.round(newPos) }];
    setStops(newStops);
    setSelected(newStops.length - 1);
  };
  
  const setPreset = (preset: ColorStop[]) => {
    setStops(preset.map(s => ({ ...s })));
    setSelected(preset.length > 1 ? 1 : 0);
  };

  const copyToClipboard = (text: string) => {
    try {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        // Add a visual confirmation if you have a toast/notification system
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
  };
  
  // Derived state for the currently selected color stop.
  const selStop = stops[selected];
  const selRgba = selStop ? hexToRgba(selStop.color) : null;
  
  if (!selStop || !selRgba) {
     // This can happen briefly when a stop is removed.
     // We can show a loading state or default view.
     return <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center"><p>Loading...</p></div>;
  }

  const setRgbaField = (field: 'r' | 'g' | 'b', value: string | number) => {
    const newRgba = { ...selRgba, [field]: clamp(Number(value), 0, 255) };
    handleColorChange(selected, rgbaToHex(newRgba));
  };

  const setStopPos = (value: string | number) => {
    const pos = clamp(Number(value), 0, 100);
    setStops(stops.map((s, i) => i === selected ? { ...s, pos } : s));
  };

  // Main JSX for the component layout.
  return (
    <div className="w-full font-sans p-4 lg:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Preview and Code */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <header>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gradient Generator</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Create and customize beautiful gradients.</p>
          </header>
          
          <div className="h-64 lg:h-96 w-full rounded-lg shadow-inner" style={{ background: gradient }} />
          
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold mb-3">Color Stops</h3>
            <div className="relative h-8 flex items-center">
              <div ref={barRef} className="w-full h-2 rounded-full shadow-inner" style={{ background: gradient }} />
              {stops.map((stop, idx) => (
                <div
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `calc(${stop.pos}% - 12px)` }}
                  onMouseDown={(e) => onBarMouseDown(idx, e)}
                >
                  <div className={`w-6 h-6 rounded-full border-2 transition-all duration-150 flex items-center justify-center
                    ${selected === idx ? 'bg-white dark:bg-slate-700 border-blue-500 scale-110' : 'bg-white/80 dark:bg-slate-900/80 border-slate-300 dark:border-slate-500 group-hover:scale-110'}`}>
                     <div className="w-3.5 h-3.5 rounded-full" style={{backgroundColor: stop.color}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-semibold">Generated CSS</h3>
                 <button onClick={() => copyToClipboard(`background: ${gradient};`)} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
                    <Copy size={16}/>
                 </button>
             </div>
             <code className="text-sm text-pink-600 dark:text-pink-400 font-mono bg-slate-50 dark:bg-slate-800 p-3 block rounded-md overflow-x-auto">
                 background: {gradient};
             </code>
          </div>

        </div>

        {/* Right Column: Controls */}
        <div className="flex flex-col gap-6">
            
          {/* Selected Color Stop Editor */}
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Selected Stop</h3>
                 <button onClick={() => removeStop(selected)} disabled={stops.length <= 2} className="p-1.5 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-40 disabled:cursor-not-allowed">
                     <Trash2 size={16} />
                 </button>
             </div>
             
             <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={selStop.color}
                  onChange={(e) => handleColorChange(selected, e.target.value)}
                  className="w-12 h-12 rounded-md border-none cursor-pointer bg-transparent"
                  style={{'--color': selStop.color} as React.CSSProperties}
                />
                 <InputField label="HEX" value={selStop.color} onChange={e => handleColorChange(selected, e.target.value)} type="text" />
             </div>
             
             <div className="grid grid-cols-3 gap-3">
                <InputField label="R" value={selRgba.r} onChange={e => setRgbaField('r', e.target.value)} min={0} max={255}/>
                <InputField label="G" value={selRgba.g} onChange={e => setRgbaField('g', e.target.value)} min={0} max={255}/>
                <InputField label="B" value={selRgba.b} onChange={e => setRgbaField('b', e.target.value)} min={0} max={255}/>
             </div>
             
             <InputField label="Position" value={selStop.pos} onChange={e => setStopPos(e.target.value)} min={0} max={100} unit="%"/>
             
             <button onClick={addStop} className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors">
                <Plus size={16}/>
                Add Stop
             </button>
          </div>

          {/* Gradient Settings */}
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
             <h3 className="text-sm font-semibold">Settings</h3>
             <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => setType('linear')} className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${type === 'linear' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Linear</button>
                 <button onClick={() => setType('radial')} className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${type === 'radial' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Radial</button>
             </div>
             {type === 'linear' && (
                <InputField label="Angle" value={angle} onChange={e => setAngle(Number(e.target.value))} min={0} max={360} unit="deg"/>
             )}
          </div>

          {/* Presets */}
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold mb-3">Presets</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {PRESET_SWATCHES.map((preset, i) => (
                    <button
                        key={i}
                        className="h-10 rounded-md border border-slate-200 dark:border-slate-700 hover:scale-105 hover:border-blue-500 dark:hover:border-blue-500 transition-transform shadow-sm"
                        style={{ background: `linear-gradient(90deg, ${preset.map(s => `${s.color} ${s.pos}%`).join(', ')})` }}
                        onClick={() => setPreset(preset)}
                        aria-label={`Preset ${i + 1}`}
                    />
                ))}
            </div>
          </div>
        </div>

      </div>
       <style jsx global>{`
          input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0;
          }
          input[type="color"]::-webkit-color-swatch {
            border: 4px solid #fff;
            border-radius: 0.375rem;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
          }
          .dark input[type="color"]::-webkit-color-swatch {
            border-color: #1e293b; /* slate-800 */
          }
       `}</style>
    </div>
  );
}
