"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Shuffle,
  AlertCircle,
  BookOpen,
  Wallet,
  Mail,
  ShieldCheck,
  MonitorPlay,
  ChevronDown,
} from "lucide-react";

// Data for the FAQ section, including icons
const faqData = [
  {
    icon: <Briefcase size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "How do I create an account?",
    answer:
      'To create an account, simply click the "Sign Up" button at the top-right corner of the page and fill in your details. It only takes a minute!',
  },
  {
    icon: <Shuffle size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "Can I change my subscription plan?",
    answer:
      "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings. Changes will be prorated.",
  },
  {
    icon: (
      <AlertCircle size={20} className="text-gray-500 dark:text-gray-400" />
    ),
    question: "What happens if I forget my password?",
    answer:
      "Don't worry! You can easily reset your password by clicking the 'Forgot Password' link on the login page. We'll send a reset link to your email.",
  },
  {
    icon: <BookOpen size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "Where can I find the user guides?",
    answer:
      'All our user guides and documentation are available in the "Help" section of our website. You can also search for specific topics.',
  },
  {
    icon: <Wallet size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, MasterCard, and American Express. We also support payments via PayPal.",
  },
  {
    icon: <Mail size={20} className="text-gray-500 dark:text-gray-400" />,
    question: "How can I contact customer support?",
    answer:
      "Our support team is available 24/7. You can reach us via the contact form on our website, by email at support@example.com, or through live chat.",
  },
  {
    icon: (
      <ShieldCheck size={20} className="text-gray-500 dark:text-gray-400" />
    ),
    question: "Is my personal data secure?",
    answer:
      "Absolutely. We prioritize your privacy and security. We use state-of-the-art encryption and security protocols to protect all your data.",
  },
  {
    icon: (
      <MonitorPlay size={20} className="text-gray-500 dark:text-gray-400" />
    ),
    question: "Do you have video tutorials?",
    answer:
      'Yes, we have a library of video tutorials that cover all the main features of our platform. You can find them on our YouTube channel and in the "Tutorials" section.',
  },
];


interface AccordionItemProps {
  item: {
    icon: React.ReactNode;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className="flex items-center justify-between w-full p-4 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4">
          {item.icon}
          <span className="text-base font-medium text-gray-800 dark:text-gray-200">
            {item.question}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 text-gray-500 dark:text-gray-400 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 pl-12">
          <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};


export default function AccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(2); 

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
            General Questions
          </h1>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
