"use client";

import { useEffect, useState } from "react";
import { getMoviesByIds } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default function FavoritesPage() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const ids = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      if (ids.length === 0) return;

      const data = await getMoviesByIds(ids);
      setMovies(data);
    };

    loadFavorites();
  }, []);

  if (movies.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No favorite movies yet 💔
      </p>
    );
  }

  return (
    <main className="p-10  ">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Favorites ❤️
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </main>
  );
}
