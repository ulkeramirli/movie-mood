import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between text-white">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:opacity-80"
        >
          🎬 MoodMovies
        </Link>

        <nav className="flex gap-8 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/search" className="hover:text-white">
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}

