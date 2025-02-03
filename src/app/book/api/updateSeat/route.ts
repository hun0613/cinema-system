import { conn } from "@/app/api";
import mysql from "mysql2/promise";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * 상영시간표 정보 API
 */
export async function PATCH(req: NextRequest, res: NextApiResponse): Promise<any> {
  const { searchParams } = new URL(req.url);

  //   console.log(theater_id, movie_id, date);
  if (req.method === "PATCH") {
    const body = await req.json();

    // return NextResponse.json({});
    try {
      // rds 연결
      const db: mysql.Connection = await mysql.createConnection(conn);

      // movieTime data select
      let sql: string = `UPDATE movieTime A SET A.seat_state = '${JSON.stringify(body.seat)}' WHERE A.theater_id = ${body.theater_id} AND A.room_id = ${body.room_id} AND A.movie_id = ${body.room_id} AND A.date = '${body.date}' AND A.time = '${body.time}'`;
      let insertSql: string = `INSERT INTO book(theater_id, room_id, movie_id, date, time, seat) VALUES (${body.theater_id}, ${body.room_id}, ${body.movie_id}, '${body.date}', '${body.time}', '${JSON.stringify(body.selectSeat)}')`;

      // db 데이터 가져오기
      const [result] = await db.execute(sql);
      const [res]: any = await db.execute(insertSql);

      await db.end();

      // response 리턴
      return NextResponse.json({ res: "success", bookId: res.insertId });
    } catch (error) {
      // 에러발생 시 예외처리
      console.log(error);

      return error;
    }
  } else {
  }
}
