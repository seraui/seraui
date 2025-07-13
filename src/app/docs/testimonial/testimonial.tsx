"use client"
import React from 'react';

function Testimonial() {
  return (
    <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-6">
        Innovate with Ease, Trusted by Global Developers
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-8">
        Our platform empowers creators to build groundbreaking applications, offering robust APIs and comprehensive tools that streamline development and foster innovation.
      </p>

      {/* Testimonial Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-6xl">
        {/* Large Left Card */}
        <div className="bg-white/80 dark:bg-black/50 p-8 rounded-xl flex flex-col justify-between border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-md">
          <div className="mb-8">
            {/* Nike Logo Placeholder */}
            <div className="flex items-center mb-6">
              <svg className="w-10 h-10 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 10.99C22 5.47 17.52 1 12 1S2 5.47 2 10.99C2 16.51 6.48 21 12 21S22 16.51 22 10.99ZM12 19C7.58 19 4 15.42 4 11C4 6.58 7.58 3 12 3S20 6.58 20 11C20 15.42 16.42 19 12 19ZM12 5C9.24 5 7 7.24 7 10C7 12.76 9.24 15 12 15C14.76 15 17 12.76 17 10C17 7.24 14.76 5 12 5ZM12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13Z"/>
              </svg>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8">
              Working with this platform has dramatically improved our development cycle. The intuitive design tools and robust API integrations have allowed us to innovate faster and deliver high-quality solutions to our clients with unprecedented efficiency. It&apos;s truly a game-changer for modern software development.
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
              alt="Shekinah Tshikulila"
              className="w-12 h-12 rounded-full object-cover mr-4"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="https://placehold.co/48x48/6B7280/FFFFFF?text=ST" }}
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Shekinah Tshikulila</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
            </div>
          </div>
        </div>

        {/* Right Column for Testimonials */}
        <div className="flex flex-col gap-4">
          {/* Large Right Card */}
          <div className="bg-white/80 dark:bg-black/50 p-8 rounded-xl flex flex-col justify-between border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-md">
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8">
              This framework is incredibly powerful and user-friendly. It eliminated so many headaches in our workflow, allowing us to focus on creativity rather than tedious setup. A truly invaluable asset for any developer.
            </p>
            <div className="flex items-center">
              <img
                src="https://i.pinimg.com/736x/89/4e/16/894e16749bb2800527958cf7813b998e.jpg"
                alt="Jonathan Yombo"
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="https://placehold.co/48x48/6B7280/FFFFFF?text=JY" }}
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Jonathan Yombo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Small Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Small Card 1 */}
            <div className="bg-white/80 dark:bg-black/50 p-6 rounded-xl flex flex-col justify-between border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-md">
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                The templates provided here are top-notch. They&apos;ve saved me countless hours and the designs are simply stunning. Highly recommend for anyone building a personal website!
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pinimg.com/736x/5a/ac/66/5aac6619a8b81993b10be58fbded3951.jpg"
                  alt="Yucel Farukşahan"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="https://placehold.co/40x40/6B7280/FFFFFF?text=YF" }}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Yucel Farukşahan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Creator, Tailkits</p>
                </div>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="bg-white/80 dark:bg-black/50 p-6 rounded-xl flex flex-col justify-between border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-md">
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                Exceptional quality and incredible attention to detail. This platform has truly elevated my web projects. The best personal website resource I&apos;ve come across!
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.pinimg.com/736x/d9/7f/aa/d97faa4ca82603ea39b68b534f63b89a.jpg"
                  alt="Rodrigo Aguilar"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="https://placehold.co/40x40/6B7280/FFFFFF?text=RA" }}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Rodrigo Aguilar</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Creator, <br/> TailwindAwesome</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
