import Image from "next/image";
import { useState } from "react";
import { alarmTalkMockData } from "../../../data/users/alarmtalk";
export default function AlarmTalk() {
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: new Array(1).fill(0).map((_, i) => i + 1), // 나중에 지우자.
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 테이블 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 191,
              maxWidth: 191,
            }}
          >
            날짜
          </span>

          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 673,
              maxWidth: 673,
            }}
          >
            결제수단
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
            }}
          >
            내용
          </span>
        </div>

        {/* 로우 */}
        {alarmTalkMockData.map((item) => (
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
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 191,
                maxWidth: 191,
              }}
            >
              {item.date}
            </span>

            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
                minWidth: 673,
                maxWidth: 673,
              }}
            >
              {item.notes}
            </span>

            <div
              style={{
                backgroundColor: item.type === "성공" ? "#4BE3A24D" : "#FFE0E0",
                padding: "3px 0px",
                borderRadius: 4,
                minWidth: 75,
                maxWidth: 75,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: item.type === "성공" ? "#28AC74" : "#EC221F",
                }}
              >
                {item.type}
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
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "100%",
                  }}
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
