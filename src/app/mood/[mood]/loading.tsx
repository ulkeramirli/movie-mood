export default function Loading() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-15 text-center">
        Loading movies...
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
          >
            <div className="h-[450px] rounded-xl bg-gray-200 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </main>
  );
}
