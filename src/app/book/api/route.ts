import { conn } from "@/app/api";
import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * 선택 영화 정보 API
 */
export async function GET(req: NextRequest): Promise<any> {
  const { searchParams } = new URL(req.url);
  const id: number = Number(searchParams.get("id"));

  try {
    // rds 연결
    const db: mysql.Connection = await mysql.createConnection(conn);

    // movie data select
    let sql: string = `SELECT * FROM movie WHERE id = ${id}`;

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
