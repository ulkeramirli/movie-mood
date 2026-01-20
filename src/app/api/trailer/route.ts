import { NextResponse } from "next/server";
import { getMovieVideos } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json(null);

  const data = await getMovieVideos(id);

  const trailer = data.results?.find(
    (v: any) => v.site === "YouTube" && v.type === "Trailer"
  );

  return NextResponse.json({ key: trailer?.key || null });
}
    
