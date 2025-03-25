import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IUserListProps } from "../../../../types";

export async function GET() {
  const filePath = path.join(process.cwd(), "user.json"); // 루트 디렉토리의 user.json 경로
  const jsonData = fs.readFileSync(filePath, "utf8"); // JSON 파일 읽기
  const data = JSON.parse(jsonData);

  return NextResponse.json(data); // JSON 응답 반환
}

export async function PUT(req: NextRequest) {
  const { id, particulars } = await req.json();
  const filePath = path.join(process.cwd(), "user.json"); // 루트 디렉토리의 user.json 경로
  const jsonData = fs.readFileSync(filePath, "utf8"); // JSON 파일 읽기
  const userData = JSON.parse(jsonData);
  const userIndex = userData.findIndex(
    (user: IUserListProps) => user.id === id
  );

  if (userIndex !== -1) {
    userData[userIndex].stats.particulars = particulars;
  }
  const jsonSave = JSON.stringify(userData);
  fs.writeFileSync(filePath, jsonSave);

  return NextResponse.json({ success: true }); // JSON 응답 반환
}
