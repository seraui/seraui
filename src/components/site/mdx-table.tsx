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
      return extractTextFromChildren(
        (children.props as { children?: React.ReactNode }).children
      );
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join("");
    }
    return "";
  };

  // Enhanced markdown table detection and parsing
  const parseMarkdownTable = (markdown: string) => {
    // Clean and normalize the input
    const normalizedText = markdown
      .replace(/\r\n/g, "\n") // Normalize line endings
      .replace(/\r/g, "\n")
      .trim();

    if (!normalizedText) return { headers: [], rows: [], alignments: [] };

    const lines = normalizedText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // More robust table detection
    const tableLines = lines.filter((line) => {
      // Must contain at least one pipe and not be just pipes/spaces/dashes
      return line.includes("|") && /[^\s\-|]/.test(line);
    });

    if (tableLines.length < 2) return { headers: [], rows: [], alignments: [] };

    // Find potential separator line (contains dashes and pipes)
    let separatorIndex = -1;
    let headerLine = "";

    for (let i = 0; i < tableLines.length; i++) {
      const line = tableLines[i];
      // Separator line: contains dashes, pipes, colons, and spaces only
      if (/^[\s\-:|]+$/.test(line) && line.includes("-")) {
        separatorIndex = i;
        if (i > 0) {
          headerLine = tableLines[i - 1];
        }
        break;
      }
    }

    // If no separator found, try to detect table structure differently
    if (separatorIndex === -1 || !headerLine) {
      // Look for consistent pipe patterns
      const potentialHeaders = tableLines.filter(
        (line) =>
          line.split("|").length > 2 && !line.match(/^\s*\|[\s\-:|]*\|\s*$/)
      );

      if (potentialHeaders.length === 0)
        return { headers: [], rows: [], alignments: [] };

      headerLine = potentialHeaders[0];
      separatorIndex = tableLines.indexOf(headerLine);
    }

    // Parse headers
    const parseTableRow = (line: string): string[] => {
      // Remove leading/trailing pipes and split
      const cleaned = line.replace(/^\s*\|/, "").replace(/\|\s*$/, "");
      return cleaned
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell, index, arr) => {
          // Keep all cells, even empty ones in the middle
          return index < arr.length;
        });
    };

    const headers = parseTableRow(headerLine);

    if (headers.length === 0) return { headers: [], rows: [], alignments: [] };

    // Parse alignment from separator line if it exists
    const alignments: ("left" | "center" | "right")[] = [];
    if (separatorIndex >= 0 && separatorIndex < tableLines.length) {
      const separatorLine = tableLines[separatorIndex];
      const alignCells = parseTableRow(separatorLine);

      alignCells.forEach((cell) => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(":") && trimmed.endsWith(":")) {
          alignments.push("center");
        } else if (trimmed.endsWith(":")) {
          alignments.push("right");
        } else {
          alignments.push("left");
        }
      });
    }

    // Ensure alignments match header count
    while (alignments.length < headers.length) {
      alignments.push("left");
    }

    // Parse data rows (skip header and separator)
    const dataLines = tableLines.filter((line, index) => {
      const isHeader = line === headerLine;
      const isSeparator = index === separatorIndex;
      const isValidDataRow =
        !isHeader &&
        !isSeparator &&
        /[^\s\-:|]/.test(line) &&
        line.includes("|");
      return isValidDataRow;
    });

    const rows = dataLines.map((line) => {
      const cells = parseTableRow(line);

      // Normalize row length to match headers
      const normalizedCells = [...cells];
      while (normalizedCells.length < headers.length) {
        normalizedCells.push("");
      }

      return normalizedCells.slice(0, headers.length);
    });

    return { headers, rows, alignments };
  };

  const markdownText = extractTextFromChildren(children);
  const { headers, rows, alignments } = parseMarkdownTable(markdownText);

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return {
          container: "my-6 overflow-x-auto",
          table: "w-full border-collapse",
          thead: "border-b-2 border-gray-200 dark:border-gray-600",
          th: "px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider",
          tbody: "",
          tr: "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 transition-colors",
          td: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100",
        };
      case "bordered":
        return {
          container: "my-6 overflow-x-auto",
          table:
            "w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm",
          thead:
            "bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700",
          th: "border-r border-gray-200 dark:border-gray-700 px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider last:border-r-0",
          tbody: "bg-white dark:bg-gray-900",
          tr: "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors last:border-b-0",
          td: "border-r border-gray-200 dark:border-gray-700 px-6 py-4 text-sm text-gray-900 dark:text-gray-100 last:border-r-0",
        };
      default:
        return {
          container: "my-8 overflow-x-auto not-prose",
          table:
            "w-full border-collapse rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm bg-white dark:bg-gray-900",
          thead:
            "bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700",
          th: "px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700 last:border-r-0",
          tbody: "divide-y divide-gray-200 dark:divide-gray-700",
          tr: "hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors",
          td: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0",
        };
    }
  };

  const styles = getVariantStyles();

  // Helper function to get text alignment class
  const getAlignmentClass = (alignment: "left" | "center" | "right") => {
    switch (alignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  // Enhanced cell content rendering with more markdown support
  const renderCellContent = (content: string) => {
    if (!content || content.trim() === "") {
      return <span className="text-zinc-400 dark:text-zinc-500">—</span>;
    }

    const trimmed = content.trim();

    // Handle multiple inline code blocks
    if (trimmed.includes("`")) {
      const parts = trimmed.split(/(`[^`]*`)/);
      return (
        <>
          {parts.map((part, index) => {
            if (part.startsWith("`") && part.endsWith("`")) {
              const codeContent = part.slice(1, -1);
              return (
                <code
                  key={index}
                  className="px-2 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 rounded border mx-1"
                >
                  {codeContent}
                </code>
              );
            }
            return part;
          })}
        </>
      );
    }

    // Handle bold text (**text** or __text__)
    if (trimmed.includes("**") || trimmed.includes("__")) {
      const boldRegex = /(\*\*[^*]+\*\*|__[^_]+__)/g;
      const parts = trimmed.split(boldRegex);
      return (
        <>
          {parts.map((part, index) => {
            if (
              (part.startsWith("**") && part.endsWith("**")) ||
              (part.startsWith("__") && part.endsWith("__"))
            ) {
              const boldContent = part.slice(2, -2);
              return (
                <strong key={index} className="font-semibold">
                  {boldContent}
                </strong>
              );
            }
            return part;
          })}
        </>
      );
    }

    // Handle italic text (*text* or _text_)
    if (trimmed.includes("*") || trimmed.includes("_")) {
      const italicRegex = /(\*[^*]+\*|_[^_]+_)/g;
      const parts = trimmed.split(italicRegex);
      return (
        <>
          {parts.map((part, index) => {
            if (
              (part.startsWith("*") &&
                part.endsWith("*") &&
                !part.includes("**")) ||
              (part.startsWith("_") &&
                part.endsWith("_") &&
                !part.includes("__"))
            ) {
              const italicContent = part.slice(1, -1);
              return (
                <em key={index} className="italic">
                  {italicContent}
                </em>
              );
            }
            return part;
          })}
        </>
      );
    }

    // Handle links [text](url)
    if (trimmed.includes("[") && trimmed.includes("](")) {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = trimmed.split(linkRegex);
      const result = [];

      for (let i = 0; i < parts.length; i += 3) {
        if (parts[i]) result.push(parts[i]);
        if (parts[i + 1] && parts[i + 2]) {
          result.push(
            <a
              key={i}
              href={parts[i + 2]}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {parts[i + 1]}
            </a>
          );
        }
      }
      return <>{result}</>;
    }

    // Handle special characters and symbols
    if (trimmed === "-" || trimmed === "—") {
      return <span className="text-zinc-400 dark:text-zinc-500">—</span>;
    }

    // Handle checkboxes
    if (trimmed === "✓" || trimmed === "✔" || trimmed === "✅") {
      return <span className="text-green-600 dark:text-green-400">✓</span>;
    }
    if (trimmed === "✗" || trimmed === "✘" || trimmed === "❌") {
      return <span className="text-red-600 dark:text-red-400">✗</span>;
    }

    // Handle numbers (add slight monospace for better alignment)
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      return <span className="font-mono">{trimmed}</span>;
    }

    return trimmed;
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
              <th
                key={index}
                className={`${styles.th} ${getAlignmentClass(alignments[index] || "left")}`}
              >
                {renderCellContent(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${styles.td} ${getAlignmentClass(alignments[cellIndex] || "left")}`}
                >
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
