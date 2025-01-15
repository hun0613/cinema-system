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
 * 좌석정보 API
 */
export async function GET(req: NextRequest): Promise<any> {
  const { searchParams } = new URL(req.url);
  const theater_id: number = Number(searchParams.get("theater_id"));
  const room_id: number = Number(searchParams.get("room_id"));

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // seat data select
    let sql: string = `SELECT * FROM room WHERE theater_id = ${theater_id} AND room_id = ${room_id}`;

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
