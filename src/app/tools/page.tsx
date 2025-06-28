'use client';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, HelpCircle, Shuffle, Download, Clipboard, CheckCircle, X, LayoutTemplate, Palette } from 'lucide-react';
import Header from '@/components/site/header';

// --- Type Definitions ---

interface Controls {
  colors: string[];
  grain: number;
  blur: number;
  contrast: number;
  brightness: number;
  hue: number;
  adjustPosition: boolean;
  width: number;
  height: number;
  borderRadius: number;
}

interface SetControls {
  setColors: (colors: string[]) => void;
  setGrain: (grain: number) => void;
  setBlur: (blur: number) => void;
  setContrast: (contrast: number) => void;
  setBrightness: (brightness: number) => void;
  setHue: (hue: number) => void;
  setAdjustPosition: (adjustPosition: boolean) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setBorderRadius: (borderRadius: number) => void;
}

interface Status {
  isExporting: boolean;
  isCopying: boolean;
  copySuccessMessage: string;
}

interface TemplateSize {
  name: string;
  w: number;
  h: number;
}

interface ColorPalette {
  name: string;
  colors: string[];
}

interface PaletteCategory {
  [key: string]: ColorPalette[];
}

interface HtmlToImageOptions {
  width?: number;
  height?: number;
  cacheBust?: boolean;
  backgroundColor?: string;
}

// Extend Window interface for htmlToImage
declare global {
  interface Window {
    htmlToImage: {
      toPng: (node: HTMLElement, options?: HtmlToImageOptions) => Promise<string>;
      toSvg: (node: HTMLElement, options?: HtmlToImageOptions) => Promise<string>;
      toWebp: (node: HTMLElement, options?: HtmlToImageOptions) => Promise<string>;
    };
  }
}

// --- Helper Functions & External Libraries ---

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const useScript = (url: string): boolean => {    
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => {
            if (window.htmlToImage) {
                 setIsLoaded(true);
            }
        };
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, [url]);
    return isLoaded;
};

// --- Data Structures ---

const templateSizes: { [key: string]: TemplateSize[] } = {
  Facebook: [{ name: "News Feed", w: 1200, h: 1200 }, { name: "Stories", w: 1080, h: 1920 }, { name: "Profile Picture", w: 720, h: 720 }, { name: "Cover Photo", w: 830, h: 312 }, { name: "Event Photo", w: 1336, h: 700 }, { name: "Group Photo", w: 640, h: 334 }, { name: "Open Graph", w: 1200, h: 630 }],
  Instagram: [{ name: "Feed", w: 1200, h: 1200 }, { name: "Stories", w: 1080, h: 1920 }, { name: "Reels", w: 1080, h: 1920 }],
  Twitter: [{ name: "Image", w: 1200, h: 675 }, { name: "Cover Photo", w: 1200, h: 400 }, { name: "Open Graph", w: 1200, h: 630 }, { name: "Profile Picture", w: 720, h: 720 }],
  LinkedIn: [{ name: "Feed", w: 1200, h: 1200 }, { name: "Cover Photo (Business)", w: 1128, h: 191 }, { name: "Cover Photo (Personal)", w: 792, h: 198 }, { name: "Stories", w: 1080, h: 1920 }],
  YouTube: [{ name: "Thumbnail", w: 1280, h: 720 }, { name: "Banner", w: 2560, h: 1440 }, { name: "Video (4K)", w: 3840, h: 2160 }],
};

const allColorPalettes: PaletteCategory = {
  "Vibrant": [
    { name: "Sunset Blaze", colors: ['#ff7e5f', '#feb47b', '#f9d423'] },
    { name: "Electric Dream", colors: ['#ff00cc', '#3333ff', '#00ff00'] },
    { name: "Cosmic Fusion", colors: ['#ff00ff', '#00ffff', '#ffff00'] },
  ],
  "Pastel": [
    { name: "Minty Fresh", colors: ['#a8e063', '#56ab2f', '#76b852'] },
    { name: "Lavender Bliss", colors: ['#c3aed6', '#a99a_b8', '#8f859b'] },
    { name: "Peach Paradise", colors: ['#ffdab9', '#f2bf8d', '#e5a561'] },
  ],
  "Nature": [
    { name: "Oceanic Deep", colors: ['#00c6ff', '#0072ff', '#0052D4'] },
    { name: "Forest Whisper", colors: ['#2E7D32', '#4CAF50', '#81C784'] },
    { name: "Desert Sands", colors: ['#EDC9A2', '#C9A97F', '#A68A5D'] },
  ],
  "Dark & Moody": [
    { name: "Twilight", colors: ['#0f0c29', '#302b63', '#24243e'] },
    { name: "Midnight City", colors: ['#232526', '#414345', '#000000'] },
    { name: "Crimson Night", colors: ['#642B73', '#C6426E', '#411530'] },
  ]
};


