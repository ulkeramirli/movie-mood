import { moods } from "@/lib/moods";
import { curatedMovies } from "@/lib/curatedMovies";
import { getMoviesByGenre, getMoviesByIds } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    mood: string;
  }>;
};

// ✅ SEO
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { mood } = await params;

  const moodKey = mood.toLowerCase() as keyof typeof moods;
  const moodData = moods[moodKey];

  if (!moodData) {
    return {
      title: "Mood not found | MoodMovies",
    };
  }

  return {
    title: `${moodData.title} Movies | MoodMovies`,
    description: `Discover ${moodData.title.toLowerCase()} movies that perfectly match your mood.`,
  };
}

// ✅ Page
export default async function MoodPage({ params }: PageProps) {
  const { mood } = await params;
  const moodKey = mood.toLowerCase() as keyof typeof moods;

  const moodData = moods[moodKey];
  if (!moodData) {
    notFound();
  }

  // 🔥 ТВОЯ ФИШКА: свои фильмы для каждого emoji
  const curatedIds =
    curatedMovies[moodKey as keyof typeof curatedMovies];

  const movies = curatedIds
    ? await getMoviesByIds(curatedIds)
    : (await getMoviesByGenre(moodData.genres)).results;

  return (
    <main className="p-10 ">
      <h1 className="text-3xl font-bold mb-15 text-center">
        Movies for: {moodData.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie: any) => (
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

