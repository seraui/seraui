"use client"
import React, { useState, useRef, useEffect } from 'react';

// --- Icons ---
// Using SVG components for icons, similar to lucide-react
const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const MountainIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);


const AvatarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="200" height="200" className={className}>
        <g clipPath="url(#cs_clip_1_flower-1)">
            <mask id="cs_mask_1_flower-1" style={{ maskType: 'alpha' }} width="200" height="186" x="0" y="7" maskUnits="userSpaceOnUse">
                <path fill="#fff" d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"></path>
            </mask>
            <g mask="url(#cs_mask_1_flower-1)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path fill="url(#paint0_linear_748_4711)" d="M200 0H0v200h200V0z"></path>
                <g filter="url(#filter0_f_748_4711)">
                    <path fill="#FF58E4" d="M130 0H69v113h61V0z"></path>
                    <path fill="#0CE548" fillOpacity="0.35" d="M196 91H82v102h114V91z"></path>
                    <path fill="#FFE500" fillOpacity="0.74" d="M113 80H28v120h85V80z"></path>
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_f_748_4711" width="278" height="310" x="-27" y="-55" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                <feGaussianBlur result="effect1_foregroundBlur_748_4711" stdDeviation="27.5"></feGaussianBlur>
            </filter>
            <linearGradient id="paint0_linear_748_4711" x1="186.5" x2="37" y1="37" y2="186.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0E6FFF" stopOpacity="0.51"></stop>
                <stop offset="1" stopColor="#00F0FF" stopOpacity="0.59"></stop>
            </linearGradient>
            <clipPath id="cs_clip_1_flower-1">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
        </defs>
        <g style={{ mixBlendMode: 'overlay' }} mask="url(#cs_mask_1_flower-1)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_flower-1)"></path>
        </g>
        <defs>
            <filter id="cs_noise_1_flower-1" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
                <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
                <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
        </defs>
    </svg>
);


// --- Main Header Component ---
const Header2 = () => {
  // State for the main mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for desktop dropdowns
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  // State to manage which dropdown is open (for mobile)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  // Refs to detect outside clicks
  const featuresDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  // --- Data for Navigation ---
  const navLinks = [
    { 
      label: "Features", 
      dropdown: [
        { href: "#", label: "Analytics" },
        { href: "#", label: "Reports" },
        { href: "#", label: "Integrations" },
      ] 
    },
    { href: "#", label: "Pricing" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  const avatarDropdownLinks = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Settings" },
    { href: "#", label: "Logout" },
  ];
  
  // Effect to handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (featuresDropdownRef.current && !featuresDropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target as Node)) {
        setIsAvatarOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to toggle mobile dropdowns
  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
               <MountainIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Acme Inc</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.label} className="relative" ref={featuresDropdownRef}>
                    <button onClick={() => setIsFeaturesOpen(!isFeaturesOpen)} className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 focus:outline-none">
                      {link.label}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isFeaturesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      {link.dropdown.map((item) => (
                        <a key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a key={link.label} href={link.href} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                    {link.label}
                  </a>
                )
              ))}
            </nav>
          </div>

          {/* Right side: Icons and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
             {/* Notification Dropdown */}
             <div className="relative hidden sm:block" ref={notificationsDropdownRef}>
                <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" />
                </button>
                <div className={`absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isNotificationsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="p-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <p className="font-medium">New message</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">You have a new message from Jane Doe.</p>
                        </a>
                        <a href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <p className="font-medium">Server update</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Server #1 will be updated at 3:00 AM.</p>
                        </a>
                    </div>
                </div>
             </div>

             {/* Avatar Dropdown */}
             <div className="relative hidden sm:block" ref={avatarDropdownRef}>
                <button onClick={() => setIsAvatarOpen(!isAvatarOpen)} className="flex items-center gap-2 focus:outline-none">
                    <AvatarIcon className="h-9 w-9" />
                </button>
                <div className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isAvatarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {avatarDropdownLinks.map((item) => (
                        <a key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            {item.label}
                        </a>
                    ))}
                </div>
             </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800" id="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.label}>
                  <button onClick={() => toggleMobileDropdown(link.label)} className="w-full flex justify-between items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-base font-medium">
                    {link.label}
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${openMobileDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openMobileDropdown === link.label && (
                    <div className="pl-4 pt-2 space-y-1">
                      {link.dropdown.map((item) => (
                         <a key={item.label} href={item.href} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 block px-3 py-2 rounded-md text-sm font-medium">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a key={link.label} href={link.href} className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                  {link.label}
                </a>
              )
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex items-center justify-between px-3">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <AvatarIcon className="h-10 w-10" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">Tom Cook</div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">tom@example.com</div>
                        </div>
                    </div>
                    <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="mt-3 space-y-1">
                    {avatarDropdownLinks.map(item => (
                         <a key={item.label} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header2;