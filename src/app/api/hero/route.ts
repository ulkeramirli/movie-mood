import { NextResponse } from "next/server";
import { getMoviesByGenre } from "@/lib/tmdb";

export async function GET() {
  try {
    
    const data = await getMoviesByGenre("28");
    const movies = data.results;

    const shuffled = movies.sort(() => 0.5 - Math.random());
    const heroMovies = shuffled.slice(0, 8);

    return NextResponse.json(heroMovies);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Не удалось получить фильмы" }, { status: 500 });
  }
}
