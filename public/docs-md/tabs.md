# Tabs Component 

A minimalistic and animated tab component built with **React**, **Tailwind CSS**, and powered by **Framer Motion** for smooth transitions.

## Introduction

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/tabs/tabs-view.tsx`

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add tabs.json
```

    Code available at: `src/components/core/tabs.tsx`

## Usage

Here's how to use the `Tabs` component in your project:

## Installation

You can manually copy the component into your project, **or** use the top-side CLI to install it automatically.

```bash
npx shadcn@latest add "https://seraui.com/registry/tabs.json"
```

> Once installed, you can use it anywhere in your app like this:

## Example Use Case

Use the `Tabs` component to organize different sections of content into a clean, navigable interface.

### Code Example

```tsx

export default function TabsView() {
  const tabData = [
    {
      id: 1,
      name: 'Photos',
      content:
        'This is the PHOTOS tab content. Here you would display your photo gallery or image collection.',
    },
    {
      id: 2,
      name: 'Music',
      content:
        'This is the MUSIC tab content. Here you would display your music player or audio tracks.',
    },
    {
      id: 3,
      name: 'Videos',
      content:
        'This is the VIDEOS tab content. Here you would display your video player or video collection.',
    },
  ];

  return ;
}
```

---

✅ Just import the component and pass your desired tab data — the rest is handled with smooth transitions and a beautiful UI.

Need more examples or want to add custom icons or components inside tabs? Let me know!

---

**Component Path:** `tabs/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
