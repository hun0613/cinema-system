import { movieData, movieType } from "@/data/movieData";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest) {
  let data: movieType[] = movieData;

  console.log(data);

  return NextResponse.json(data);
}
