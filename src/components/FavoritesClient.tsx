"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getMoviesByIds } from "@/lib/tmdb";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function FavoritesClient() {
  const [movies, setMovies] = useState<Movie[]>([]);

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
    (async () => {
      await loadFavorites();
    })();

    window.addEventListener("favorites-updated", loadFavorites);
    return () =>
      window.removeEventListener("favorites-updated", loadFavorites);
  }, []);

  if (!movies.length) return null;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 mb-8">
        Your Favorites ❤️
      </h2>

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
    </section>
  );
}