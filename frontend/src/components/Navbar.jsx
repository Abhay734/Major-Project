'use client';
import UseAppContext from '@/context/AppContext';
import React from 'react';

const Navbar = () => {

  const { loggedIn, logout } = UseAppContext();

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 w-full z-50 shadow-md">
      <nav className="max-w-[85rem] mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo */}
        <a href="/" className="flex items-center gap-2 font-extrabold text-2xl text-purple-600 dark:text-purple-400 group">
          {/* MailSmith Logo SVG */}
          <svg className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MailSmith
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-700 dark:text-neutral-300 hover:text-purple-600 font-medium transition-colors duration-300">Home</a>
          <a href="/user/generate-email" className="text-gray-700 dark:text-neutral-300 hover:text-purple-600 font-medium transition-colors duration-300">Generate Email</a>
          <a href="/user/profile" className="text-gray-700 dark:text-neutral-300 hover:text-purple-600 font-medium transition-colors duration-300">Profile</a>
        </div>

        {
          loggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <button onClick={logout} className="py-2.5 px-5 rounded-full border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 font-medium transition-all duration-300">Logout</button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <a href="/login" className="py-2.5 px-5 rounded-full border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 font-medium transition-all duration-300">Login</a>
              <a href="/signup" className="py-2.5 px-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 font-medium transition-all duration-300 shadow-lg">Signup</a>
            </div>
          )
        }

        {/* Auth Buttons */}

        {/* Mobile Menu Button */}
        <button type="button" className="md:hidden flex items-center p-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu (hidden by default, show on toggle) */}
      <div className="md:hidden px-4 pb-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
        <div className="flex flex-col gap-3 mt-2">
          <a href="/" className="block py-2 text-gray-700 dark:text-neutral-300 hover:text-purple-600 font-medium transition-colors duration-300">Home</a>
          <a href="/user/generate-email" className="block py-2 text-gray-700 dark:text-neutral-300 hover:text-purple-600 font-medium transition-colors duration-300">Generate Email</a>
          <a href="/user/profile" className="block py-2 text-gray-700 dark:text-neutral-300 hover:text-purple-600 font-medium transition-colors duration-300">Profile</a>
          <a href="/login" className="block w-full text-center py-2.5 px-5 rounded-full border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 font-medium transition-all duration-300 mt-2">Login</a>
          <a href="/signup" className="block w-full text-center py-2.5 px-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 font-medium transition-all duration-300 shadow-lg">Signup</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;