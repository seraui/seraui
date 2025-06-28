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
  {
    
      name: "button",
      title: "Button",
      description:
        "A minimalistic tab component designed with React and Tailwind CSS.",
      path: "../app/docs/button",
      dependencies: [],
    
  },
  {
    name: "amazongift",
    title: "Amazon Gift",
    description:
      "A minimalistic tab component designed with React and Tailwind CSS.",
    path: "../app/docs/amazongift",
    dependencies: [],
  },
  {
    name : "login",
    title : "Login",
    description : "A minimalistic login component designed with React and Tailwind CSS.",
    path : "../app/docs/login",
    dependencies : [],
  },
  {
    name : "twostep",
    title : "Two Step",
    description : "A minimalistic two step component designed with React and Tailwind CSS.",
    path : "../app/docs/twostep",
    dependencies : [],
  },
  {
    name : "card",
    title : "Card",
    description : "A minimalistic card component designed with React and Tailwind CSS.",
    path : "../app/docs/card",
    dependencies : [],
  },
  {
    name : "search",
    title : "Search",
    description : "A minimalistic search component designed with React and Tailwind CSS.",
    path : "../app/docs/search",
    dependencies : [],
  },
];
