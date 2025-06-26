import Accordion from './accordion'; 

// --- Data for the Accordion ---
const faqData = [
  {
    title: 'What are the key features of React?',
    content:
      "React's key features include its component-based architecture, virtual DOM for performance, JSX for templating, and one-way data flow. It can also be rendered on the server side, making it flexible for various use cases.",
  },
  {
    title: 'How does Tailwind CSS improve development speed?',
    content:
      'Tailwind CSS accelerates development by providing a vast library of utility classes that can be applied directly in your HTML. This eliminates the need to write custom CSS for most styling, allowing for rapid prototyping and consistent design.',
  },
  {
    title: 'What are best practices for accessibility (a11y)?',
    content:
      'Best practices for accessibility include using semantic HTML (e.g., <button>, <nav>), providing text alternatives for images (alt text), ensuring sufficient color contrast, enabling keyboard navigation, and using ARIA roles and attributes where necessary.',
  },
  {
    title: 'How do you manage state in a complex React application?',
    content:
      'For complex applications, state can be managed using built-in hooks like `useReducer` and `useContext` for medium-sized apps, or dedicated state management libraries like Redux, Zustand, or MobX for larger, more intricate state requirements.',
  },
];

// --- The Page Component ---
export default function AccordionPage() {
  return (
    <div className='flex flex-col items-center justify-center font-sans p-4 transition-colors duration-500'>
      <div className='w-full max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-slate-100 text-center mb-2'>
          Modern Accordion
        </h1>
        <p className='text-gray-600 dark:text-slate-400 text-center mb-10'>
          A production-ready, accessible, and stylish accordion component.
        </p>
        
        {/* Here we use the reusable component with our data */}
        <Accordion items={faqData} />

      </div>
    </div>
  );
}