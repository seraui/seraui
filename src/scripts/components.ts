import path from "path";
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
    path: path.join(__dirname, "../components/core/tabs.tsx"),
    dependencies: [],
  },
];
