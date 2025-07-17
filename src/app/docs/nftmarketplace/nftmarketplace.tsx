"use client";
import React from 'react';

// TypeScript interface for the props of each NFT card
interface NftCardProps {
  id: string;
  imageUrl: string;
  title: string;
  highestBid: string;
  price: string;
  timeLeft: string;
}

// Data for the NFT cards, with updated image URLs as requested.
const nftData: NftCardProps[] = [
  {
    id: 'ethereal-dreams-001',
    imageUrl: 'https://i.pinimg.com/1200x/93/b6/9f/93b69fd5d973b3f2fbc325982eb8e658.jpg',
    title: 'Ethereal Dreams',
    highestBid: '1/1',
    price: '0.047 ETH',
    timeLeft: '08:10:00',
  },
  {
    id: 'crystal-harmony-002',
    imageUrl: 'https://i.pinimg.com/1200x/c5/3e/6e/c53e6e265a893d70b00070563d063606.jpg',
    title: 'Crystal Harmony',
    highestBid: '1/1',
    price: '0.023 ETH',
    timeLeft: '10:40:00',
  },
  {
    id: 'celestial-arch-003',
    imageUrl: 'https://i.pinimg.com/736x/c6/1c/ae/c61cae893723278b817cd64ffc966bf8.jpg',
    title: 'Celestial Arch',
    highestBid: '1/1',
    price: '0.034 ETH',
    timeLeft: '03:45:00',
  },
  {
    id: 'quantum-sphere-004',
    imageUrl: 'https://i.pinimg.com/1200x/e1/6c/58/e16c5867c9dcb1334d45cf51caee3563.jpg',
    title: 'Quantum Sphere',
    highestBid: '1/1',
    price: '0.041 ETH',
    timeLeft: '02:30:00',
  },
  {
    id: 'digital-nexus-005',
    imageUrl: 'https://i.pinimg.com/736x/c0/09/b1/c009b1bd4d8bb5439c59221e2eca7516.jpg',
    title: 'Digital Nexus',
    highestBid: '1/1',
    price: '0.075 ETH',
    timeLeft: '',
  },
  {
    id: 'cosmic-voyage-006',
    imageUrl: 'https://i.pinimg.com/736x/fb/27/0f/fb270f928d2af556c9d97f2af5fb908d.jpg',
    title: 'Cosmic Voyage',
    highestBid: '1/1',
    price: '0.15 ETH',
    timeLeft: '22:05:00',
  },
  {
    id: 'future-vision-007',
    imageUrl: 'https://i.pinimg.com/1200x/af/5f/3d/af5f3d7fc5d2cd647fc5559c86b61096.jpg',
    title: 'Future Vision',
    highestBid: '1/1',
    price: '0.088 ETH',
    timeLeft: '15:30:00',
  },
  {
    id: 'neo-genesis-008',
    imageUrl: 'https://i.pinimg.com/736x/a8/13/20/a81320aa1ad808fa2fe9d05d06f06a6c.jpg',
    title: 'Neo Genesis',
    highestBid: '1/1',
    price: '0.20 ETH',
    timeLeft: '01:15:00',
  },
  {
    id: 'neon-warrior-009',
    imageUrl: 'https://i.pinimg.com/1200x/4a/2a/8b/4a2a8b8d5c9a4cccc8de1e015119dfb3.jpg',
    title: 'Neon Warrior',
    highestBid: '1/1',
    price: '0.11 ETH',
    timeLeft: '07:55:00',
  },
  {
    id: 'stellar-guardian-010',
    imageUrl: 'https://i.pinimg.com/1200x/97/67/23/976723dda78a202b1ddbc5fc674c7511.jpg',
    title: 'Stellar Guardian',
    highestBid: '1/1',
    price: '0.35 ETH',
    timeLeft: '18:00:00',
  },
  {
    id: 'dimensional-gate-011',
    imageUrl: 'https://i.pinimg.com/1200x/67/99/6a/67996a2154fd2a8da518e4bfb45c1474.jpg',
    title: 'Dimensional Gate',
    highestBid: '1/1',
    price: '0.42 ETH',
    timeLeft: '11:20:00',
  },
  {
    id: 'auric-flow-012',
    imageUrl: 'https://i.pinimg.com/1200x/2a/59/11/2a591199f4558350175dd0b2e120558a.jpg',
    title: 'Auric Flow',
    highestBid: '1/1',
    price: '0.50 ETH',
    timeLeft: '04:45:00',
  },
];

