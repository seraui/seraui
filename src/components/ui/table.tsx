import React from 'react';

interface TableProps {
  headers: string[];
  rows: string[][];
  className?: string;
  variant?: 'default' | 'striped' | 'bordered' | 'minimal';
}

export function Table({ headers, rows, className = "", variant = 'default' }: TableProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'striped':
        return {
          table: "w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900",
          thead: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
          th: "px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider",
          tbody: "divide-y divide-gray-100 dark:divide-gray-800",
          tr: "even:bg-gray-50 dark:even:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200",
          td: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
        };
      case 'bordered':
        return {
          table: "w-full border-collapse border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md",
          thead: "bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600",
          th: "border-r border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider last:border-r-0",
          tbody: "bg-white dark:bg-gray-900",
          tr: "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
          td: "border-r border-gray-200 dark:border-gray-700 px-6 py-4 text-sm text-gray-900 dark:text-gray-100 last:border-r-0"
        };
      case 'minimal':
        return {
          table: "w-full border-collapse",
          thead: "border-b-2 border-gray-200 dark:border-gray-700",
          th: "px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100",
          tbody: "",
          tr: "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors",
          td: "px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
        };
      default:
        return {
          table: "w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900",
          thead: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700",
          th: "px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600",
          tbody: "divide-y divide-gray-100 dark:divide-gray-800",
          tr: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150 hover:shadow-sm",
          td: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`my-8 w-full overflow-x-auto ${className}`}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Enhanced markdown-style table component
interface MarkdownTableProps {
  children: React.ReactNode;
  variant?: 'default' | 'striped' | 'bordered' | 'minimal';
}

export function MarkdownTable({ children, variant = 'default' }: MarkdownTableProps) {
  const getTableStyles = () => {
    switch (variant) {
      case 'striped':
        return "w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900";
      case 'bordered':
        return "w-full border-collapse border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md";
      case 'minimal':
        return "w-full border-collapse";
      default:
        return "w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900";
    }
  };

  return (
    <div className="my-8 w-full overflow-x-auto">
      <table className={getTableStyles()}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getHeadStyles = () => {
    switch (variant) {
      case 'striped':
        return "bg-gradient-to-r from-blue-600 to-purple-600 text-white";
      case 'bordered':
        return "bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600";
      case 'minimal':
        return "border-b-2 border-gray-200 dark:border-gray-700";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700";
    }
  };

  return (
    <thead className={getHeadStyles()}>
      {children}
    </thead>
  );
}

export function TableBody({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getBodyStyles = () => {
    switch (variant) {
      case 'striped':
        return "divide-y divide-gray-100 dark:divide-gray-800";
      case 'bordered':
        return "bg-white dark:bg-gray-900";
      case 'minimal':
        return "";
      default:
        return "divide-y divide-gray-100 dark:divide-gray-800";
    }
  };

  return (
    <tbody className={getBodyStyles()}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getRowStyles = () => {
    switch (variant) {
      case 'striped':
        return "even:bg-gray-50 dark:even:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200";
      case 'bordered':
        return "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors";
      case 'minimal':
        return "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors";
      default:
        return "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-150 hover:shadow-sm";
    }
  };

  return (
    <tr className={getRowStyles()}>
      {children}
    </tr>
  );
}

export function TableHeader({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getHeaderStyles = () => {
    switch (variant) {
      case 'striped':
        return "px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider";
      case 'bordered':
        return "border-r border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider last:border-r-0";
      case 'minimal':
        return "px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100";
      default:
        return "px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600";
    }
  };

  return (
    <th className={getHeaderStyles()}>
      {children}
    </th>
  );
}

export function TableCell({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'striped' | 'bordered' | 'minimal' }) {
  const getCellStyles = () => {
    switch (variant) {
      case 'striped':
        return "px-6 py-4 text-sm text-gray-900 dark:text-gray-100";
      case 'bordered':
        return "border-r border-gray-200 dark:border-gray-700 px-6 py-4 text-sm text-gray-900 dark:text-gray-100 last:border-r-0";
      case 'minimal':
        return "px-4 py-3 text-sm text-gray-700 dark:text-gray-300";
      default:
        return "px-6 py-4 text-sm text-gray-900 dark:text-gray-100";
    }
  };

  return (
    <td className={getCellStyles()}>
      {children}
    </td>
  );
}

// Status badge component for tables
export function StatusBadge({ status, children }: { status: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case 'warning':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 'error':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case 'info':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {children}
    </span>
  );
}
