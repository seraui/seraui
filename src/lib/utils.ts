import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export const cn = (...classNames: ClassNameValue[]) => {
  return twMerge(clsx(...classNames));
};

export const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
