"use client";

import { FAQ } from "./faq";

const sampleFaqs = [
  {
    index: 1,
    question: "What makes this FAQ component special?",
    answer:
      "This FAQ component features modern design with smooth animations, responsive layout, search functionality, and customizable color schemes. It's built with React and Tailwind CSS for optimal performance and beautiful aesthetics.",
  },
  {
    index: 2,
    question: "How do I customize the color scheme?",
    answer:
      "You can customize the color scheme by passing a 'colorScheme' prop with values like 'blue', 'purple', or 'green'. The component automatically applies gradients, hover effects, and accent colors based on your choice.",
  },
  {
    index: 3,
    question: "Is the component mobile-responsive?",
    answer:
      "Absolutely! The component is fully responsive and works seamlessly across all device sizes. It features adaptive typography, flexible layouts, and touch-friendly interactions for mobile devices.",
  },
];

export default function FAQViewDemo() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center">Accordion View</h3>
        <FAQ faqs={sampleFaqs} colorScheme="blue" searchable />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center">Grid View (custom)</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {sampleFaqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gradient-to-b from-blue-500 to-purple-600">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
