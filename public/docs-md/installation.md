# Shadcn/ui (Recommended) 

How to install dependencies and structure your app.

> **Note:** We have the exact same installation process as shadcn/ui.

## Seraui (Alternative) without Shadcn/ui

### CLI Usage

Initialize your project with the CLI:

```bash
npx seraui@latest init
```
```md
npx seraui@latest init
✔ SeraUI initialized successfully!

🌐 Registry URL: https://seraui.com/registry

📦 Dependencies installed:
  - clsx
  - tailwind-merge

📁 Directories created:
  - lib/
  - components/

✨ Ready to add components!
```

To see all available components:

```bash
npx seraui@latest show
```

```md
npx seraui@latest show
Need to install the following packages:
seraui@0.0.2
Ok to proceed? (y)

✔ SeraUI Available Components:

🧩 Components available for installation:
Last updated: 6/27/2025, 1:08:46 PM
Total components: 5

  1. accordion
  2. button
  3. tabs-classic
  4. tabs-fancy
  5. tabs

📖 For installation, type:
  npx seraui@latest add 

💡 Example:
  npx seraui@latest add button

```

### Initialize with a custom registry URL

```bash
npx seraui@latest init --url https://seraui.com/registry
```

### Add a component (uses saved URL)

```bash
npx seraui@latest add button
```

```md
npx seraui@latest add button
✔ Button added successfully!
```

### Add a component with a custom URL (one-time)

```bash
npx seraui@latest add button --url https://different-registry.com/registry
```

### Configure the default registry URL

```bash
npx seraui@latest config --url https://seraui.com/registry
```

---

**Component Path:** `installation/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
