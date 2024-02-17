import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest) {
  let data = {
    text: "heelo",
  };

  return NextResponse.json(data);
}
