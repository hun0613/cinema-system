import { movieData, movieType } from "@/data/movieData";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  let data: movieType = movieData.filter((el) => el.id === Number(id))[0];

  return NextResponse.json(data);
}
