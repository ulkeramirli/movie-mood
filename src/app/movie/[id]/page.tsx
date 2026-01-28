import { getMovieById, getMovieVideos } from "@/lib/tmdb";
import { Metadata } from "next";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieById(id);

  return {
    title: `${movie.title} | MoodMovies`,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;

  const movie = await getMovieById(id);
  const videos = await getMovieVideos(id);

  const trailer = videos.results?.find(
    (v: { type: string; site: string; key: string }) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <main className=" bg-black text-white">
      
      <section className="relative h-[85vh] w-full overflow-hidden">
       
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
       
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-end pb-20">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="hidden md:block w-64 shrink-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={260}
                height={390}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.release_date?.slice(0, 4)}</span>
                <span>{movie.runtime} min</span>
              </div>

              <p className="text-gray-200 leading-relaxed mb-6">
                {movie.overview}
              </p>

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
                >
                  ▶ Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-6">
          About the movie
        </h2>

        <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm">
          <div>
            <p><b>Status:</b> {movie.status}</p>
            <p><b>Language:</b> {movie.original_language.toUpperCase()}</p>
            <p><b>Budget:</b> ${movie.budget.toLocaleString()}</p>
          </div>

          <div>
            <p><b>Genres:</b> {movie.genres.map((g: { id: number; name: string }) => g.name).join(", ")}</p>
            <p><b>Popularity:</b> {movie.popularity}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
