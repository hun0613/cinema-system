import { conn } from "@/app/api";
import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * 날짜 API
 */
export async function GET(req: NextRequest): Promise<any> {
  const currDateCode = new Date();

  let currDate = `${currDateCode.getFullYear()}${currDateCode.getMonth() + 1 < 10 ? "0" + (currDateCode.getMonth() + 1) : currDateCode.getMonth() + 1}${currDateCode.getDate() < 10 ? "0" + currDateCode.getDate() : currDateCode.getDate()}`;

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // date data select
    let sql: string = `SELECT * FROM date WHERE Date(date) >= Date(${currDate}) LIMIT 14`;

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
