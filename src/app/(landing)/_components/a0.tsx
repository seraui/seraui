import React from 'react';

// Main App component that holds the feature cards
export default function A0() {
  // Data for the feature cards, including SVG icons, titles, and descriptions.
  // The SVG icons are provided as JSX elements.
  const cardData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="40" height="40" className="coolshapes flower-1 ">
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
      ),
      title: 'Powerful CLI',
      description:
        'Sera UI provides a powerful CLI to install UI components directly into your project.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="40" height="40" className="coolshapes flower-7 ">
          <g clipPath="url(#cs_clip_1_flower-7)">
            <mask id="cs_mask_1_flower-7" style={{ maskType: 'alpha' }} width="200" height="200" x="0" y="0" maskUnits="userSpaceOnUse">
              <path fill="#fff" d="M100 0C86.193 0 75 11.193 75 25v14.29l-9.967-9.968c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.763-9.763 25.593 0 35.356L40 75H25C11.193 75 0 86.193 0 100s11.193 25 25 25h14l-9.744 9.744c-9.763 9.763-9.763 25.592 0 35.355 9.763 9.763 25.593 9.763 35.356 0L75 159.711V175c0 13.807 11.193 25 25 25s25-11.193 25-25v-15l10.744 10.744c9.763 9.763 25.592 9.763 35.355 0 9.763-9.763 9.763-25.593 0-35.356L160.711 125H175c13.807 0 25-11.193 25-25s-11.193-25-25-25h-15.289l10.967-10.967c9.763-9.763 9.763-25.592 0-35.355-9.763-9.763-25.593-9.763-35.356 0L125 39V25c0-13.807-11.193-25-25-25z"></path>
            </mask>
            <g mask="url(#cs_mask_1_flower-7)">
              <path fill="#fff" d="M200 0H0v200h200V0z"></path>
              <path fill="url(#paint0_linear_748_4652)" fillOpacity="0.55" d="M200 0H0v200h200V0z"></path>
              <g filter="url(#filter0_f_748_4652)">
                <path fill="#18A0FB" d="M131 3H-12v108h143V3z"></path>
                <path fill="#FF58E4" d="M190 109H0v116h190V109z"></path>
                <ellipse cx="153.682" cy="64.587" fill="#FFD749" rx="83" ry="57" transform="rotate(-33.875 153.682 64.587)"></ellipse>
              </g>
            </g>
          </g>
          <defs>
            <filter id="filter0_f_748_4652" width="361.583" height="346.593" x="-72" y="-61.593" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur result="effect1_foregroundBlur_748_4652" stdDeviation="30"></feGaussianBlur>
            </filter>
            <linearGradient id="paint0_linear_748_4652" x1="200" x2="0" y1="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF1F00"></stop>
              <stop offset="1" stopColor="#FFD600"></stop>
            </linearGradient>
            <clipPath id="cs_clip_1_flower-7">
              <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
          </defs>
          <g style={{ mixBlendMode: 'overlay' }} mask="url(#cs_mask_1_flower-7)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_flower-7)"></path>
          </g>
          <defs>
            <filter id="cs_noise_1_flower-7" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
              <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
              <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
              <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
          </defs>
        </svg>
      ),
      title: 'Vast Component Library',
      description:
        'Access a wide range of common UI components that developers need for their everyday tasks.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="40" height="40" className="coolshapes flower-3 ">
          <g clipPath="url(#cs_clip_1_flower-3)">
            <mask id="cs_mask_1_flower-3" style={{ maskType: 'alpha' }} width="200" height="200" x="0" y="0" maskUnits="userSpaceOnUse">
              <path fill="#fff" d="M200 50c0-27.614-22.386-50-50-50s-50 22.386-50 50c0-27.614-22.386-50-50-50S0 22.386 0 50s22.386 50 50 50c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50c0 27.614 22.386 50 50 50s50-22.386 50-50c0-27.608-22.375-49.989-49.98-50C177.625 99.99 200 77.608 200 50z"></path>
            </mask>
            <g mask="url(#cs_mask_1_flower-3)">
              <path fill="#fff" d="M200 0H0v200h200V0z"></path>
              <path fill="url(#paint0_linear_748_4691)" fillOpacity="0.55" d="M200 0H0v200h200V0z"></path>
              <g filter="url(#filter0_f_748_4691)">
                <path fill="#18A0FB" d="M131 3H-12v108h143V3z"></path>
                <path fill="#FF58E4" d="M190 109H0v116h190V109z"></path>
                <ellipse cx="153.682" cy="64.587" fill="#FFD749" rx="83" ry="57" transform="rotate(-33.875 153.682 64.587)"></ellipse>
              </g>
            </g>
          </g>
          <defs>
            <filter id="filter0_f_748_4691" width="361.583" height="346.593" x="-72" y="-61.593" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur result="effect1_foregroundBlur_748_4691" stdDeviation="30"></feGaussianBlur>
            </filter>
            <linearGradient id="paint0_linear_748_4691" x1="200" x2="0" y1="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF1F00"></stop>
              <stop offset="1" stopColor="#FFD600"></stop>
            </linearGradient>
            <clipPath id="cs_clip_1_flower-3">
              <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
          </defs>
          <g style={{ mixBlendMode: 'overlay' }} mask="url(#cs_mask_1_flower-3)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_flower-3)"></path>
          </g>
          <defs>
            <filter id="cs_noise_1_flower-3" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
              <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
              <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
              <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
          </defs>
        </svg>
      ),
      title: 'Modern & Customizable',
      description:
        'Modern design with built-in light and dark modes. Fully customizable to match your brand.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="40" height="40" className="coolshapes star-1 ">
          <g clipPath="url(#cs_clip_1_star-1)">
            <mask id="cs_mask_1_star-1" style={{ maskType: 'alpha' }} width="200" height="200" x="0" y="0" maskUnits="userSpaceOnUse">
              <path fill="#fff" fillRule="evenodd" d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462L30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z" clipRule="evenodd"></path>
            </mask>
            <g mask="url(#cs_mask_1_star-1)">
              <path fill="#fff" d="M200 0H0v200h200V0z"></path>
              <path fill="#FFF9C5" fillOpacity="0.44" d="M200 0H0v200h200V0z"></path>
              <g filter="url(#filter0_f_748_4325)">
                <path fill="#00F0FF" fillOpacity="0.85" d="M158 22H15v108h143V22z"></path>
                <path fill="#FF58E4" d="M209 101H52v116h157V101z"></path>
                <ellipse cx="156" cy="80" fill="#FFE500" fillOpacity="0.79" rx="83" ry="57"></ellipse>
              </g>
            </g>
          </g>
          <defs>
            <filter id="filter0_f_748_4325" width="344" height="315" x="-45" y="-38" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur result="effect1_foregroundBlur_748_4325" stdDeviation="30"></feGaussianBlur>
            </filter>
            <clipPath id="cs_clip_1_star-1">
              <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
          </defs>
          <g style={{ mixBlendMode: 'overlay' }} mask="url(#cs_mask_1_star-1)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_star-1)"></path>
          </g>
          <defs>
            <filter id="cs_noise_1_star-1" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
              <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
              <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
              <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
          </defs>
        </svg>
      ),
      title: 'Copy & Paste',
      description:
        'Built with TSX by default, which can be compiled to JSX if needed. Just copy and paste into your project.',
    },
  ];

  return (
    // Main container with responsive background and padding
    <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Grid container for the cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
        {/* Mapping over the card data to render each card */}
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-start text-left backdrop-blur-sm transition-colors duration-200"
          >
            {/* Icon and Title container */}
            <div className="flex items-center gap-4 mb-4">
              {card.icon}
              <h3 className="text-gray-900 dark:text-white text-lg font-semibold">{card.title}</h3>
            </div>
            {/* Description text */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
