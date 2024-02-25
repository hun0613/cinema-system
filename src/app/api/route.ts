import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

const conn = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
};

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * movie data API
 */
export async function GET(req: NextRequest) {
  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // movie data select
    let sql: string = "SELECT * FROM movie";

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
