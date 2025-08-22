'use client';
import React, { useState, useId } from 'react';

// Type definitions
interface ButtonProps {
  asChild?: boolean;
  className?: string;
  variant?: 'default' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'icon';
  children?: React.ReactNode;
  onClick?: () => void;
}

interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuListProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuItemProps {
  children: React.ReactNode;
  className?: string;
  key?: number;
}

interface NavigationMenuLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

// Icon Components
const MenuIcon: React.FC = () => (
  <svg
    className="pointer-events-none"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

const SearchIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// UI Components
const Logo: React.FC = () => (
  <div className="flex items-center justify-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="28" height="28">
      <g clipPath="url(#cs_clip_1_glass)">
        <mask id="cs_mask_1_glass" style={{ maskType: "alpha" }} width="200" height="186" x="0" y="7" maskUnits="userSpaceOnUse">
          <path fill="#fff" d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"></path>
        </mask>
        <g mask="url(#cs_mask_1_glass)">
          <path fill="#fff" d="M200 0H0v200h200V0z"></path>
          <path fill="url(#paint0_linear_glass)" d="M200 0H0v200h200V0z"></path>
          <g filter="url(#filter0_f_glass)">
            <path fill="#00D4FF" d="M130 0H69v113h61V0z"></path>
            <path fill="#00FF88" fillOpacity="0.35" d="M196 91H82v102h114V91z"></path>
            <path fill="#FF6B6B" fillOpacity="0.74" d="M113 80H28v120h85V80z"></path>
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_f_glass" width="278" height="310" x="-27" y="-55" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur result="effect1_foregroundBlur_glass" stdDeviation="27.5"></feGaussianBlur>
        </filter>
        <linearGradient id="paint0_linear_glass" x1="186.5" x2="37" y1="37" y2="186.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" stopOpacity="0.8"></stop>
          <stop offset="1" stopColor="#00FF88" stopOpacity="0.6"></stop>
        </linearGradient>
        <clipPath id="cs_clip_1_glass">
          <path fill="#fff" d="M0 0H200V200H0z"></path>
        </clipPath>
      </defs>
    </svg>
    <span className="font-bold text-lg tracking-wider text-gray-900 dark:text-white">Sera UI</span>
  </div>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    const baseClasses = "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm";

    const variantClasses: Record<string, string> = {
      default: "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-gray-800 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 hover:border-gray-700 dark:hover:border-gray-400 shadow-lg hover:shadow-xl",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm",
      glass: "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 shadow-2xl hover:shadow-3xl backdrop-blur-md"
    };

    const sizeClasses: Record<string, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-lg px-3",
      icon: "h-10 w-10",
    };

    const elementProps = props as React.HTMLAttributes<HTMLElement>;
    return (
      <Comp
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...elementProps}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

const NavigationMenu: React.FC<NavigationMenuProps> = ({ children, className = '' }) => (
  <nav className={`relative z-10 ${className}`}>{children}</nav>
);

const NavigationMenuList: React.FC<NavigationMenuListProps> = ({ children, className = '' }) => (
  <ul className={`flex items-center ${className}`}>{children}</ul>
);

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ children, className = '', ...props }) => (
  <li className={`list-none ${className}`} {...props}>{children}</li>
);

const NavigationMenuLink: React.FC<NavigationMenuLinkProps> = ({ href, className = '', children }) => (
  <a href={href} className={`block px-3 py-2 transition-all duration-300 ${className}`}>
    {children}
  </a>
);

// Main Glassmorphism Header Component
const navigationLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "About" },
  { href: "#", label: "Services" },
  { href: "#", label: "Contact" },
];

function GlassmorphismHeader() {
  const id = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
              <Logo />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium relative group transition-all duration-300"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Search and CTA */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <input
                  id={id}
                  className="w-64 h-10 pl-10 pr-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="Search..."
                  type="search"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button variant="glass" size="sm" className="hidden sm:flex">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="group text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <MenuIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-600 mt-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="glass" size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default GlassmorphismHeader;