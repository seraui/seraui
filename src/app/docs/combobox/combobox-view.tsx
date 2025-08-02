"use client";
import Combobox from "./combobox";

export default function ComboboxView() {
  const frameworks = [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "SvelteKit",
    "Remix",
    "Gatsby",
    "Astro",
    "Solid.js",
    "Preact",
    "Alpine.js",
    "Lit",
  ];

  const handleSelect = (value: string) => {
    console.log("Selected framework:", value);
  };

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose your favorite framework
        </label>
        <Combobox
          placeholder="Search frameworks..."
          options={frameworks}
          onSelect={handleSelect}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Type to filter or use arrow keys to navigate
        </p>
      </div>
    </div>
  );
}
