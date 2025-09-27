import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <>
      {/* Desktop vertical sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:py-8 lg:px-6 lg:border-r lg:bg-white">
        <div className="mb-8">
          <Link href="/" className="text-xl font-semibold">Scott-Gobin Photography</Link>
          <p className="text-sm text-gray-500 mt-1">Liverpool</p>
        </div>
        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/commercial">Commercial</Link>
          <Link href="/fashion">Fashion</Link>
          <Link href="/portraits">Portraits</Link>
          <Link href="/weddings">Weddings</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </aside>

      {/* Mobile top nav */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-20">
        <Link href="/" className="font-semibold">Scott-Gobin Photography</Link>
        <div>
          <button id="mobile-menu-button" aria-label="Open menu">Menu</button>
        </div>
      </header>
    </>
  );
}
