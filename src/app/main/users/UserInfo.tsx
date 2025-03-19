import { ChangeEvent, useState } from "react";
import InfoItem from "../../../components/users/InfoItem";
import { useUserStore } from "../../../store/userStore";
import Image from "next/image";

const tabList = [
  "프로필",
  "신체정보",
  "회원권",
  "운동기록",
  "상담",
  "결제",
  "포인트",
  "앱 활동",
  "초기 설문",
  "AI 코치",
  "알림톡",
];

export default function UserInfo() {
  const { loggedUserInfo } = useUserStore((state) => state);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "24px 10px 0px 0px",
        padding: 48,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* 이름 회원님 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 42, fontWeight: 700, color: "#21272A" }}>
          {loggedUserInfo.name}
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#757575" }}>
          회원님
        </span>
      </div>

      {/* 사진 / 기타등등 */}
      <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            backgroundImage: `url(${
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : "/images/profile-big.png"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 126,
            height: 126,
            borderRadius: 100,
          }}
        >
          {/* <Image
              src="/images/profile-big.png"
              width={126}
              height={126}
              alt=""
            /> */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              width: "100%",
              height: "100%",
              opacity: 0,
              position: "absolute",
              zIndex: 2,
            }}
          />
          <div
            style={{
              display: selectedFile ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/images/memo.svg"
              width={48}
              height={48}
              alt=""
              style={{ position: "absolute" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {/* 회원 정보 */}
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Image
              src="/images/user-profile-01.svg"
              width={24}
              height={24}
              alt=""
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* 뱃지 */}
              <div
                style={{
                  padding: "2px 10px",
                  borderRadius: 16,
                  backgroundColor: "#FFDEDE",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: "black" }}>
                  레드
                </span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#1E1E1E" }}>
                {loggedUserInfo.membership.level}|
                {loggedUserInfo.membership.type}|{loggedUserInfo.location}
              </span>
            </div>
          </div>
          {/* 회원 주의사항 */}
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Image src="/images/caution.svg" width={24} height={24} alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: "#1E1E1E" }}>
                {loggedUserInfo.stats.particulars}
              </span>
            </div>
          </div>
          {/* 텔넘버 */}
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Image src="/images/phone.svg" width={24} height={24} alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: "#1E1E1E" }}>
                {loggedUserInfo.contact.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 아이템들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <InfoItem title="회원구분" content={loggedUserInfo.membership.type} />
        <InfoItem title="회원등급" content={loggedUserInfo.membership.level} />
        <InfoItem title="잔여회원권" content={["포톤테라피 7회", "하이"]} />
        <InfoItem
          title="잔여 회원권 기간"
          content={`${calculateMembershipProgress(
            loggedUserInfo.membership.lastReRegisteredAt,
            loggedUserInfo.membership.expirationDate
          )}`}
        />
      </div>

      {/* 두번째 아이템들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <InfoItem
          title="이번 달 방문"
          content={"3회"}
          optionalNode={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                padding: "2px 12px",
                backgroundColor: "#900B09",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>
                지난 달 {10}회
              </span>
            </div>
          }
        />
        <InfoItem title="누적 방문" content={"24회"} />
        <InfoItem title="최근 3개월 상담" content={"3회"} />
        <InfoItem
          title="현재 체중 / 목표 체중"
          content={`${loggedUserInfo.stats.currentWeight}kg / ${loggedUserInfo.stats.goalWeight}kg`}
        />
      </div>

      {/* 탭 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--Border-Default-Default, #D9D9D9)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {tabList.map((tab, i) => {
            return (
              <div
                key={i}
                onClick={() => setSelectedTab(tab)}
                style={{
                  marginBottom: -1,
                  padding: "16px 0px 17px 0px",
                  marginRight: 24,
                  borderBottom:
                    selectedTab === tab ? "1px solid #900B09" : "none",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: selectedTab === tab ? "#900B09" : "#1E1E1E",
                  }}
                >
                  {tab}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
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
            alert("회원수정");
          }}
        >
          <Image src={"/images/edit.svg"} alt="" width={21} height={21} />
          <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
            수정
          </span>
        </div>
      </div>
    </div>
  );
}

function calculateMembershipProgress(
  registeredAt: string,
  expirationDate: string
) {
  // 문자열을 Date 객체로 변환
  const registrationDate = new Date(registeredAt).getTime();
  const expireDate = new Date(expirationDate).getTime();
  const currentDate = new Date().getTime(); // 현재 날짜

  // 지나온 날짜 계산 (오늘 - 등록일)
  const daysPassed = Math.floor(
    (currentDate - registrationDate) / (1000 * 60 * 60 * 24)
  );

  // 총 유효 기간 계산 (만료일 - 등록일)
  const totalDays = Math.floor(
    (expireDate - registrationDate) / (1000 * 60 * 60 * 24)
  );
  if (daysPassed > totalDays) {
    return "만료";
  }
  // 형식에 맞게 반환
  return `${daysPassed}일 / ${totalDays}일`;
}
