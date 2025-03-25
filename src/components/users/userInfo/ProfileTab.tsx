import { Dispatch, SetStateAction, useState } from "react";
import { IResUserProps } from "../../../types/users";
import ProfileItem from "./ProfileItem";
import Image from "next/image";
import { useGlobalStore } from "../../../store/globalStore";

const options = [
  "남양주 다산점",
  "양주 옥정점",
  "의정부 가능점",
  "파주 운정점",
];

export default function ProfileTab({
  profileProps,
  editable,
  setEditable,
  profileImageFile,
  setProfileEditDone,
}: {
  profileProps: IResUserProps;
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  profileImageFile: File | null;
  setProfileEditDone: Dispatch<SetStateAction<boolean>>;
}) {
  const { setSelectedTab } = useGlobalStore((state) => state);
  const [editName, setEditName] = useState(profileProps.name);
  const [editLocation, setEditLocation] = useState(profileProps.location);
  const [editContactPhone, setEditContactPhone] = useState(
    profileProps.contact.phone
  );
  const [editContactEmail, setEditContactEmail] = useState(
    profileProps.contact.email
  );
  const [editJob, setEditJob] = useState(profileProps.job);

  const reqEditUser = async () => {
    await fetch("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify({
        id: profileProps.id,
        name: editName,
        location: editLocation,
        contact: { phone: editContactPhone, email: editContactEmail },
        job: editJob,
      }),
    });
    setProfileEditDone(true);
  };

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
          title="이름"
          value={editName}
          setValue={setEditName}
        />
        <ProfileItem
          editable={editable}
          title="소속지점"
          value={editLocation}
          subListValue={options}
          setValue={setEditLocation}
        />
        <ProfileItem
          editable={editable}
          title="연락처"
          value={editContactPhone}
          setValue={setEditContactPhone}
        />
        <ProfileItem
          editable={editable}
          title="이메일"
          value={editContactEmail}
          setValue={setEditContactEmail}
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
        <ProfileItem title="아이디" value={profileProps.account.id} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {/* <ProfileItem editable={editable} title="아이디" value={"해당 사용자 아이디"} /> */}
        {/* <ProfileItem
          title="비밀번호"
          value={"고객의 요청이 아니라면 수정금지"}
        /> */}
        <ProfileItem
          editable={editable}
          title="직업"
          value={editJob}
          setValue={setEditJob}
        />
        <ProfileItem title="회원구분" value={profileProps.membership.type} />
        <ProfileItem title="회원등급" value={profileProps.membership.level} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <ProfileItem
          title="최초 등록 일자"
          value={profileProps.membership.registeredAt}
        />
        <ProfileItem
          title="최근 재등록 일자"
          value={profileProps.membership.lastReRegisteredAt}
        />
        <ProfileItem
          title="현재 회원권 만료일"
          value={formatExpiryDate(
            profileProps.membership.lastReRegisteredAt,
            profileProps.membership.expirationDate
          )}
        />
      </div>
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
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                borderRadius: 10,
                alignItems: "center",
                gap: 6.5,
                padding: 12,
                cursor: "pointer",
                border: "1px solid var(--Icon-Danger-Default, #900B09)",
              }}
              onClick={async () => {
                await fetch("/api/users/profile", {
                  method: "DELETE",
                  body: JSON.stringify({ id: profileProps.id }),
                });
                setSelectedTab("전체회원");
              }}
            >
              <Image src={"/images/trash.svg"} alt="" width={21} height={21} />
              <span style={{ fontWeight: 700, fontSize: 16, color: "#1E1E1E" }}>
                삭제
              </span>
            </div>
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
              onClick={async () => {
                await reqEditUser();
                setEditable(false);
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
