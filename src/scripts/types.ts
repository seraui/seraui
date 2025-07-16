export type RegistryType =
  | "registry:block"
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme";

export interface RegistryFile {
  path: string;
  content: string;
  type: RegistryType;
}

export interface CssVars {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface RegistryItemSchema {
  $schema: string;
  name: string;
  title: string;
  description: string;
  author: string;
  type: RegistryType;
  registryDependencies?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  cssVars?: CssVars;
  files: RegistryFile[];
}
