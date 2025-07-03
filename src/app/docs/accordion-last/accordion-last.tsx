'use client';
import React, { useState } from 'react';

// --- Types ---
interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionIconProps {
  isOpen: boolean;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onClick: () => void;
}

// --- Data for the Accordion ---
// You can easily replace this with data from an API or your own content
const accordionData: AccordionItem[] = [
  {
    question: 'What is React?',
    answer: 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.'
  },
  {
    question: 'What is Tailwind CSS?',
    answer: 'Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.'
  },
  {
    question: 'How do they work together?',
    answer: 'React components can be styled using Tailwind classes directly in the JSX, which allows for rapid development and easy maintenance of a consistent design system.'
  },
  {
    question: 'Is this accordion accessible?',
    answer: 'Yes, basic accessibility is included. The question is a button for proper semantics and keyboard navigation. For more advanced use cases, you could add more ARIA attributes.'
  }
];

// --- AccordionIcon Component ---
// A simple SVG icon that rotates based on the open state
const AccordionIcon: React.FC<AccordionIconProps> = ({ isOpen }) => (
  <svg
    className={`w-6 h-6 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// --- AccordionItem Component ---
// Represents a single item in the accordion
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
      {/* Header part of the accordion item (Question and Icon) */}
      <button
        className="w-full flex justify-between items-center text-left py-4 px-5 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-opacity-75 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{item.question}</span>
        <AccordionIcon isOpen={isOpen} />
      </button>

      {/* Content part of the accordion item (Answer) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-5 pt-0 text-zinc-600 dark:text-zinc-300">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
// This is the main component that renders the accordion
const AccordionLast : React.FC = () => {
  // State to keep track of the currently open accordion item
  // null means all are closed. A number indicates the index of the open item.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function to handle clicks on accordion items
  const handleItemClick = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 ">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-zinc-900/20 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-1">Frequently Asked Questions</h1>
            <p className="text-center text-zinc-500 dark:text-zinc-400 mb-6">Here are some of our most asked questions.</p>
        </div>
        {/* Map through the data to create each accordion item */}
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default AccordionLast;
