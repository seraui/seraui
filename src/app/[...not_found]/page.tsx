'use client'
import React from 'react';
import Link from 'next/link';
import Header from '@/components/site/header';
import NotFoundImage from '@/assets/NotFound/404_z4xiwg.webp';
export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 tablet:px-8">
        <div className="flex w-full max-w-[26.25rem] flex-col items-center gap-6 text-center">
          <img 
            src={NotFoundImage.src}
            alt="404 - Page not found"
            className="w-auto h-auto"
          />
          <h1 className="font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
            Why are you here?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            You&apos;re not supposed to be here.
          </p>
          <Link 
            href="/" 
            className="inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out text-lg justify-center font-bold h-10 px-7 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 border-green-500/30 hover:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 backdrop-blur-sm"
          >
            Go home
          </Link>
        </div>
      </main>
    </>
  );
}
