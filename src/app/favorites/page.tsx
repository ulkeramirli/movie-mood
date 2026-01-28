"use client";

import { useEffect, useState } from "react";
import { getMoviesByIds } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const ids = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (!ids.length) return;

      const data = await getMoviesByIds(ids);
      setMovies(data);
    };

    loadFavorites();
  }, []);

  if (!movies.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <p className="text-gray-400 text-lg text-center">
          No favorite movies yet 💔
        </p>
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Your Favorites ❤️
        </h1>

        <div
          className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </main>
  );
}