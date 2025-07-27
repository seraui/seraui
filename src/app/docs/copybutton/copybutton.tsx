"use client";
import React, { useState } from "react";

interface IconProps {
  className?: string;
  active?: boolean;
}

const NpmIcon = ({ className, active }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: active ? "#CB3837" : "currentColor" }}
  >
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"></path>
  </svg>
);

const PnpmIcon = ({ className, active }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    role="img"
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: active ? "#F69220" : "currentColor" }}
  >
    {" "}
    {/* Using a distinct color for active pnpm */}
    <title></title>
    <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"></path>
  </svg>
);

const YarnIcon = ({ className, active }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 496 512"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: active ? "#2C8EBB" : "currentColor" }}
  >
    {" "}
    {/* Using a distinct color for active yarn */}
    <path d="M393.9 345.2c-39 9.3-48.4 32.1-104 47.4 0 0-2.7 4-10.4 5.8-13.4 3.3-63.9 6-68.5 6.1-12.4.1-19.9-3.2-22-8.2-6.4-15.3 9.2-22 9.2-22-8.1-5-9-9.9-9.8-8.1-2.4 5.8-3.6 20.1-10.1 26.5-8.8 8.9-25.5 5.9-35.3.8-10.8-5.7.8-19.2.8-19.2s-5.8 3.4-10.5-3.6c-6-9.3-17.1-37.3 11.5-62-1.3-10.1-4.6-53.7 40.6-85.6 0 0-20.6-22.8-12.9-43.3 5-13.4 7-13.3 8.6-13.9 5.7-2.2 11.3-4.6 15.4-9.1 20.6-22.2 46.8-18 46.8-18s12.4-37.8 23.9-30.4c3.5 2.3 16.3 30.6 16.3 30.6s13.6-7.9 15.1-5c8.2 16 9.2 46.5 5.6 65.1-6.1 30.6-21.4 47.1-27.6 57.5-1.4 2.4 16.5 10 27.8 41.3 10.4 28.6 1.1 52.7 2.8 55.3.8 1.4 13.7.8 36.4-13.2 12.8-7.9 28.1-16.9 45.4-17 16.7-.5 17.6 19.2 4.9 22.2zM496 256c0 136.9-111.1 248-248 248S0 392.9 0 256 111.1 8 248 8s248 111.1 248 248zm-79.3 75.2c-1.7-13.6-13.2-23-28-22.8-22 .3-40.5 11.7-52.8 19.2-4.8 3-8.9 5.2-12.4 6.8 3.1-44.5-22.5-73.1-28.7-79.4 7.8-11.3 18.4-27.8 23.4-53.2 4.3-21.7 3-55.5-6.9-74.5-1.6-3.1-7.4-11.2-21-7.4-9.7-20-13-22.1-15.6-23.8-1.1-.7-23.6-16.4-41.4 28-12.2.9-31.3 5.3-47.5 22.8-2 2.2-5.9 3.8-10.1 5.4h.1c-8.4 3-12.3 9.9-16.9 22.3-6.5 17.4.2 34.6 6.8 45.7-17.8 15.9-37 39.8-35.7 82.5-34 36-11.8 73-5.6 79.6-1.6 11.1 3.7 19.4 12 23.8 12.6 6.7 30.3 9.6 43.9 2.8 4.9 5.2 13.8 10.1 30 10.1 6.8 0 58-2.9 72.6-6.5 6.8-1.6 11.5-4.5 14.6-7.1 9.8-3.1 36.8-12.3 62.2-28.7 18-11.7 24.2-14.2 37.6-17.4 12.9-3.2 21-15.1 19.4-28.2z"></path>
  </svg>
);

const BunIcon = ({ className, active }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    role="img"
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: active ? "#FBF0DF" : "currentColor" }}
  >
    <title></title>
    <path d="M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083 5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z"></path>
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);

const CopyButton = () => {
  return <CodeBlock />;
};

const CodeBlock = () => {
  const [activeTab, setActiveTab] = useState<"npm" | "pnpm" | "yarn" | "bun">(
    "npm"
  );
  const [copied, setCopied] = useState(false);

  const commands: Record<
    "npm" | "pnpm" | "yarn" | "bun",
    { command: string; package: string; url: string }
  > = {
    npm: {
      command: "npx",
      package: "shadcn@latest",
      url: "add button",
    },
    pnpm: {
      command: "pnpm dlx",
      package: "shadcn@latest",
      url: "add button",
    },
    yarn: {
      command: "yarn dlx",
      package: "shadcn@latest",
      url: "add button",
    },
    bun: {
      command: "bunx",
      package: "shadcn@latest",
      url: "add button",
    },
  };

  const tabs: Array<{
    id: "npm" | "pnpm" | "yarn" | "bun";
    label: string;
    icon: React.ComponentType<IconProps>;
  }> = [
    { id: "npm", label: "npm", icon: NpmIcon },
    { id: "pnpm", label: "pnpm", icon: PnpmIcon },
    { id: "yarn", label: "yarn", icon: YarnIcon },
    { id: "bun", label: "bun", icon: BunIcon },
  ];

  const activeCommand = commands[activeTab];

  const handleCopy = () => {
    const commandText = `${activeCommand.command} ${activeCommand.package} ${activeCommand.url}`;

    const textarea = document.createElement("textarea");
    textarea.value = commandText;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text using execCommand: ", err);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(commandText)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((clipErr) => {
            console.error("Failed to copy text using Clipboard API: ", clipErr);
          });
      } else {
        console.error("Clipboard API not available and execCommand failed.");
      }
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="relative mt-2 rounded-lg border border-zinc-200 dark:border-zinc-700 w-full mx-auto">
      <div className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-1 px-4 py-2 text-sm border-b-2 transition-all duration-200 focus:outline-none cursor-pointer rounded-t-md
                  ${
                    activeTab === tab.id
                      ? "border-amber-400 text-zinc-900 dark:text-zinc-50 font-bold bg-white dark:bg-zinc-900/80 shadow-sm"
                      : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                  }`}
                onClick={() => setActiveTab(tab.id)}
                style={{ borderRadius: "0.5rem 0.5rem 0px 0px" }}
              >
                <tab.icon className="w-4 h-4" active={activeTab === tab.id} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="cursor-pointer z-20 p-2 hover:text-foreground transition-colors relative top-0 right-0 text-zinc-900 dark:text-zinc-50 focus:outline-none"
              title="Copy code"
            >
              <div
                className={`absolute inset-0 transform transition-all duration-300 ${copied ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
              >
                <CopyIcon className="h-4 w-4" />
              </div>
              <div
                className={`absolute inset-0 transform transition-all duration-300 ${copied ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
              >
                <CheckIcon className="h-4 w-4 text-green-500" />
              </div>
            </button>
          </div>
        </div>
        <div className="text-sm text-left font-mono text-nowrap font-medium bg-white dark:bg-zinc-950 px-4 py-4 overflow-x-auto max-w-full min-w-0">
          <span className="text-amber-400">{activeCommand.command}</span>{" "}
          <span className="text-teal-500">{activeCommand.package}</span>{" "}
          <span className="text-zinc-700 dark:text-zinc-300">
            {activeCommand.url}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CopyButton;
