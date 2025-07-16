"use client";

import Button from "@/app/docs/button/button";
//import Button from "@/components/ui/button"; // if you are using shadcn/ui or seraui



const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function Card() {
  return (
    <div className="p-4 font-sans">
      <div className="w-full max-w-sm bg-white dark:bg-[#202020] text-black dark:text-white rounded-xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Login to your account</h2>
          <a href="#" className="text-sm text-gray-300 dark:text-gray-400 hover:underline">Sign Up</a>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-300 mb-6">
          Enter your email below to login to your account
        </p>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 dark:text-gray-200 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-[#232323] border border-gray-200 dark:border-zinc-600 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 dark:text-gray-200">Password</label>
              <a href="#" className="text-xs text-gray-400 dark:text-gray-300 hover:underline">Forgot your password?</a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-[#232323] border border-gray-200 dark:border-zinc-600 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Login Button */}
          <Button
            variant="default"
            type="submit"
            onClick={e => e.preventDefault()}
            className="w-full bg-black text-white dark:bg-white dark:text-black font-medium py-2 rounded-md hover:bg-gray-900 dark:hover:bg-gray-200 transition"
          >
            Login

          </Button>

          {/* Google Button */}
          <Button
            variant="outline"
            onClick={e => e.preventDefault()}
            iconLeft={<GoogleIcon />}
            className="w-full border border-gray-200 dark:border-zinc-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#232323] py-2 rounded-md transition"
          >
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