// SVG Icon Components
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.9501 2.99817C16.2277 2.99817 15.5122 3.14052 14.8447 3.41708C14.1772 3.69364 13.5707 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05008 2.9987C5.59102 2.9987 4.19174 3.5783 3.16008 4.60999C2.12843 5.64166 1.54883 7.04094 1.54883 8.49999C1.54883 9.95905 2.12843 11.3583 3.16008 12.39L12.0001 21.23L20.8401 12.39C21.8717 11.3583 22.4513 9.95905 22.4513 8.49999C22.4513 7.04094 21.8717 5.64166 20.8401 4.60999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.0002 22.6667L11.9468 22.5867L5.3335 14L12.0002 17.3333L18.6668 14L12.0002 22.6667Z" fill="currentColor"/>
        <path d="M12 1.33331L5.33333 12.6666L12 16V1.33331Z" fill="currentColor" fillOpacity="0.6"/>
        <path d="M12 1.33331L18.6667 12.6666L12 16V1.33331Z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M5.3335 14L12.0002 17.3333V22.6666L5.3335 14Z" fill="currentColor" fillOpacity="0.6"/>
        <path d="M18.6668 14L12.0002 17.3333V22.6666L18.6668 14Z" fill="currentColor" fillOpacity="0.8"/>
    </svg>
);



// The NFT Card Component
const NftCard: React.FC<NftCardProps> = ({ imageUrl, title, highestBid, price, timeLeft }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-700 w-full font-space-grotesk">
      <div className="relative p-2 sm:p-2.5">
          {/* Card Image Section */}
          <div className="relative">
            <img src={imageUrl} alt={title} className="w-full h-auto rounded-xl sm:rounded-2xl object-cover aspect-square" />

            {/* Overlays */}
            {timeLeft && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 dark:bg-black/70 text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm border border-white/20">
                    <ClockIcon className="w-3 h-3 sm:w-5 sm:h-5 text-cyan-300" />
                    <span className="hidden sm:inline">{timeLeft}</span>
                    <span className="sm:hidden">{timeLeft.split(':')[0]}h</span>
                </div>
            )}

            <button className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 dark:bg-black/70 text-white p-1.5 sm:p-2.5 rounded-full transition-colors hover:text-red-500 backdrop-blur-sm border border-white/20">
              <HeartIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

          </div>

          {/* Card Content Section */}
          <div className="mt-3 sm:mt-4 px-1 sm:px-1.5 pb-2 sm:pb-3 pt-1 sm:pt-2">
            <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate pr-2" title={title}>{title}</h3>
                <EthIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Highest Bid {highestBid}</p>

            <div className="mt-3 sm:mt-4 flex justify-between items-center">
              <p className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">Price</p>
              <p className="text-sm sm:text-lg font-bold text-cyan-600 dark:text-cyan-400">{price}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

// Main App Component to display the grid of NFT cards
const NftMarketplace: React.FC = () => {
  return (
    <div className="relative p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Google Font Import */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');`}
      </style>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 font-space-grotesk">
            NFT Marketplace
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            Discover, collect, and trade unique digital assets
          </p>
        </div>

        {/* Fully responsive grid with 4 columns max on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {nftData.map((nft) => (
            <NftCard key={nft.id} {...nft} />
          ))}
        </div>
      </div>
      {/* Add keyframes for animation and font-family */}
      <style>{`
        @keyframes aurora {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-aurora {
          animation: aurora 20s linear infinite;
        }
        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default NftMarketplace;
