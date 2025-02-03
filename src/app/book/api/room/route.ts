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
  const room_id: number = Number(searchParams.get("room_id"));
  const date: string | null = searchParams.get("date");
  const time: string | null = searchParams.get("time");

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // seat data select
    let sql: string = `SELECT A.*, B.seat_state, B.date, B.time, B.movie_id FROM room A LEFT OUTER JOIN movieTime B on A.theater_id = B.theater_id AND A.room_id = B.room_id WHERE A.theater_id = ${theater_id} AND A.room_id = ${room_id} AND B.date = '${date}' AND B.time = '${time}'`;

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
