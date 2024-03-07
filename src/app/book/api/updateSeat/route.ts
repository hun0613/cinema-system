import mysql from "mysql2/promise";
import { NextApiResponse } from "next";
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
export async function PATCH(req: NextRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  const theater_id: number = Number(searchParams.get("theater_id"));
  const movie_id: number = Number(searchParams.get("movie_id"));
  const date: string | null = searchParams.get("date");

  //   console.log(theater_id, movie_id, date);
  if (req.method === "PATCH") {
    const body = await req.json();

    console.log(JSON.stringify(body.seat));

    // return NextResponse.json({});
    try {
      // rds 연결
      const db: mysql.Connection = await mysql.createConnection(conn);

      // movieTime data select
      let sql: string = `UPDATE movieTime A SET A.seat_state = '${JSON.stringify(body.seat)}' WHERE A.theater_id = ${body.theater_id} AND A.room_id = ${body.room_id} AND A.movie_id = ${body.room_id} AND A.date = '${body.date}' AND A.time = '${body.time}'`;

      // db 데이터 가져오기
      const [result] = await db.execute(sql);

      await db.end();

      // response 리턴
      return NextResponse.json({ res: "success" });
    } catch (error) {
      // 에러발생 시 예외처리
      console.log(error);

      return error;
    }
  } else {
  }
}
