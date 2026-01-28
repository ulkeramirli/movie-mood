"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between text-white">
       
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:opacity-80"
        >
          🎬 MoodMovies
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/search" className="hover:text-white">
            Search
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/90 border-t border-white/10">
          <nav className="flex flex-col items-center gap-6 py-6 text-gray-300">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="hover:text-white"
            >
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}