// --- UI Components ---

interface ColorPaletteProps {
  colors: string[];
  setColors: (colors: string[]) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, setColors }) => {
    const handleColorChange = (index: number, newColor: string) => setColors(colors.map((c, i) => i === index ? newColor : c));
    return (
        <div className="flex items-center space-x-2">
            {colors.map((color, index) => (
                <div key={index} className="relative w-7 h-7 rounded-full border-2 border-slate-700">
                    <input type="color" value={color} onChange={(e) => handleColorChange(index, e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                </div>
            ))}
        </div>
    );
};

interface PaletteDropdownProps {
  onSelect: (colors: string[]) => void;
}

const PaletteDropdown: React.FC<PaletteDropdownProps> = ({ onSelect }) => {
    const palettes: { [key: string]: string[] } = { "Twilight": ['#0f0c29', '#302b63', '#24243e'], "Ocean": ['#00c6ff', '#0072ff', '#0052D4'], "Sunset": ['#ff7e5f', '#feb47b', '#f9d423'], "Lush": ['#56ab2f', '#a8e063', '#76b852'] };
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Choose Palette</label>
            <div className="relative w-full">
                <select onChange={(e) => onSelect(palettes[e.target.value])} className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {Object.keys(palettes).map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
};

interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled, label }) => {
    const uniqueId = useMemo(() => `toggle-${Math.random()}`, []);
    return (<label htmlFor={uniqueId} className="flex items-center cursor-pointer"><div className="relative"><input id={uniqueId} type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} /><div className={`block w-14 h-8 rounded-full ${enabled ? 'bg-indigo-600' : 'bg-slate-700'}`}></div><div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'transform translate-x-full' : ''}`}></div></div>{label && <div className="ml-3 text-white font-medium">{label}</div>}</label>);
}

interface FilterSliderProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

const FilterSlider: React.FC<FilterSliderProps> = ({ label, value, setValue, min = 0, max = 100, unit = '%' }) => {
    return (<div className="space-y-2"><div className="flex justify-between items-center"><label className="text-sm font-medium text-slate-300">{label}</label><span className="text-sm text-slate-400">{value}{unit}</span></div><input type="range" min={min} max={max} value={value} onChange={(e) => setValue(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-thumb" /></div>);
};

interface DimensionInputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

const DimensionInput: React.FC<DimensionInputProps> = ({ label, value, setValue }) => {
    return (<div className="flex-1"><label className="block text-sm font-medium text-slate-300 mb-1">{label}</label><input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)} className="w-full bg-slate-800 border border-slate-700 rounded-md py-1.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>);
}

interface TemplateSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (w: number, h: number) => void;
}

const TemplateSizeModal: React.FC<TemplateSizeModalProps> = ({ isOpen, onClose, onSelectSize }) => {
    if (!isOpen) return null;
    return (<div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"><div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"><div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10"><h2 className="text-xl font-bold text-white">Select a Template Size</h2><button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button></div><div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">{Object.entries(templateSizes).map(([platform, sizes]) => (<div key={platform} className="space-y-3"><h3 className="font-bold text-lg text-indigo-400">{platform}</h3><ul className="space-y-2">{sizes.map(size => (<li key={size.name}><button onClick={() => onSelectSize(size.w, size.h)} className="text-left w-full text-slate-300 hover:text-white"><span className="font-medium">{size.name}</span><span className="block text-xs text-slate-500">{size.w}x{size.h}</span></button></li>))}</ul></div>))}</div></div></div>);
};

interface PaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPalette: (colors: string[]) => void;
}

const PaletteModal: React.FC<PaletteModalProps> = ({ isOpen, onClose, onSelectPalette }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                 <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10"><h2 className="text-xl font-bold text-white">All Color Palettes</h2><button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button></div>
                 <div className="p-6 space-y-8">
                     {Object.entries(allColorPalettes).map(([category, palettes]) => (
                         <div key={category} className="space-y-4">
                             <h3 className="font-bold text-xl text-indigo-400">{category}</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                 {palettes.map(palette => (
                                     <button key={palette.name} onClick={() => onSelectPalette(palette.colors)} className="space-y-2 text-left group">
                                         <div className="flex h-12 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-indigo-500 transition-all">
                                             {palette.colors.map(color => <div key={color} style={{ backgroundColor: color }} className="flex-1 h-full"></div>)}
                                         </div>
                                         <span className="text-sm font-medium text-slate-300 group-hover:text-white">{palette.name}</span>
                                     </button>
                                 ))}
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};


// --- Main Components ---

interface SidebarProps {
  controls: Controls;
  setControls: SetControls;
  onExport: (format: string) => void;
  onCopy: (format: string) => void;
  isReady: boolean;
  status: Status;
  openTemplateModal: () => void;
  openPaletteModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ controls, setControls, onExport, onCopy, isReady, status, openTemplateModal, openPaletteModal }) => {
    const { colors, grain, blur, contrast, brightness, hue, adjustPosition, width, height, borderRadius } = controls;
    const { setColors, setGrain, setBlur, setContrast, setBrightness, setHue, setAdjustPosition, setWidth, setHeight, setBorderRadius } = setControls;
    const { isExporting, isCopying, copySuccessMessage } = status;
    const randomizeColors = useCallback(() => setColors([getRandomColor(), getRandomColor(), getRandomColor()]), [setColors]);
    const resetFilters = () => { setGrain(10); setBlur(0); setContrast(100); setBrightness(100); setHue(0); }
    
    return (
        <div className="w-full lg:w-96 bg-slate-900 text-white p-6 space-y-8 overflow-y-auto h-screen-dynamic">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">COLORS</h3>
                <label className="text-sm font-medium text-slate-300 flex items-center">Custom Palette <HelpCircle className="w-4 h-4 ml-1.5 text-slate-500" /></label>
                <ColorPalette colors={colors} setColors={setColors} />
                <button onClick={randomizeColors} className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 rounded-md py-2 px-3 text-white font-medium"><Shuffle className="w-4 h-4 mr-2" />Randomize colors</button>
                <PaletteDropdown onSelect={setColors} />
                <button onClick={openPaletteModal} className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 rounded-md py-2 px-3 text-white font-medium"><Palette className="w-4 h-4 mr-2" />All Color Palettes</button>
                <div className="flex justify-between items-center pt-2"><label className="text-sm font-medium text-slate-300">Adjust color position</label><ToggleSwitch enabled={adjustPosition} setEnabled={setAdjustPosition} /></div>
            </div>
            <div className="space-y-4 border-t border-slate-800 pt-6"><h3 className="text-lg font-semibold text-white">FILTERS</h3><FilterSlider label="Grain" value={grain} setValue={setGrain} max={100}/><FilterSlider label="Blur" value={blur} setValue={setBlur} max={40} unit="px" /><FilterSlider label="Contrast" value={contrast} setValue={setContrast} max={200} /><FilterSlider label="Brightness" value={brightness} setValue={setBrightness} max={200} /><FilterSlider label="Hue" value={hue} setValue={setHue} max={360} unit="°" /><button onClick={resetFilters} className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 rounded-md py-2 px-3 text-white font-medium"><RefreshCw className="w-4 h-4 mr-2" />Reset Filters</button></div>
            <div className="space-y-4 border-t border-slate-800 pt-6"><h3 className="text-lg font-semibold text-white">CANVAS</h3><div className="flex space-x-4"><DimensionInput label="Width" value={width} setValue={setWidth} /><DimensionInput label="Height" value={height} setValue={setHeight} /></div><FilterSlider label="Rounded" value={borderRadius} setValue={setBorderRadius} max={100} unit="px" /><button onClick={openTemplateModal} className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 rounded-md py-2 px-3 text-white font-medium"><LayoutTemplate className="w-4 h-4 mr-2" />Select Template</button></div>
            <div className="space-y-4 border-t border-slate-800 pt-6">
                <h3 className="text-lg font-semibold text-white">EXPORT & COPY</h3>
                <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Download</label><div className="grid grid-cols-3 gap-2"><button onClick={() => onExport('png')} disabled={!isReady || isExporting || isCopying} className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors rounded-md py-2 px-3 text-white font-medium"><Download className="w-4 h-4 mr-2" />{isExporting ? '...' : 'PNG'}</button><button onClick={() => onExport('svg')} disabled={!isReady || isExporting || isCopying} className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors border border-slate-700 rounded-md py-2 px-3 text-white font-medium"><Download className="w-4 h-4 mr-2" />{isExporting ? '...' : 'SVG'}</button><button onClick={() => onExport('webp')} disabled={!isReady || isExporting || isCopying} className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors border border-slate-700 rounded-md py-2 px-3 text-white font-medium"><Download className="w-4 h-4 mr-2" />{isExporting ? '...' : 'WebP'}</button></div></div>
                <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Copy to Clipboard</label><div className="grid grid-cols-2 gap-2"><button onClick={() => onCopy('png')} disabled={!isReady || isCopying || isExporting} className={`w-full flex items-center justify-center transition-colors rounded-md py-2 px-3 font-medium ${copySuccessMessage === 'png' ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-slate-700 disabled:cursor-not-allowed'}`}>{copySuccessMessage === 'png' ? <CheckCircle className="w-4 h-4 mr-2"/> : <Clipboard className="w-4 h-4 mr-2" />}{isCopying && copySuccessMessage !== 'png' ? '...' : (copySuccessMessage === 'png' ? 'Copied!' : 'Copy PNG')}</button><button onClick={() => onCopy('svg')} disabled={!isReady || isCopying || isExporting} className={`w-full flex items-center justify-center transition-colors border rounded-md py-2 px-3 font-medium ${copySuccessMessage === 'svg' ? 'bg-green-600 text-white border-green-600' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white disabled:bg-slate-700 disabled:cursor-not-allowed'}`}>{copySuccessMessage === 'svg' ? <CheckCircle className="w-4 h-4 mr-2"/> : <Clipboard className="w-4 h-4 mr-2" />}{isCopying && copySuccessMessage !== 'svg' ? '...' : (copySuccessMessage === 'svg' ? 'Copied!' : 'Copy SVG')}</button></div></div>
            </div>
        </div>
    );
};

interface PatternPreviewProps {
  controls: Controls;
}

const PatternPreview = React.forwardRef<HTMLDivElement, PatternPreviewProps>(({ controls }, ref) => {
    const { colors, grain, blur, contrast, brightness, hue, adjustPosition, width, height, borderRadius } = controls;
    const gradientStyle = useMemo(() => ({ background: `${adjustPosition ? 'radial-gradient(circle, ' : 'linear-gradient(90deg, '}${colors.join(', ')})` }), [colors, adjustPosition]);
    const filterStyle = useMemo(() => ({ filter: `blur(${blur}px) contrast(${contrast}%) brightness(${brightness}%) hue-rotate(${hue}deg)` }), [blur, contrast, brightness, hue]);
    const grainOverlay = (<div className="absolute inset-0 w-full h-full pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: grain / 100, }} />);
    return (<main className="flex-1 flex items-center justify-center bg-slate-800 p-4 sm:p-8 md:p-12 lg:p-16 overflow-auto"><div ref={ref} className="relative shadow-2xl shadow-black/50 bg-slate-900 overflow-hidden" style={{ width: `${width}px`, height: `${height}px`, borderRadius: `${borderRadius}px`, transition: 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease' }}><div className="absolute inset-0 w-full h-full" style={filterStyle}><div className="w-full h-full" style={gradientStyle}/></div>{grainOverlay}</div></main>);
});

PatternPreview.displayName = 'PatternPreview';


export default function MashGradient() {
    const isReady = useScript('https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js');
    const [colors, setColors] = useState<string[]>(['#0f0c29', '#302b63', '#24243e']);
    const [grain, setGrain] = useState<number>(10);
    const [blur, setBlur] = useState<number>(0);
    const [contrast, setContrast] = useState<number>(100);
    const [brightness, setBrightness] = useState<number>(100);
    const [hue, setHue] = useState<number>(0);
    const [adjustPosition, setAdjustPosition] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(700);
    const [height, setHeight] = useState<number>(400);
    const [borderRadius, setBorderRadius] = useState<number>(16);
    const [isExporting, setIsExporting] = useState<boolean>(false);
    const [isCopying, setIsCopying] = useState<boolean>(false);
    const [copySuccessMessage, setCopySuccessMessage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPaletteModalOpen, setPaletteModalOpen] = useState<boolean>(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const controls: Controls = { colors, grain, blur, contrast, brightness, hue, adjustPosition, width, height, borderRadius };
    const setControls: SetControls = { setColors, setGrain, setBlur, setContrast, setBrightness, setHue, setAdjustPosition, setWidth, setHeight, setBorderRadius };
    const status: Status = { isExporting, isCopying, copySuccessMessage };
    
    const getNode = useCallback((): HTMLDivElement | null => {
        return (previewRef.current && isReady) ? previewRef.current : null;
    }, [isReady]);
    
    const handleExport = useCallback((format: string) => {
        const node = getNode(); if(!node) return;
        setIsExporting(true);
        const exportOptions: HtmlToImageOptions = { width: node.clientWidth, height: node.clientHeight, cacheBust: true, backgroundColor: '#1E293B' };
        const download = (dataUrl: string, extension: string) => { const link = document.createElement('a'); link.download = `gradient-pattern.${extension}`; link.href = dataUrl; link.click(); setIsExporting(false); };
        const exportPromise = (() => {
            switch (format) {
                case 'png': return window.htmlToImage.toPng(node, exportOptions);
                case 'svg': return window.htmlToImage.toSvg(node, exportOptions);
                case 'webp': return window.htmlToImage.toWebp(node, exportOptions);
                default: setIsExporting(false); return Promise.reject('Unknown export format');
            }
        })();
        exportPromise.then((dataUrl: string) => download(dataUrl, format)).catch((err: Error) => { console.error(`${format} export failed`, err); setIsExporting(false); });
    }, [getNode]);

    const handleCopy = useCallback((format: string) => {
        const node = getNode(); if (!node) return;
        setIsCopying(true); setCopySuccessMessage('');
        const copyTextHelper = (text: string) => { const textArea = document.createElement("textarea"); textArea.value = text; textArea.style.position = 'fixed'; textArea.style.top = '-9999px'; textArea.style.left = '-9999px'; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try { if (document.execCommand('copy')) setCopySuccessMessage(format); } catch (err) { console.error('Fallback copy failed:', err); } document.body.removeChild(textArea); };
        const copyPromise = (() => { switch(format) { case 'png': return window.htmlToImage.toPng(node); case 'svg': return window.htmlToImage.toSvg(node); default: return Promise.reject('Unsupported copy format'); } })();
        copyPromise.then(copyTextHelper).catch((err: Error) => console.error(`Copy ${format} failed`, err)).finally(() => setIsCopying(false));
    }, [getNode]);

    const handleSelectSize = (w: number, h: number) => { setWidth(w); setHeight(h); setIsModalOpen(false); };
    const handleSelectPalette = (newColors: string[]) => { setColors(newColors); setPaletteModalOpen(false); };
    useEffect(() => { if (copySuccessMessage) { const timer = setTimeout(() => setCopySuccessMessage(''), 2000); return () => clearTimeout(timer); } }, [copySuccessMessage]);

    return (
        <>
        <Header />
        <div className="bg-slate-900 min-h-screen flex flex-col lg:flex-row font-sans">
            <style>{`.range-thumb::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;background:#fff;border-radius:50%;cursor:pointer;border:4px solid #4f46e5;margin-top:-7px}.range-thumb::-moz-range-thumb{width:20px;height:20px;background:#fff;border-radius:50%;cursor:pointer;border:4px solid #4f46e5}.h-screen-dynamic{height:100vh;height:100dvh}`}</style>
            <Sidebar controls={controls} setControls={setControls} onExport={handleExport} onCopy={handleCopy} isReady={isReady} status={status} openTemplateModal={() => setIsModalOpen(true)} openPaletteModal={() => setPaletteModalOpen(true)} />
            <PatternPreview controls={controls} ref={previewRef} />
            <TemplateSizeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectSize={handleSelectSize} />
            <PaletteModal isOpen={isPaletteModalOpen} onClose={() => setPaletteModalOpen(false)} onSelectPalette={handleSelectPalette} />
        </div>
        </>
    );
}
