import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

type connectInfo = {
  host: string | undefined;
  port: number;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
};

const conn: connectInfo = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
};

/**
 * 상영시간표 정보 API
 */
export async function GET(req: NextRequest): Promise<any> {
  const { searchParams } = new URL(req.url);
  const theater_id: number = Number(searchParams.get("theater_id"));
  const movie_id: number = Number(searchParams.get("movie_id"));
  const date: string | null = searchParams.get("date");

  //   console.log(theater_id, movie_id, date);

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // movieTime data select
    let sql: string = `SELECT A.theater_id, A.room_id, B.room_nm, A.date, A.time, A.seat_state FROM movieTime A LEFT OUTER JOIN room B ON A.theater_id = B.theater_id AND A.room_id = B.room_id WHERE A.theater_id = ${theater_id} AND A.movie_id = ${movie_id} AND A.date = ${date}`;

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
