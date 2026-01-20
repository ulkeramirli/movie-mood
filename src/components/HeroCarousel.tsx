"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export default function HeroCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies");
        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <div className="text-center py-20">Загрузка фильмов...</div>;
  if (!movies.length) return <div className="text-center py-20">Фильмы не найдены</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full bg-black py-12">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2 relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
              // width={400}
              // height={500}
            />
            <div className="absolute bottom-4 left-2 right-2 bg-black/60 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm truncate">{movie.overview}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
