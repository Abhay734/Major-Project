
import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 w-full z-50">
      <nav className="max-w-[85rem] mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <span>EmailGenAI</span>
        </a>
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-gray-800 dark:text-neutral-200 hover:text-blue-600 font-medium transition">Home</a>
          <a href="/user/generate-email" className="text-gray-800 dark:text-neutral-200 hover:text-blue-600 font-medium transition">Generate Email</a>
          <a href="/user/profile" className="text-gray-800 dark:text-neutral-200 hover:text-blue-600 font-medium transition">Profile</a>
        </div>
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a href="/login" className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 font-medium transition dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700">Login</a>
          <a href="/signup" className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition dark:bg-blue-500 dark:hover:bg-blue-600">Signup</a>
        </div>
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
      <div className="md:hidden px-4 pb-3">
        <div className="flex flex-col gap-2">
          <a href="/" className="text-gray-800 dark:text-neutral-200 hover:text-blue-600 font-medium transition">Home</a>
          <a href="/user/generate-email" className="text-gray-800 dark:text-neutral-200 hover:text-blue-600 font-medium transition">Generate Email</a>
          <a href="/user/profile" className="text-gray-800 dark:text-neutral-200 hover:text-blue-600 font-medium transition">Profile</a>
          <a href="/login" className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 font-medium transition dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700">Login</a>
          <a href="/signup" className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition dark:bg-blue-500 dark:hover:bg-blue-600">Signup</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;