import { conn } from "@/app/api";
import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * 좌석정보 API
 */
export async function GET(req: NextRequest): Promise<any> {
  const { searchParams } = new URL(req.url);
  const theater_id: number = Number(searchParams.get("theater_id"));
  const movie_id: number = Number(searchParams.get("movie_id"));
  const date: string | null = searchParams.get("date");
  const time: string | null = searchParams.get("time");

  console.log(theater_id, movie_id, date, time);

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // seat data select
    let sql: string = `SELECT * FROM movieTime WHERE theater_id = ${theater_id} AND movie_id = ${movie_id} AND date = ${date} AND time = "${time}"`;

    // db 데이터 가져오기
    const [result] = await db.execute(sql);

    await db.end();

    // response 리턴
    return NextResponse.json(result);
  } catch (error) {
    // 에러발생 시 예외처리
    console.log(error);

    return error;
  }
}
