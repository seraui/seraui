"use client";

import React from "react";

interface MdxTableProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "minimal" | "bordered";
}

export function MdxTable({
  children,
  className = "",
  variant = "default",
}: MdxTableProps) {
  // Extract text content from React children
  const extractTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === "string") {
      return children;
    }
    if (typeof children === "number") {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      return extractTextFromChildren((children.props as any).children);
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join("");
    }
    return "";
  };

  // Parse the markdown table from children string
  const parseMarkdownTable = (markdown: string) => {
    const lines = markdown
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    if (lines.length < 2) return { headers: [], rows: [] };

    // Extract headers (first line)
    const headerLine = lines[0];
    const headers = headerLine
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell !== "");

    // Skip separator line (second line with dashes)
    // Extract data rows (from third line onwards)
    const dataLines = lines.slice(2);
    const rows = dataLines.map((line) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell !== "")
    );

    return { headers, rows };
  };

  const markdownText = extractTextFromChildren(children);
  const { headers, rows } = parseMarkdownTable(markdownText);

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return {
          container: "my-6 overflow-x-auto",
          table: "w-full border-collapse",
          thead: "border-b-2 border-gray-200 dark:border-gray-600",
          th: "px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100",
          tbody: "",
          tr: "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 transition-colors",
          td: "px-4 py-3 text-sm text-gray-700 dark:text-gray-300",
        };
      case "bordered":
        return {
          container: "my-6 overflow-x-auto",
          table:
            "w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm",
          thead:
            "bg-gray-100 dark:bg-black border-b border-gray-300 dark:border-gray-600",
          th: "border-r border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 last:border-r-0",
          tbody: "bg-white dark:bg-black",
          tr: "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors last:border-b-0",
          td: "border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-gray-200 last:border-r-0",
        };
      default:
        return {
          container: "my-6 overflow-x-auto not-prose",
          table:
            "w-full border-collapse rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm bg-white dark:bg-black",
          thead:
            "bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-700",
          th: "px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0",
          tbody: "divide-y divide-gray-200 dark:divide-gray-700",
          tr: "hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors",
          td: "px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0",
        };
    }
  };

  const styles = getVariantStyles();

  // Helper function to render cell content with proper formatting
  const renderCellContent = (content: string) => {
    // Handle code blocks (backticks)
    if (content.startsWith("`") && content.endsWith("`")) {
      const codeContent = content.slice(1, -1);
      return (
        <code className="px-2 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 rounded border">
          {codeContent}
        </code>
      );
    }

    // Handle dash for empty/default values
    if (content === "-") {
      return <span className="text-zinc-400 dark:text-zinc-500">—</span>;
    }

    return content;
  };

  if (headers.length === 0) {
    return <div className="text-red-500">Invalid table format</div>;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={styles.th}>
                {renderCellContent(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
