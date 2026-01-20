const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// janra görə filmlər
export async function getMoviesByGenre(genre: string) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  return res.json();
}

// ID-yə görə tək film
export async function getMovieById(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}

// ID-lərə görə birdən çox film (ƏSAS PROBLEM BURADA İDİ)
export async function getMoviesByIds(ids: number[]) {
  if (!ids || ids.length === 0) return [];

  const movies = await Promise.all(
    ids
      .filter((id) => typeof id === "number") // undefined-ləri atırıq
      .map(async (id) => {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );

        if (!res.ok) {
          console.error("Fetch failed for movie id:", id);
          return null;
        }

        return res.json();
      })
  );

  return movies.filter(Boolean); // null olanları silir
}

// film videoları
export async function getMovieVideos(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  return res.json();
}

// film axtarışı
export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}`
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return res.json();
}

// popular filmlər
export async function getPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return res.json();
}

