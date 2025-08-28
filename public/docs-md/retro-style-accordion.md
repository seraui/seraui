# Retro Style Accordion 

A retro-style accordion component that brings a nostalgic, vintage feel to your user interface. It features a classic design with hard shadows and a distinct, old-school aesthetic, perfect for applications aiming for a retro look.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/retro-style-accordion/retro-style-accordion.tsx`

## Usage

To use the retro style accordion, import the necessary components and structure them as shown below.

```tsx

export default function MyAccordion() {
  return (

        Is it accessible?

            Yes. It follows the WAI-ARIA design pattern for accordions, ensuring it is accessible to screen readers and keyboard users.

        Can I customize the style?

            Absolutely. The component is built with Tailwind CSS, and you can easily customize the appearance by passing your own classes.

  );
}
```

### Components

The accordion is composed of several components that work together:

-   **`Accordion`**: The main wrapper that provides context and state management for the accordion group.
-   **`AccordionItem`**: A container for each individual collapsible section. It requires a unique `value` prop.
-   **`AccordionTrigger`**: The button element that the user clicks to open or close an `AccordionItem`.
-   **`AccordionContent`**: The container for the content that is revealed when an `AccordionItem` is open.

---

**Component Path:** `retro-style-accordion\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
