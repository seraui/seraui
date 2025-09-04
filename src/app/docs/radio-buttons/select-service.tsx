"use client";

import React from "react";
import { Check } from "lucide-react";

type Option = {
  icon: React.ElementType; // pass component directly
  text: string;
  value: string;
};

type SelectServiceProps = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

const SelectService: React.FC<SelectServiceProps> = ({ options, selected, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-lg mx-auto select-none p-2">
      {options.map((option) => {
        const IconComponent = option.icon;
        const isChecked = selected === option.value;

        return (
          <label key={option.value} className="relative cursor-pointer w-24 sm:w-28">
            <input
              type="radio"
              className="sr-only peer"
              name="vehicle"
              value={option.value}
              checked={isChecked}
              onChange={() => onChange(option.value)}
            />

            <div
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border
                bg-white/10 backdrop-blur-md border-white/20
                transition-transform duration-300 ease-in-out
                transform hover:scale-105 hover:z-10
                ${isChecked ? "bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-blue-400 shadow-lg" : "hover:border-blue-300"}`}
            >
              {/* Selection checkmark */}
              {isChecked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Icon */}
              <IconComponent
                className={`w-8 h-8 mb-1 transition-all duration-300 ${
                  isChecked ? "text-blue-400 animate-bounce-in" : "text-gray-400 group-hover:text-white"
                }`}
              />

              {/* Text */}
              <span className={`text-sm font-medium text-center transition ${isChecked ? "text-blue-300" : "text-gray-300"}`}>
                {option.text}
              </span>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-white/10 rounded-xl transform scale-0 peer-checked:animate-ripple" />
              </div>
            </div>
          </label>
        );
      })}

 {/*
      tips: move to global/index css for better performance
      
  */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-bounce-in { animation: bounceIn 0.6s ease-in-out; }
        .animate-ripple { animation: ripple 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default SelectService;