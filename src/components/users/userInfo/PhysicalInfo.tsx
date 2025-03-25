import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IResUserProps } from "../../../types/users";
import ProfileItem from "./ProfileItem";
import Image from "next/image";

export default function PhysicalInfo({
  profileProps,
  setProfileEditDone,
}: {
  profileProps: IResUserProps;
  setProfileEditDone: Dispatch<SetStateAction<boolean>>;
}) {
  const [particulars, setParticulars] = useState(
    profileProps.stats.particulars
  );

  const [height, setHeight] = useState(profileProps.stats.height.toString());
  const [currentWeight, setCurrentWeight] = useState(
    profileProps.stats.currentWeight.toString()
  );
  const [goalWeight, setGoalWeight] = useState(
    profileProps.stats.goalWeight.toString()
  );

  const [averageExerciseTime] = useState(
    profileProps.stats.averageExerciseTime
  );
  const [gender] = useState(profileProps.gender);

  // 평균 생리주기
  const [averageCycleWeeks] = useState(
    profileProps.stats.menstrualCycle.averageCycleWeeks.toString()
  );

  // 현재 생리날짜 기준
  const [currentFlowStandard] = useState(
    profileProps.stats.menstrualCycle.currentFlowStandard
  );

  //   생리전증상
  const [premenstrualSymptoms] = useState(
    profileProps.stats.menstrualCycle.premenstrualSymptoms
  );
  //    신체활동 제한여부
  const [activityRestrictionDuringPeriod] = useState(
    profileProps.stats.menstrualCycle.activityRestrictionDuringPeriod
  );

  const [editable, setEditable] = useState(false);

  const reqEditUser = async () => {
    await fetch("/api/users/physical", {
      method: "PUT",
      body: JSON.stringify({
        id: profileProps.id,
        particulars,
        height,
        currentWeight,
        goalWeight,
      }),
    });
    setProfileEditDone(true);
  };

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <ProfileItem
          editable={editable}
          title="지병 및 특이사항"
          value={particulars}
          setValue={setParticulars}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <ProfileItem
          title="생년월일"
          value={`${parseDateAndCalculateAge(profileProps.birthdate).str} (만${
            parseDateAndCalculateAge(profileProps.birthdate).age
          }세)`}
        />
        <ProfileItem title="성별" value={profileProps.gender} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <ProfileItem
          editable={editable}
          title="신장"
          value={height}
          setValue={setHeight}
        />
        <ProfileItem
          editable={editable}
          title="목표체중"
          value={goalWeight}
          setValue={setGoalWeight}
        />
        <ProfileItem
          editable={editable}
          title="현재체중"
          value={currentWeight}
          setValue={setCurrentWeight}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <ProfileItem title="평균 수면 시간" value={averageExerciseTime} />
        <ProfileItem
          title="수면의 질"
          value={profileProps.stats.sleepQuality}
        />
      </div>
      {gender === "여성" && (
        <>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <ProfileItem title="평균 생리 주기" value={averageCycleWeeks} />
            <ProfileItem
              title="현재 생리 날짜 기준"
              value={currentFlowStandard}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <ProfileItem title="생리 전 증상" value={premenstrualSymptoms} />
            <ProfileItem
              title="생리 전 증상 여부"
              value={activityRestrictionDuringPeriod ? "있음" : "없음"}
            />
          </div>
        </>
      )}
      {/* 버튼 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {!editable && (
          <div
            style={{
              backgroundColor: "#900B09",
              display: "flex",
              flexDirection: "row",
              borderRadius: 10,
              alignItems: "center",
              gap: 6.5,
              padding: 12,
              cursor: "pointer",
            }}
            onClick={() => {
              setEditable(true);
            }}
          >
            <Image src={"/images/edit.svg"} alt="" width={21} height={21} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
              수정
            </span>
          </div>
        )}
        {editable && (
          <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <div
              style={{
                backgroundColor: "#900B09",
                display: "flex",
                flexDirection: "row",
                borderRadius: 10,
                alignItems: "center",
                gap: 6.5,
                padding: 12,
                cursor: "pointer",
              }}
              onClick={() => {
                setEditable(false);
                reqEditUser();
              }}
            >
              <Image src={"/images/save.svg"} alt="" width={21} height={21} />
              <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
                저장
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function parseDateAndCalculateAge(inputDate: string) {
  // 현재 날짜 가져오기
  const today = new Date();

  // 입력 형식에 따라 구분자 처리
  const [year, month, day] = inputDate.includes("-")
    ? inputDate.split("-")
    : inputDate.split(".");
  // 날짜 객체 생성
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));

  // 나이 계산
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // 생일이 아직 지나지 않은 경우 나이 조정
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // 결과 객체 생성 및 반환
  return {
    age: age,
    str: `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}`,
  };
}

function formatExpiryDate(startDate: string, expiryDate: string) {
  // 날짜 형식 정규화 (구분자 처리)
  const normalizeDate = (dateStr: string) => {
    if (typeof dateStr !== "string") return null;

    // 구분자에 따라 날짜 분리
    let parts;
    if (dateStr.includes("-")) {
      parts = dateStr.split("-");
    } else if (dateStr.includes(".")) {
      parts = dateStr.split(".");
    } else {
      return null;
    }

    // 유효한 날짜 형식인지 확인
    if (parts.length !== 3) return null;

    const [year, month, day] = parts;
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  // 날짜 객체 생성
  const start = normalizeDate(startDate);
  const expiry = normalizeDate(expiryDate);

  // 유효한 날짜가 아닌 경우 에러 처리
  if (!start || !expiry) {
    throw new Error(
      "유효하지 않은 날짜 형식입니다. YYYY-MM-DD 또는 YYYY.MM.DD 형식을 사용하세요."
    );
  }

  // 현재 날짜 기준으로 만료까지 남은 일수 계산
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 만료일 포맷팅 (YYYY.MM.DD)
  const year = expiry.getFullYear();
  const month = String(expiry.getMonth() + 1).padStart(2, "0");
  const day = String(expiry.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // 남은 일수에 따른 메시지 생성
  let message;
  if (diffDays < 0) {
    message = `(만료 +${diffDays * -1}일 경과)`;
  } else if (diffDays === 0) {
    message = `(오늘 만료)`;
  } else {
    message = `(만료 ${diffDays}일 전)`;
  }

  return `${formattedDate} ${message}`;
}
