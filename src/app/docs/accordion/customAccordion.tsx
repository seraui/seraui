"use client"
import React, { useState } from 'react';

// Type definitions
interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

// Updated data for the FAQ section
const faqData: FAQItem[] = [
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Just follow the simple steps outlined in our comprehensive setup guide, which will walk you through the entire process from beginning to end.',
  },
  {
    question: 'Where can I find my account details?',
    answer: 'You can find all of your account information, including your profile, settings, and billing history, on the \'My Account\' page once you have successfully logged in.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, please click the "Forgot Password" link on the login page. We will then send an email with further instructions to your registered email address.',
  },
  {
    question: 'Who can I contact for support?',
    answer: 'Our dedicated support team is available around the clock to assist you. You can reach us through the contact form on our website or by sending an email to support@example.com.',
  },
];

// AccordionItem component for each FAQ entry
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white/90 dark:bg-black/90 rounded-xl shadow-lg border border-gray-200 dark:border-green-500/60 mb-4 overflow-hidden backdrop-blur-md relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/30 dark:from-green-400/15 dark:to-green-500/10 rounded-xl pointer-events-none"></div>
      
      <button
        className="w-full flex justify-between items-center text-left p-6 focus:outline-none hover:bg-gray-50 dark:hover:bg-green-800/30 transition-colors duration-200 relative z-10"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-green-50">{question}</span>
        {/* Chevron Icon with a smoother, longer transition */}
        <svg
          className={`w-6 h-6 text-gray-600 dark:text-green-300 transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Collapsible content area with a smoother, longer transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {/* Answer text with a fade-in effect for a smoother appearance */}
        <div className="p-6 pt-0 relative z-10">
          <p className={`text-gray-700 dark:text-green-100 leading-relaxed transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 delay-200' : 'opacity-0'}`}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App component that renders the FAQ section
export default function CustomAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item is open by default

  const handleItemClick = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center font-sans p-4 rk:bg-black ">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-[#EBF3FB] dark:bg-blue-900/20 text-[#3B82F6] dark:text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full">
            Help Center
          </span>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
            Common Questions
          </h1>
        </div>
        <div>
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
