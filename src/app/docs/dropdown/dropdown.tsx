"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";

const User = (props: React.SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Community = (props: React.SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Subscription = (props: React.SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const Settings = (props: React.SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 6h8" />
    <path d="M16 6h4" />
    <path d="M10 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 18h4" />
    <path d="M12 18h8" />
    <path d="M10 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 12h4" />
    <path d="M12 12h8" />
  </svg>
);

const HelpCenter = (props: React.SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

const SignOut = (props: React.SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

interface DropdownMenuProps {
  children: ReactNode;
  trigger: ReactNode;
}

const DropdownMenu = ({ children, trigger }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-64 rounded-2xl shadow-xl bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in-0 zoom-in-95 p-2"
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
}

const DropdownMenuItem = ({
  children,
  onClick,
  active = false,
}: DropdownMenuItemProps) => (
  <a
    href="#"
    onClick={(e: React.MouseEvent) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
    className={`
      text-zinc-800 dark:text-zinc-200 font-medium group flex items-center 
      px-3 py-2.5 text-sm rounded-lg transition-colors duration-150
      ${
        active
          ? "bg-zinc-100 dark:bg-zinc-800"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }
    `}
    role="menuitem"
  >
    {children}
  </a>
);

const DropdownMenuSeparator = () => (
  <div className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
);

export default function Dropdown() {
  return (
    <div className=" flex items-center justify-center font-sans p-8">
      <DropdownMenu
        trigger={
          <button className="px-5 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
            Open Menu
          </button>
        }
      >
        <div className="flex flex-col space-y-1">
          <DropdownMenuItem
            onClick={() => console.log("Profile clicked")}
            active={true}
          >
            <User className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Community clicked")}>
            <Community className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Community</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Subscription clicked")}>
            <Subscription className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Subscription</span>
            <span className="ml-auto text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full px-2 py-0.5">
              PRO
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Settings clicked")}>
            <Settings className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Settings</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col space-y-1">
          <DropdownMenuItem onClick={() => console.log("Help Center clicked")}>
            <HelpCenter className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Help center</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Sign Out clicked")}>
            <SignOut className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenu>
    </div>
  );
}
