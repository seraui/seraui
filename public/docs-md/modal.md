# Modal 

A flexible and accessible modal dialog component that displays content in a layer above the page.

## Basic Usage

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/modal/basic-modal.tsx`

## Features

- ✅ **Portal Rendering** - Renders at document body level to avoid z-index conflicts
- ✅ **Theme Support** - Automatic dark/light mode support
- ✅ **Multiple Sizes** - sm, md, lg, xl options for different content needs
- ✅ **Accessible** - ARIA attributes, keyboard navigation, focus management
- ✅ **Easy Close** - ESC key, click outside, or close button
- ✅ **Scroll Lock** - Prevents background scrolling when open

## Animation Types

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/modal/animation-modal.tsx`

## Installation

```bash
npx shadcn@latest add modal.json
```

## Size Variants

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/modal/size-variants.tsx`

## Form Modals

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/modal/form-modal.tsx`

## Confirmation Modals

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/modal/confirmation-modal.tsx`

## Success & No Title Modals

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/modal/success-modal.tsx`

## Props

  | **Prop** | **Type** | **Default** | **Description** |
  |----------|----------|-------------|-----------------|
  | `isOpen` | `boolean` | — | Controls modal visibility |
  | `onClose` | `() => void` | — | Called when modal should close |
  | `children` | `ReactNode` | — | Content inside the modal |
  | `title` | `string` | `undefined` | Optional header title |
  | `size` | `'sm'  'md' 'lg' 'xl'` | `'md'` | Modal size |
  | `animation` | `'scale'  'slide' 'fade' 'bounce'` | `'scale'` | Animation type |

## Usage

```tsx

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>Open Modal

       setIsOpen(false)}
        title="My Modal"
        size="md"
        animation="bounce"
      >
        Modal content goes here...

  );
}
```

---

**Component Path:** `modal/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
