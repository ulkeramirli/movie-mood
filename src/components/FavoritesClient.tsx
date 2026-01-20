"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getMoviesByIds } from "@/lib/tmdb";

export default function FavoritesClient() {
  const [movies, setMovies] = useState<any[]>([]);

  const loadFavorites = async () => {
    const ids = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!ids.length) {
      setMovies([]);
      return;
    }

    const data = await getMoviesByIds(ids);
    setMovies(data);
  };

  useEffect(() => {
    loadFavorites();

    // 👂 слушаем изменения
    window.addEventListener("favorites-updated", loadFavorites);
    return () =>
      window.removeEventListener("favorites-updated", loadFavorites);
  }, []);

  if (!movies.length) return null;

  return (
    <section className="w-full max-w-7xl mb-12">
      <h2 className="text-2xl font-bold text-neutral-200 mb-6 text-left">
        Your Favorites ❤️
      </h2>

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
    </section>
  );
}
