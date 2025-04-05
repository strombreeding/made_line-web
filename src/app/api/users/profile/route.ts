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
  const {
    id,
    name,
    location,
    contact,
    job,
    gender,
    birthdate,
    membership,
    // profileImageFile
  } = await req.json();
  const filePath = path.join(process.cwd(), "user.json"); // 루트 디렉토리의 user.json 경로
  const jsonData = fs.readFileSync(filePath, "utf8"); // JSON 파일 읽기
  const userData = JSON.parse(jsonData);
  const userIndex = userData.findIndex(
    (user: IUserListProps) => user.id === id
  );

  if (userIndex !== -1) {
    userData[userIndex].name = name;
    userData[userIndex].location = location;
    userData[userIndex].contact.phone = contact.phone;
    userData[userIndex].contact.email = contact.email;
    userData[userIndex].job = job;
    userData[userIndex].gender = gender;
    userData[userIndex].birthdate = birthdate;
    userData[userIndex].membership.type = membership.type;
    userData[userIndex].membership.registeredAt = membership.registeredAt;
    // userData[userIndex].profileImageFile = profileImageFile;
  }
  const jsonSave = JSON.stringify(userData);
  fs.writeFileSync(filePath, jsonSave);

  return NextResponse.json({ success: true }); // JSON 응답 반환
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const filePath = path.join(process.cwd(), "user.json"); // 루트 디렉토리의 user.json 경로
  const jsonData = fs.readFileSync(filePath, "utf8"); // JSON 파일 읽기
  const userData = JSON.parse(jsonData);
  const userIndex = userData.findIndex(
    (user: IUserListProps) => user.id === id
  );

  userData.splice(userIndex, 1);

  const jsonSave = JSON.stringify(userData);
  fs.writeFileSync(filePath, jsonSave);

  return NextResponse.json({ success: true }); // JSON 응답 반환
}

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), "user.json"); // 루트 디렉토리의 user.json 경로
  const jsonData = fs.readFileSync(filePath, "utf8"); // JSON 파일 읽기
  const data = JSON.parse(jsonData);
  const { name, contact, birthdate, location } = await req.json();
  let newId = "";
  while (true) {
    const randomId = Math.round(Math.random() * 100000).toString();
    if (data.find((user: IUserListProps) => user.id === randomId)) {
      newId = randomId;
      break;
    }
  }
  const newUser = {
    id: newId,
    name,
    contact,
    birthdate,
    gender: "남성",
    location,
    account: { id: "madeline@gmail.com", role: "admin" },
    membership: {
      memberships: [],
      type: "체험회원",
      level: "신규",
      registeredAt: new Date().toISOString().split("T")[0],
      lastReRegisteredAt: new Date().toISOString().split("T")[0],
      expirationDate: new Date().toISOString().split("T")[0],
    },
    stats: {
      height: 0,
      currentWeight: 1,
      goalWeight: 1,
      exerciseGoal: "",
      averageExerciseTime: "",
      sleepQuality: "",
      particulars: "",
      menstrualCycle: {
        averageCycleWeeks: 0,
        currentFlowStandard: "",
        premenstrualSymptoms: "",
        activityRestrictionDuringPeriod: false,
      },
    },
    job: "",
    attendance: {
      monthlyCount: 0,
      totalCount: 0,
      lastAttended: new Date().toISOString().split("T")[0],
    },
  };
  data.push(newUser);
  const jsonSave = JSON.stringify(data);
  fs.writeFileSync(filePath, jsonSave);

  return NextResponse.json({ success: true }); // JSON 응답 반환
}
