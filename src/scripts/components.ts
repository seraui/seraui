import { RegistryItemSchema, RegistryType } from "./types";

type ComponentType = Omit<
  RegistryItemSchema,
  "$schema" | "files" | "type" | "author"
> &
  Partial<Pick<RegistryItemSchema, "type" | "author">> & {
    path: string;
    files?: {
      path: string;
      name: string;
      content: string;
      type: RegistryType;
    }[];
  };

export const components: ComponentType[] = [
  {
    name: "tabs",
    title: "Tabs",
    description:
      "A minimalistic tab component designed with React and Tailwind CSS.",
    path: "../components/core/tabs.tsx",
    dependencies: [],
  },
  {
    name: "loading-bar",
    title: "Loading Bar",
    description:
      "A YouTube-style loading bar component with smooth animations.",
    path: "../components/ui/loading-bar.tsx",
    dependencies: [],
  },
  {
    name: "loading-link",
    title: "Loading Link",
    description:
      "A link component that shows loading state with progress indication.",
    path: "../components/ui/loading-link.tsx",
    dependencies: ["loading-bar"],
  },
  {
    name: "table",
    title: "Table",
    description:
      "A flexible table component with multiple variants and styling options.",
    path: "../components/ui/table.tsx",
    dependencies: [],
  },
  {
    name: "code-block",
    title: "Code Block",
    description:
      "A syntax-highlighted code block component with copy functionality.",
    path: "../components/ui/code-block.tsx",
    dependencies: [],
  },
];
