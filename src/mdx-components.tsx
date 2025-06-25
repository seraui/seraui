import type { MDXComponents } from "mdx/types";
import { createSlug } from "./lib/utils";
import { CodeBlock } from "./components/ui/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: ({ children, ...props }: React.ComponentProps<"h1">) => {
      const id = createSlug(children?.toString() || "");
      return (
        <h1 id={id} className="text-4xl font-bold mb-6 mt-8 first:mt-0" {...props}>
          {children}
        </h1>
      );
    },

    h2: ({ children, ...props }: React.ComponentProps<"h2">) => {
      const id = createSlug(children?.toString() || "");
      return (
        <h2 id={id} className="text-3xl font-semibold mb-4 mt-8 first:mt-0 border-b pb-2" {...props}>
          {children}
        </h2>
      );
    },

    h3: ({ children, ...props }: React.ComponentProps<"h3">) => {
      const id = createSlug(children?.toString() || "");
      return (
        <h3 id={id} className="text-2xl font-semibold mb-3 mt-6 first:mt-0" {...props}>
          {children}
        </h3>
      );
    },

    h4: ({ children, ...props }: React.ComponentProps<"h4">) => {
      const id = createSlug(children?.toString() || "");
      return (
        <h4 id={id} className="text-xl font-semibold mb-2 mt-4 first:mt-0" {...props}>
          {children}
        </h4>
      );
    },

    p: ({ children, ...props }: React.ComponentProps<"p">) => {
      return (
        <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300" {...props}>
          {children}
        </p>
      );
    },

    ul: ({ children, ...props }: React.ComponentProps<"ul">) => {
      return (
        <ul className="list-disc list-inside mb-6 ml-6 space-y-2" {...props}>
          {children}
        </ul>
      );
    },

    ol: ({ children, ...props }: React.ComponentProps<"ol">) => {
      return (
        <ol className="list-decimal list-inside mb-6 ml-6 space-y-2" {...props}>
          {children}
        </ol>
      );
    },

    li: ({ children, ...props }: React.ComponentProps<"li">) => {
      return (
        <li className="text-gray-700 dark:text-gray-300" {...props}>
          {children}
        </li>
      );
    },

    blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => {
      return (
        <blockquote className="border-l-4 border-blue-500 pl-6 italic my-6 text-gray-600 dark:text-gray-400" {...props}>
          {children}
        </blockquote>
      );
    },

    code: ({ children, className, ...props }: React.ComponentProps<"code">) => {
      // If this code element has a language class, it's part of a pre block
      // and will be handled by our CodeBlock component, so return as-is
      if (className?.includes('language-')) {
        return <code className={className} {...props}>{children}</code>;
      }

      // Otherwise, it's inline code, so style it appropriately
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-red-600 dark:text-red-400" {...props}>
          {children}
        </code>
      );
    },

    pre: ({ children, ...props }: React.ComponentProps<"pre">) => {
      return <CodeBlock {...props}>{children}</CodeBlock>;
    },

    table: ({ children, ...props }: React.ComponentProps<"table">) => {
      return (
        <div className="my-8 w-full overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" {...props}>
            {children}
          </table>
        </div>
      );
    },

    thead: ({ children, ...props }: React.ComponentProps<"thead">) => {
      return (
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700" {...props}>
          {children}
        </thead>
      );
    },

    tbody: ({ children, ...props }: React.ComponentProps<"tbody">) => {
      return (
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800" {...props}>
          {children}
        </tbody>
      );
    },

    tr: ({ children, ...props }: React.ComponentProps<"tr">) => {
      return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150 hover:shadow-sm" {...props}>
          {children}
        </tr>
      );
    },

    th: ({ children, ...props }: React.ComponentProps<"th">) => {
      return (
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600" {...props}>
          {children}
        </th>
      );
    },

    td: ({ children, ...props }: React.ComponentProps<"td">) => {
      return (
        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100" {...props}>
          {children}
        </td>
      );
    },

    a: ({ children, href, ...props }: React.ComponentProps<"a">) => {
      return (
        <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline font-medium" {...props}>
          {children}
        </a>
      );
    },

    strong: ({ children, ...props }: React.ComponentProps<"strong">) => {
      return (
        <strong className="font-bold" {...props}>
          {children}
        </strong>
      );
    },

    em: ({ children, ...props }: React.ComponentProps<"em">) => {
      return (
        <em className="italic" {...props}>
          {children}
        </em>
      );
    },

    hr: ({ ...props }: React.ComponentProps<"hr">) => {
      return (
        <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
      );
    },

    // Strikethrough text (GitHub Flavored Markdown)
    del: ({ children, ...props }: React.ComponentProps<"del">) => {
      return (
        <del className="line-through opacity-70" {...props}>
          {children}
        </del>
      );
    },

    // Task list checkboxes
    input: ({ type, checked, disabled, ...props }: React.ComponentProps<"input">) => {
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="mr-2 accent-blue-600"
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },

    // Keyboard keys
    kbd: ({ children, ...props }: React.ComponentProps<"kbd">) => {
      return (
        <kbd className="inline-flex items-center rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-mono" {...props}>
          {children}
        </kbd>
      );
    },

    // Highlighted text
    mark: ({ children, ...props }: React.ComponentProps<"mark">) => {
      return (
        <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded" {...props}>
          {children}
        </mark>
      );
    },

    // Subscript and superscript
    sub: ({ children, ...props }: React.ComponentProps<"sub">) => {
      return (
        <sub className="text-xs" {...props}>
          {children}
        </sub>
      );
    },

    sup: ({ children, ...props }: React.ComponentProps<"sup">) => {
      return (
        <sup className="text-xs" {...props}>
          {children}
        </sup>
      );
    },
  };
}
