
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./retro-style-accordion"


const RetroStyleAccordionDemo = () => {
  const accordionItems = [
    {
      value: "item-1",
      title: "Is this styled like the button?",
      content:
        "Yes! It uses the same bright green, black borders, and hard shadow to create a consistent look and feel. The hover and press effects are adapted for the accordion trigger.",
    },
    {
      value: "item-2",
      title: "Is it accessible?",
      content:
        "It's built with accessibility in mind. It uses button elements for triggers and ARIA attributes like aria-expanded and aria-controls.",
    },
    {
      value: "item-3",
      title: "Can I customize the content?",
      content:
        "Absolutely. You can put any React components or JSX inside the AccordionContent.",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center p-4 font-sans">
      <Accordion defaultValue="item-1">
        {accordionItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RetroStyleAccordionDemo;