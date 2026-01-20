import { searchMovies, getPopularMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

type PageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams?.q?.trim();

  const data = query
    ? await searchMovies(query)
    : await getPopularMovies();

  return (
    <main className="min-h-screen bg-[#10191d] px-6 pt-32 text-neutral-200">

      <h1 className="text-4xl md:text-6xl font-serif font-bold text-center mb-6">
        Search Movies
      </h1>

      <p className="text-center text-neutral-400 mb-16">
        Type a movie title and press Enter
      </p>

      {/* SEARCH INPUT */}
      <form className="max-w-xl mx-auto mb-20">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search for a movie..."
          className="
            w-full rounded-full px-6 py-4
            bg-[#0b1215] text-neutral-200
            placeholder-neutral-500
            border border-white/10
            outline-none
            focus:ring-2 focus:ring-white/30
          "
        />
      </form>

      {/* TITLE */}
      <h2 className="text-2xl font-serif text-center mb-10">
        {query ? `Results for “${query}”` : "Popular movies now"}
      </h2>

      {/* EMPTY STATE */}
      {query && data?.results?.length === 0 && (
        <p className="text-center text-neutral-400">
          No movies found
        </p>
      )}

      {/* MOVIES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {data?.results?.map((movie: any) => (
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
