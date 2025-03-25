import Image from "next/image";
import { membershipMockData } from "../../data/users/userDetailMembership.mock";
import { useState } from "react";

const Card = ({
  bgColor,
  flex,
  children,
}: {
  bgColor: string;
  flex: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flex,
        // backgroundColor: "#F1F8FF",
        backgroundColor: bgColor,
        padding: 16,
        flexDirection: "row",
        border: "1px solid #DDE1E6",
        borderRadius: 10,
        position: "relative",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default function Membership() {
  const [selectedIds, setSelectedIds] = useState([] as Array<string | number>);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: new Array(10).fill(0).map((_, i) => i + 1), // 나중에 지우자.
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 윗 컨텐츠 */}
      <div style={{ display: "flex", flexDirection: "row", gap: 24 }}>
        <Card bgColor="#F1F8FF" flex={1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontWeight: 400, fontSize: 16, color: "#697077" }}>
              회원권 현황
            </span>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#21272A" }}>
              포톤테라피 100회
            </span>
            <span style={{ fontWeight: 400, fontSize: 16, color: "#697077" }}>
              만료일 : {"2025-08-30"}
            </span>
          </div>
          <div
            onClick={() => {
              alert("회원권 클릭");
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              padding: "2px 12px",
              borderRadius: 10,
              backgroundColor: "white",
              right: 16,
            }}
          >
            <Image src="/images/edit_grey.svg" alt="" width={20} height={20} />
          </div>
        </Card>
        <Card bgColor="#EBFFEE" flex={0.5}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#CFF7D3",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Image src={"/images/smile.svg"} alt="" width={24} height={24} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span style={{ fontWeight: 400, fontSize: 16, color: "#697077" }}>
                정시 출석
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#21272A" }}>
                {2}회
              </span>
            </div>
          </div>
        </Card>
        <Card bgColor="#FFFBEB" flex={0.5}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFF1C2",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Image src={"/images/smile.svg"} alt="" width={24} height={24} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span style={{ fontWeight: 400, fontSize: 16, color: "#697077" }}>
                지각
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#21272A" }}>
                {1}회
              </span>
            </div>
          </div>
        </Card>
        <Card bgColor="#FEE9E7" flex={0.5}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FDD3D0",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Image src={"/images/smile.svg"} alt="" width={24} height={24} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span style={{ fontWeight: 400, fontSize: 16, color: "#697077" }}>
                노쇼
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#21272A" }}>
                {2}회
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 테이블 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 10,
          gap: 10,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px 0px",
            borderBottom: "1px solid #A2A1A81A",
          }}
        >
          <div
            style={{
              minWidth: 40,
              maxWidth: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setSelectedIds(membershipMockData.map((item) => item.id));
                } else {
                  setSelectedIds([]);
                }
              }}
            />
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 132,
              maxWidth: 132,
            }}
          >
            날짜
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 100,
              maxWidth: 100,
            }}
          >
            예약시간
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 100,
              maxWidth: 100,
            }}
          >
            출석시간
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 130,
              maxWidth: 130,
            }}
          >
            프로그램
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 260,
              maxWidth: 260,
            }}
          >
            잔여 회원권
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 105,
              maxWidth: 105,
              marginLeft: 15,
            }}
          >
            이번 달 출석
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 105,
              maxWidth: 105,
            }}
          >
            누적 출석
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 75,
              maxWidth: 75,
            }}
          >
            상태
          </span>
        </div>

        {/* 로우 */}
        {membershipMockData.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 0px",
              borderBottom: "1px solid #A2A1A81A",
              alignItems: "center",
            }}
          >
            <div
              style={{
                minWidth: 40,
                maxWidth: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={(e) => {
                  if (selectedIds.includes(item.id)) {
                    setSelectedIds(selectedIds.filter((id) => id !== item.id));
                  } else {
                    setSelectedIds([...selectedIds, item.id]);
                  }
                }}
              />
            </div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 132,
                maxWidth: 132,
              }}
            >
              {item.date}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 100,
                maxWidth: 100,
              }}
            >
              {item.reservedTime}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 100,
                maxWidth: 100,
              }}
            >
              {item.attendedTime}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 130,
                maxWidth: 130,
              }}
            >
              {item.program === "VIBE_FIT"
                ? "바이브핏"
                : item.program === "PORTON_THERAPY"
                ? "포톤테라피"
                : "바이브테라피"}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 260,
                maxWidth: 260,
              }}
            >
              포톤테라피 {item.remainingMemberships.PORTON_THERAPY}회, 바이브핏{" "}
              {item.remainingMemberships.VIBE_FIT}회, 바이브테라피{" "}
              {item.remainingMemberships.VIEBE_THERAPY}회
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 105,
                maxWidth: 105,
                marginLeft: 15,
              }}
            >
              {item.monthlyAttendedCnt}
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 105,
                maxWidth: 105,
              }}
            >
              {item.stackAttendedCnt}
            </span>
            <div
              style={{
                minWidth: 85,
                maxWidth: 85,
                padding: "3px 9px",
                borderRadius: 4,
                backgroundColor:
                  item.status === "on time"
                    ? "#4BE3A24D"
                    : item.status === "late"
                    ? "#FFF9C2"
                    : "#FFE0EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color:
                    item.status === "on time"
                      ? "#28AC74"
                      : item.status === "late"
                      ? "#FF9000"
                      : "#EC221F",
                }}
              >
                {item.status === "on time"
                  ? "정상출석"
                  : item.status === "late"
                  ? "지각"
                  : "노쇼"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 */}
      <div
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            marginRight: 8,
            cursor: "pointer",
          }}
          onClick={() => {}}
        >
          <Image
            src={"/images/chevron-left.svg"}
            alt=""
            width={24}
            height={24}
          />
          <span style={{ fontSize: 16, fontWeight: 500, color: "#697077" }}>
            처음
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {pageInfo.totalPage.map((index) => {
            return (
              <div
                key={index}
                style={{
                  padding: "12px 16px",
                  borderRadius: 30,
                  backgroundColor:
                    index === pageInfo.currentPage ? "#E3E3E3" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // 현재 페이지 + 필터기반 페이지 요청 후 set하기

                  setPageInfo({ ...pageInfo, currentPage: index });
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: "100%" }}
                >
                  {index}
                </span>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            setPageInfo({
              ...pageInfo,
              currentPage: pageInfo.totalPage.length,
            });
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            gap: 4,
            marginLeft: 8,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: "#697077" }}>
            끝
          </span>
          <Image
            src={"/images/chevron-right.svg"}
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
