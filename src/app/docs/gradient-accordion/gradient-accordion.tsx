'use client'
import React, { useState } from 'react';

// Type definitions
interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
}

// Main App Component
export default function GradientAccordion() {
  // Data for the FAQ section
  const faqData: FAQItem[] = [
    {
      question: "Is it legal to download photos from Instagram using ..?",
      answer: "Yes, it is generally legal to download photos from Instagram for personal use. However, you should respect copyright and privacy. Do not use downloaded content for commercial purposes without permission from the owner."
    },
    {
      question: "Do I need an Instagram account to download photos and pics using this tool?",
      answer: "No, you do not need an Instagram account to use this tool. You only need the public URL of the photo or video you wish to download."
    },
    {
      question: "Can I download the photos in high resolution?",
      answer: "Yes, our tool downloads photos in the highest resolution available on Instagram. The quality of the downloaded photo will be the same as the original upload."
    },
    {
      question: "Is it safe to use ..?",
      answer: "Absolutely. Our service is secure and respects your privacy. We do not store any of the photos you download or track your download history."
    }
  ];

  return (
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">FAQ</h1>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
  );
}

// Reusable Accordion Item Component
function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    // Gradient border effect container
    <div className="p-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 dark:from-cyan-500 dark:to-pink-600">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-md">
        {/* Question section */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-left p-4 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
          {/* Arrow Icon */}
          <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        
        {/* Answer section with transition */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}