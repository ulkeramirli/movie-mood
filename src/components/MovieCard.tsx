"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  title: string;
  poster: string | null;
};

export default function MovieCard({ id, title, poster }: Props) {
  const [isFav, setIsFav] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setTimeout(() => {
      setIsFav(favs.includes(id));
    }, 0);
  }, [id]);

 
  useEffect(() => {
    if (!hovered || trailerKey) return;

    fetch(`/api/trailer?id=${id}`)
      .then(async (res) => {
        if (!res.ok) return null; 
        const text = await res.text();
        if (!text) return null;  
        return JSON.parse(text);
      })
      .then((data) => setTrailerKey(data?.key || null))
      .catch((err) => {
        console.error("Failed to fetch trailer:", err);
        setTrailerKey(null);
      });
  }, [hovered, id, trailerKey]);

  
  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favs.includes(id)) {
      favs = favs.filter((f: number) => f !== id);
      setIsFav(false);
    } else {
      favs.push(id);
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-30
          bg-black/60 backdrop-blur rounded-full px-2 py-1 text-xl
          opacity-0 group-hover:opacity-100 transition"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <Link href={`/movie/${id}`}>
        <div className="cursor-pointer">
          <div className="relative overflow-hidden rounded-2xl aspect-2/3 shadow-xl">
           
            {hovered && trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
              />
            ) : poster ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${poster}`}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="bg-gray-800 h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}

           
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </div>

          <p className="mt-3 text-md text-white font-bold font-sans text-left">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
}