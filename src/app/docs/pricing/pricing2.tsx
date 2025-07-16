'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper component for animating numbers with a "smokey" effect
interface AnimatedPriceProps {
  price: string;
}

const AnimatedPrice: React.FC<AnimatedPriceProps> = ({ price }) => {
  return (
    <motion.span
      className="inline-block" // Ensure it takes up space for animation
      key={price} // Add key to force re-render and animation on price change
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {price}
    </motion.span>
  );
};

const Pricing2 = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const monthlyButtonRef = useRef<HTMLButtonElement>(null);
  const yearlyButtonRef = useRef<HTMLButtonElement>(null);
  const [activeButtonLeft, setActiveButtonLeft] = useState(0);
  const [activeButtonWidth, setActiveButtonWidth] = useState(0);

  // Effect to measure button widths and positions
  useEffect(() => {
    const updateButtonMetrics = () => {
      // Ensure refs are available before trying to access offset properties
      if (monthlyButtonRef.current && yearlyButtonRef.current) {
        if (isMonthly) {
          setActiveButtonLeft(monthlyButtonRef.current.offsetLeft);
          setActiveButtonWidth(monthlyButtonRef.current.offsetWidth);
        } else {
          setActiveButtonLeft(yearlyButtonRef.current.offsetLeft);
          setActiveButtonWidth(yearlyButtonRef.current.offsetWidth);
        }
      }
    };

    // Initial calculation on component mount
    updateButtonMetrics();

    // Recalculate on window resize to ensure responsiveness
    window.addEventListener('resize', updateButtonMetrics);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateButtonMetrics);
    };
  }, [isMonthly]); // Recalculate when isMonthly state changes

  const pricingTiers = [
    {
      name: 'Basic',
      monthlyPrice: '$19',
      yearlyPrice: '$199',
      features: [
        '5 Projects',
        '10 GB Storage',
        'Basic Analytics',
        'Community Support',
        'Custom Domains'
      ],
      buttonText: 'Get Started',
      isPopular: false,
    },
    {
      name: 'Pro',
      monthlyPrice: '$49',
      yearlyPrice: '$499',
      features: [
        'Unlimited Projects',
        '50 GB Storage',
        'Advanced Analytics',
        'Priority Email Support',
        'Custom Domains',
        'Team Collaboration'
      ],
      buttonText: 'Start Free Trial',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: '$99',
      yearlyPrice: '$999',
      features: [
        'All Pro Features',
        'Unlimited Storage',
        'Real-time Analytics',
        '24/7 Phone Support',
        'Dedicated Account Manager',
        'SAML/SSO Integration'
      ],
      buttonText: 'Contact Sales',
      isPopular: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black overflow-hidden">
      {/* Rose Twilight Background with Top Glow - Light/Dark mode support */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202, 44, 72, 0.15), transparent 70%), rgb(248 250 252)",
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:block hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202, 44, 72, 0.25), transparent 70%), #000000",
        }}
      />
      {/* Additional subtle glow elements - Light/Dark mode support */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#CA2C48] rounded-full mix-blend-multiply filter blur-xl opacity-5 dark:opacity-10 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#CA2C48] rounded-full mix-blend-multiply filter blur-xl opacity-5 dark:opacity-10 animate-blob animation-delay-4000 pointer-events-none"></div>


      {/* Your Content/Components - This is the existing pricing page content */}
      <div className="relative z-10 font-inter py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that&apos;s right for you. No hidden fees, no surprises.
            </p>
          </div>

          {/* Billing Toggle - Light/Dark mode support with black glow */}
          <div className="mt-10 flex justify-center">
            <div
              className="relative flex items-center p-1 rounded-full border border-gray-300 dark:border-gray-700 dark:shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.8)', // Light mode background
                backdropFilter: 'blur(10px)', // Glassy blur effect
                WebkitBackdropFilter: 'blur(10px)', // For Safari compatibility
                boxShadow: 'none', // No shadow in light mode
              }}
            >
              <div
                className="absolute inset-0 rounded-full dark:block hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)', // Darker black background for more contrast
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 0, 0, 0.6), 0 0 90px rgba(0, 0, 0, 0.4)', // Black glow effect
                }}
              />
              <button
                ref={monthlyButtonRef}
                onClick={() => setIsMonthly(true)}
                className={`relative z-10 py-2 px-6 rounded-full text-sm font-medium text-center transition-all duration-300 ${
                  isMonthly
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                ref={yearlyButtonRef}
                onClick={() => setIsMonthly(false)}
                className={`relative z-10 py-2 px-6 rounded-full text-sm font-medium text-center transition-all duration-300 flex items-center justify-center ${
                  !isMonthly
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Yearly
                <span className="ml-2 px-2 py-0.5 bg-[#CA2C48] text-white text-xs font-bold rounded-full">
                  20% off
                </span>
              </button>
              {/* Motion div for the active background - Updated for glassy feel */}
              {activeButtonWidth > 0 && (
                <motion.div
                  className="absolute inset-y-1 rounded-full shadow-md"
                  style={{
                    background: 'rgba(202, 44, 72, 0.8)', // Semi-transparent red
                    backdropFilter: 'blur(8px)', // Glassy blur effect
                    WebkitBackdropFilter: 'blur(8px)', // For Safari compatibility
                  }}
                  initial={false}
                  animate={{
                    left: activeButtonLeft,
                    width: activeButtonWidth,
                  }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </div>

          {/* Pricing Cards - Updated for glassy feel */}
          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.name}
                className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 ${
                  tier.isPopular
                    ? 'border-[#CA2C48] bg-white/90 dark:bg-black/60'
                    : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60'
                }`}
                style={{
                  backdropFilter: 'blur(10px)', // Glassy blur effect
                  WebkitBackdropFilter: 'blur(10px)', // For Safari compatibility
                  boxShadow: tier.isPopular
                    ? '0 10px 20px rgba(202, 44, 72, 0.15), 0 4px 8px rgba(0,0,0,0.1)'
                    : '0 5px 15px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)', // Lighter shadows for light mode
                }}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: tier.isPopular
                    ? '0 25px 50px -12px rgba(202, 44, 72, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#CA2C48] text-white text-xs font-semibold uppercase rounded-full shadow-md">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    <AnimatedPrice price={isMonthly ? tier.monthlyPrice : tier.yearlyPrice} />
                  </span>
                  <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                    /{isMonthly ? 'month' : 'year'}
                  </span>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  {tier.name === 'Basic' && 'For individuals and small teams getting started.'}
                  {tier.name === 'Pro' && 'Perfect for growing businesses and advanced users.'}
                  {tier.name === 'Enterprise' && 'Tailored for large organizations with specific needs.'}
                </p>

                <ul role="list" className="mt-8 space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-[#CA2C48] mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <p className="ml-3 text-base text-gray-700 dark:text-gray-200">{feature}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <motion.button
                    className={`w-full py-2 px-4 rounded-md text-base font-medium shadow-sm transition-all duration-300 inline-flex items-center justify-center border ${
                      tier.isPopular
                        ? 'bg-[#CA2C48] text-white border-[#CA2C48] hover:bg-[#B02441]'
                        : 'bg-white/80 dark:bg-gray-800/80 text-[#CA2C48] border-[#CA2C48]/30 dark:border-[#CA2C48]/50 hover:bg-[#CA2C48]/10 dark:hover:bg-[#CA2C48]/20'
                    }`}
                    style={{
                      backdropFilter: 'blur(5px)', // Glassy blur for buttons
                      WebkitBackdropFilter: 'blur(5px)', // For Safari compatibility
                    }}
                    whileHover={{
                      scale: 1.005,
                      boxShadow: tier.isPopular
                        ? '0 4px 8px rgba(202, 44, 72, 0.3)'
                        : '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    whileTap={{ scale: 0.995 }}
                  >
                    {tier.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing2;
