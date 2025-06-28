"use client"
import React, { useState, useEffect, useRef } from 'react';

// Icons for the component
import { Plus, Zap, ChevronDown, Mic, ArrowUp, Image as ImageIcon, Box, FileText, Brain } from 'lucide-react';

const PromptComponent = () => {
  const [prompt, setPrompt] = useState('');

  // State to manage the visibility of popups and dropdowns
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isInspirationOpen, setInspirationOpen] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);

  // State for the selected model
  const [selectedModel, setSelectedModel] = useState('Brainwave 2.5');
  const models = ['Brainwave 2.5', 'Creative Fusion', 'Visionary AI 3.0'];

  // Refs for the popups to detect outside clicks
  const addPopupRef = useRef<HTMLDivElement>(null);
  const inspirationRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle clicks outside of the popups/dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addPopupRef.current && !addPopupRef.current.contains(event.target as Node)) {
        setAddPopupOpen(false);
      }
      if (inspirationRef.current && !inspirationRef.current.contains(event.target as Node)) {
        setInspirationOpen(false);
      }
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
        setModelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setModelOpen(false);
  };
  
  const handleUpload = () => {
    if(!prompt.trim()) {
        // Using console.error instead of alert
        console.error("Please describe your 3D object or scene first!");
        return;
    }
    console.log(`Uploading prompt: "${prompt}" with model: ${selectedModel}`);
    // Add your upload logic here
  }

  const addMenuItems = [
    { icon: <ImageIcon size={20} className="text-gray-500 dark:text-gray-400" />, text: "Add photos or videos" },
    { icon: <Box size={20} className="text-gray-500 dark:text-gray-400" />, text: "Add 3D objects" },
    { icon: <FileText size={20} className="text-gray-500 dark:text-gray-400" />, text: "Add files (docs, txt...)" },
  ];

  const inspirationItems = ["Explore Styles", "Get Random Idea", "Community Gallery"];

  return (
    <div className="w-full max-w-2xl p-4">
      <div className="bg-white/80 backdrop-blur-xl dark:bg-black/90 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 transition-all duration-300 hover:shadow-3xl">
        <textarea
          className="w-full p-3 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none text-base font-medium leading-relaxed"
          rows={2}
          placeholder="Describe your 3D object or scene..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {/* Responsive container for controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4 md:gap-0">
          {/* Left side controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Add Button and Popup */}
            <div className="relative" ref={addPopupRef}>
              <button 
                onClick={() => setAddPopupOpen(!isAddPopupOpen)}
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <Plus size={22} />
              </button>
              {isAddPopupOpen && (
                <div className="absolute bottom-full left-0 mb-3 w-72 bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-10">
                  <ul>
                    {addMenuItems.map((item, index) => (
                       <li key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 cursor-pointer rounded-xl transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl">
                         {item.icon}
                         <span className="font-medium text-gray-700 dark:text-gray-200">{item.text}</span>
                       </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Inspiration Button and Dropdown */}
            <div className="relative" ref={inspirationRef}>
              <button onClick={() => setInspirationOpen(!isInspirationOpen)} className="flex items-center justify-center h-12 px-5 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 hover:from-green-100 hover:to-emerald-200 dark:hover:from-green-800/40 dark:hover:to-emerald-700/40 text-gray-800 dark:text-gray-200 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl border border-green-200/50 dark:border-green-700/30">
                <Zap size={18} className="text-green-600 dark:text-green-400" />
                <span className="font-semibold ml-3">Inspiration</span>
                <ChevronDown size={16} className="ml-2" />
              </button>
              {isInspirationOpen && (
                 <div className="absolute bottom-full left-0 mb-3 w-64 bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-10">
                  <ul>
                    {inspirationItems.map((item, index) => (
                       <li key={index} className="p-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 cursor-pointer font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl">
                         {item}
                       </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Model Selection Button and Dropdown */}
            <div className="relative" ref={modelRef}>
              <button onClick={() => setModelOpen(!isModelOpen)} className="flex items-center justify-center h-12 px-5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 hover:from-blue-100 hover:to-indigo-200 dark:hover:from-blue-800/40 dark:hover:to-indigo-700/40 text-gray-800 dark:text-gray-200 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-200/50 dark:border-blue-700/30">
                <Brain size={18} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold ml-3">{selectedModel}</span>
                <ChevronDown size={16} className="ml-2" />
              </button>
               {isModelOpen && (
                 <div className="absolute bottom-full left-0 mb-3 w-64 bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-10">
                  <ul>
                    {models.map((model) => (
                       <li key={model} onClick={() => handleModelSelect(model)} className="p-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 cursor-pointer font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl">
                         {model}
                       </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <button onClick={() => console.log("Mic clicked")} className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 text-gray-600 dark:text-gray-300 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <Mic size={22} />
            </button>
            <button onClick={handleUpload} className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl ${
              prompt.trim() 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white' 
                : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}>
              <ArrowUp size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptComponent;