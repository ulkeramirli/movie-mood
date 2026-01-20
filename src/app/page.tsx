"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MoodCard from "@/components/MoodCard";
import FavoritesClient from "@/components/FavoritesClient";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export default function Home() {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Загружаем популярные фильмы
  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch("/api/hero"); // твой API должен возвращать popular movies
        const data: Movie[] = await res.json();
        setHeroMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  // Автопереключение каждые 5 секунд
  useEffect(() => {
    if (heroMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  };

 const moodList = [
  { title: "Comedy", icon: "/icons/comedy_4424700.png", slug: "comedy" },
  { title: "Fantasy", icon: "/icons/fantasy_3839827.png", slug: "fantasy" },
  { title: "Romantic", icon: "/icons/cupid_1492043.png", slug: "romantic" },
  { title: "Thriller", icon: "/icons/thriller.png", slug: "thriller" },
  { title: "Adventure", icon: "/icons/adventure.png", slug: "adventure" },
  { title: "Mystery", icon: "/icons/mystery.png", slug: "mystery" },
  { title: "Dreamy", icon: "/icons/dreamy.png", slug: "dreamy" },
  { title: "Mind-Blending", icon: "/icons/mind-blending.png", slug: "mind-blending" },
];


  return (
    <main className="min-h-screen bg-[#10191d] flex flex-col items-center text-center relative">
      {/* HERO */}
      {loading && <div className="text-white py-20">Загрузка фильмов...</div>}
      {!loading && heroMovies.length > 0 && (
        <div className="w-full h-[60vh] md:h-[92vh] mb-16 relative overflow-hidden">
          {/* Фильм */}
          <div className="relative w-full h-full transition-all duration-700">
            <Image
              src={`https://image.tmdb.org/t/p/original${heroMovies[currentIndex].backdrop_path}`}
              alt={heroMovies[currentIndex].title}
              fill
              sizes="100vw"
              className="object-cover brightness-[0.8]"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">
                {heroMovies[currentIndex].title}
              </h1>
              <p className="max-w-2xl text-lg md:text-2xl drop-shadow-md">
                {heroMovies[currentIndex].overview}
              </p>
            </div>
          </div>

          {/* Стрелки */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl font-bold px-3 pb-3 bg-black/50 rounded-full hover:bg-black/70 transition "
          >
            &#8249;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl font-bold px-3 pb-3 bg-black/30 rounded-full hover:bg-black/50 transition"
          >
            &#8250;
          </button>
        </div>
      )}

      {/* MOOD SECTION */}
      <div className="min-h-screen flex flex-col items-center px-6 text-center pt-24">
        <h1 className="text-5xl md:text-6xl text-neutral-200 font-bold font-serif mb-6 tracking-tight">
          How are you feeling today? 🎬
        </h1>

        <p className="text-lg font-serif text-neutral-200 max-w-xl mb-14 leading-relaxed">
          Choose your mood and discover movies that match your emotions.
          Save favorites and explore cinema your way.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {moodList.map((m) => (
            <MoodCard key={m.slug} emoji={m.icon} title={m.title} slug={m.slug} />
          ))}
        </div>
      </div>

      <FavoritesClient />
    </main>
  );
}
