import React from 'react';

// --- SVG Icon Components ---
// Using functional components for SVG icons for better reusability and clarity.
// The AppleIcon has been updated as per your request.

const UserIcon = () => (
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
    className="h-8 w-8 text-zinc-400 dark:text-zinc-400"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const AppleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6"
  >
    {/* Apple Icon SVG - uses currentColor to adapt to theme */}
    <path 
      fill="currentColor" 
      d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
    />
  </svg>
);

const GoogleIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        className="h-5 w-5"
    >
        {/* Colorful Google Icon using official brand colors */}
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        <path d="M1 1h22v22H1z" fill="none"></path>
    </svg>
);

const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-zinc-900 dark:text-white"
    >
        {/* X Corp icon - uses currentColor to adapt to theme */}
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// --- Main App Component ---
export default function Login() {
  return (
    // Main container with a custom background pattern and flexbox for centering. This setup is inherently responsive.
    <div className="relative w-full flex items-center justify-center font-sans overflow-hidden p-4 bg-zinc-50 dark:bg-zinc-950">

      {/* Login Card. max-w-md ensures it doesn't get too wide on large screens, while w-full ensures it shrinks on small screens. */}
      <div className="relative w-full max-w-md p-8 sm:p-10 space-y-6 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-200/50 dark:border-white/10 shadow-xl dark:shadow-2xl shadow-black/5 dark:shadow-black">
        
        {/* Header section with icon and title */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-full border border-zinc-200/50 dark:border-white/10">
            <UserIcon />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Welcome back</h1>
        </div>

        {/* Social login buttons. The grid is responsive by default and will stack on very small screens if needed, but grid-cols-3 is robust. */}
        <div className="grid grid-cols-3 gap-3">
          {/* Icons are mapped to create buttons. Apple icon is correctly positioned first. */}
          {[{ icon: <AppleIcon /> }, { icon: <GoogleIcon /> }, { icon: <XIcon /> }].map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-center p-3 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-white/50"
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-grow bg-zinc-300 dark:bg-zinc-700"></div>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">OR</span>
          <div className="h-px flex-grow bg-zinc-300 dark:bg-zinc-700"></div>
        </div>
        
        {/* Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-500 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-500 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-white/10 text-white dark:text-white font-semibold shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 focus:ring-zinc-500/50 dark:focus:ring-white/50"
          >
            Sign In
          </button>
        </form>

        {/* Footer links */}
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
          <p>
            Don&apos;t have an account yet?{' '}
            <a href="#" className="font-medium text-zinc-900 dark:text-white hover:underline">
              Sign Up
            </a>
          </p>
          <a href="#" className="font-medium text-zinc-900 dark:text-white hover:underline">
            Forgot your password
          </a>
        </div>

      </div>
    </div>
  );
}
