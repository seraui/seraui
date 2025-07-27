"use client";
import React, { useState } from "react";

interface FileTreeItem {
  name: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
}

interface FolderIconProps {
  isOpen: boolean;
}

interface ChevronIconProps {
  isOpen: boolean;
}

interface TreeIconProps {
  item: FileTreeItem;
  isOpen: boolean;
}

interface TreeNodeProps {
  item: FileTreeItem;
  selectedFile: string;
  onFileSelect: (fileName: string) => void;
}

const FileIcon = () => (
  <svg
    className="w-5 h-5 mr-2 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
  </svg>
);

const FolderIcon = ({ isOpen }: FolderIconProps) => (
  <svg
    className="w-5 h-5 mr-2 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    )}
  </svg>
);

const ChevronIcon = ({ isOpen }: ChevronIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`}
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const fileTreeData: FileTreeItem[] = [
  {
    name: "public",
    type: "folder",
    children: [
      { name: "index.html", type: "file" },
      { name: "favicon.ico", type: "file" },
    ],
  },
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Button.jsx", type: "file" },
          { name: "Modal.js", type: "file" },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [{ name: "useFetch.js", type: "file" }],
      },
      { name: "App.jsx", type: "file" },
      { name: "index.js", type: "file" },
      { name: "styles.css", type: "file" },
    ],
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
];

const TreeIcon = ({ item, isOpen }: TreeIconProps) => {
  if (item.type === "folder") {
    return <FolderIcon isOpen={isOpen} />;
  }
  return <FileIcon />;
};

const TreeNode = ({ item, selectedFile, onFileSelect }: TreeNodeProps) => {
  const isFolder = item.type === "folder";
  const [isOpen, setIsOpen] = useState(isFolder);

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(item.name);
    }
  };

  const isSelected = !isFolder && selectedFile === item.name;

  return (
    <div className="text-gray-700 dark:text-gray-300 relative">
      <div
        className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-colors duration-150 ${
          isSelected
            ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        onClick={handleToggle}
      >
        <div className="flex items-center flex-grow">
          {isFolder ? (
            <ChevronIcon isOpen={isOpen} />
          ) : (
            <div className="w-4 shrink-0"></div>
          )}
          <div className="flex items-center ml-1">
            <TreeIcon item={item} isOpen={isOpen} />
            <span className="text-sm ml-1.5">{item.name}</span>
          </div>
        </div>
      </div>

      <div
        className={`pl-4 relative overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
      >
        <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-800"></div>
        {isFolder &&
          isOpen &&
          item.children &&
          item.children.map((child: FileTreeItem) => (
            <TreeNode
              key={child.name}
              item={child}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default function FileTree2() {
  const [selectedFile, setSelectedFile] = useState("App.jsx");

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    console.log(`Selected file: ${fileName}`);
  };

  return (
    <div className="font-mono p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="w-full max-w-xs">
        {fileTreeData.map((item) => (
          <TreeNode
            key={item.name}
            item={item}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        ))}
      </div>
    </div>
  );
}
