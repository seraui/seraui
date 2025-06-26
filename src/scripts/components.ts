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
    name: "tabs-classic",
    title: "Tabs Classic",
    description:
      "A minimalistic tab component designed with React and Tailwind CSS.",
    path: "../app/docs/tabs-classic",
    dependencies: [],
  },
  {
    name: "tabs-fancy",
    title: "Tabs Fancy",
    description:
      "A minimalistic tab component designed with React and Tailwind CSS.",
    path: "../app/docs/tabs-fancy",
    dependencies: [],
  },
];
