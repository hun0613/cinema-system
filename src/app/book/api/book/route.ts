import { conn } from "@/app/api";
import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * 선택 영화 정보 API
 */
export async function GET(req: NextRequest): Promise<any> {
  const { searchParams } = new URL(req.url);
  const book_id: number = Number(searchParams.get("book_id"));

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // movie data select
    let sql: string = `SELECT A.book_id, B.title, B.poster_img, C.name, D.room_nm, A.date, A.time, A.seat FROM book A LEFT OUTER JOIN movie B ON A.movie_id = B.id LEFT OUTER JOIN theater C ON A.theater_id = C.theater_id LEFT OUTER JOIN room D ON A.room_id = D.room_id AND A.theater_id = D.theater_id WHERE A.book_id = ${book_id}`;

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
