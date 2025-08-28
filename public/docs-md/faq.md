# FAQ

A customizable FAQ component with accordion and grid examples, featuring smooth animations, optional search functionality, and responsive design.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/faq/faq.tsx`

## Usage

```tsx
"use client";

const sampleFaqs = [
  {
    index: 1,
    question: "What makes this FAQ component special?",
    answer:
      "This FAQ component features modern design with smooth animations, responsive layout, search functionality, and customizable color schemes. It's built with React and Tailwind CSS for optimal performance and beautiful aesthetics.",
  }
];

export default function FAQViewDemo() {
  return (
    
    {/* Accordion View */}
      
        Accordion View

        {/* Grid View (custom) */}
      
        Grid View (custom)
        
          {sampleFaqs.map((faq, i) => (
            
              {faq.question}
              {faq.answer}
            
          ))}

  );
}

```

## Props – FAQ

## FAQItem Object

---

**Component Path:** `faq\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
