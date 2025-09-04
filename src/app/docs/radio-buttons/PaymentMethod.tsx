"use client";

import React, { useState } from 'react';

type PaymentMethod = 'google' | 'apple' | 'paypal' | 'visa';

const paymentOptions: {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: 'google',
    label: 'Google Pay',
    color: 'text-blue-600',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.993 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    value: 'apple',
    label: 'Apple Pay',
    color: 'text-gray-800',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    value: 'paypal',
    label: 'PayPal',
    color: 'text-blue-700',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.294-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.739.739 0 0 0-.72.623l-1.05 6.675-.301 1.917a.635.635 0 0 0 .628.729h3.466c.467 0 .864-.34.936-.803l.038-.212.723-4.54.046-.25c.072-.462.469-.803.936-.803h.59c3.894 0 6.944-1.258 7.83-4.096.368-1.183.178-2.173-.403-2.95-.247-.331-.58-.625-.983-.84z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    value: 'visa',
    label: 'Credit Card',
    color: 'text-indigo-600',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H2zm0 2h20v2H2V6zm0 4h20v8H2v-8zm2 2v1h4v-1H4zm6 0v1h2v-1h-2z" fill="currentColor"/>
      </svg>
    ),
  },
];

const PaymentMethod: React.FC = () => {
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [hoveredOption, setHoveredOption] = useState<PaymentMethod | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Choose Payment Method
          </h3>
          <p className="text-sm text-gray-600">
            Select your preferred payment option
          </p>
        </div>

        {/* Payment Options */}
        <div className="p-4 space-y-2">
          {paymentOptions.map(({ value, label, icon, color }) => (
            <label
              key={value}
              htmlFor={value}
              className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-out group ${
                selected === value
                  ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]'
                  : hoveredOption === value
                  ? 'border-gray-300 bg-gray-50 shadow-sm transform scale-[1.01]'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredOption(value)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {/* Radio Button */}
              <div className="relative flex-shrink-0">
                <input
                  id={value}
                  type="radio"
                  name="payment"
                  value={value}
                  checked={selected === value}
                  onChange={() => setSelected(value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selected === value
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300 bg-white group-hover:border-indigo-300'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full bg-white transition-all duration-200 ${
                      selected === value ? 'scale-[0.4]' : 'scale-0'
                    }`}
                  />
                </div>
              </div>

              {/* Icon and Label */}
              <div className="flex items-center ml-4 flex-1">
                <div
                  className={`transition-all duration-200 ${
                    selected === value ? color : 'text-gray-500'
                  } ${
                    hoveredOption === value && selected !== value
                      ? 'text-gray-700'
                      : ''
                  }`}
                >
                  {icon}
                </div>
                <span
                  className={`ml-3 font-medium transition-all duration-200 ${
                    selected === value
                      ? 'text-indigo-900'
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Selected Indicator */}
              {selected === value && (
                <div className="flex-shrink-0 ml-2">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Ripple Effect */}
              <div
                className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                  hoveredOption === value
                    ? 'bg-gradient-to-r from-indigo-100/50 to-purple-100/50 opacity-100'
                    : 'opacity-0'
                }`}
              />
            </label>
          ))}
        </div>

        {/* Continue Button */}
        {selected && (
          <div className="px-6 pb-6">
            <button
              className={`w-full py-3 px-4 bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-out animate-fadeInUp`}
              onClick={() => console.log('Selected:', selected)}
            >
              Continue with {paymentOptions.find(opt => opt.value === selected)?.label}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentMethod;