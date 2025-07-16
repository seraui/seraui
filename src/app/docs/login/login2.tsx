'use client'
import React, { useState } from 'react';

const ArrowBoxIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 4H20V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 20H4V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

const FacebookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const AppleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.94c1.5 0 2.75-.81 3.5-2.06 1.25-1.25.75-3.44-.94-4.13-1.69-.69-2.81.5-3.56 1.31-.81.88-1.81 2.88-1.81 2.88s-1.06-2.06-2.56-2.06c-1.5 0-2.88 1.31-2.88 3.19 0 1.88 1.38 3.19 2.88 3.19.44 0 1.06-.19 1.5-.5.5.31 1.06.5 1.81.5zM12 2.5c-1.5 0-2.81.69-3.56 1.88-1.25 1.25-.75 3.44.94 4.13 1.69.69 2.81-.5 3.56-1.31.81-.88 1.81-2.88 1.81-2.88s1.06 2.06 2.56 2.06c1.5 0 2.88-1.31 2.88-3.19C20.75 4.5 19.38 3.19 17.88 3.19c-.44 0-1.06.19-1.5.5-.5-.31-1.06-.5-1.81-.5z"></path>
    </svg>
);


// Main Component
const Login2: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="font-sans text-gray-800 dark:text-gray-200 w-full max-w-md bg-white dark:bg-black shadow-2xl dark:shadow-gray-900/50 rounded-3xl p-8 mx-auto border border-gray-200 dark:border-gray-800">

            <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    <ArrowBoxIcon />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">Sign in with email</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Make a new doc to bring your words, data, and teams together. For free
            </p>

            <form className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                        <EmailIcon />
                    </span>
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Password Input */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                        <LockIcon />
                    </span>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        aria-label="Password"
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                    >
                        {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>

                <div className="text-right">
                    <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 shadow-md transition-transform transform hover:scale-105"
                >
                    Get Started
                </button>
            </form>

            <div className="flex items-center my-6">
                <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">Or sign in with</span>
                <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            </div>

            <div className="flex justify-center space-x-4">
                <button aria-label="Sign in with Google" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110">
                   <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                </button>
                <button aria-label="Sign in with Facebook" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110">
                    <FacebookIcon />
                </button>
                 <button aria-label="Sign in with Apple" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110">
                    <AppleIcon />
                </button>
            </div>
        </div>
    );
};

export default Login2;
