import Image from "next/image";
import { healthMockData } from "../../../data/users/healthRecord.mock";
import { useState } from "react";

export default function HealthRecord() {
  const [selectedIds, setSelectedIds] = useState([] as Array<string | number>);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: new Array(1).fill(0).map((_, i) => i + 1), // 나중에 지우자.
  });
  const [editable, setEditable] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
                  setSelectedIds(healthMockData.map((item) => item.id));
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
              minWidth: 100,
              maxWidth: 100,
            }}
          >
            담당자
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#A2A1A8",
              minWidth: 110,
              maxWidth: 110,
            }}
          >
            태그
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
            내용
          </span>
        </div>

        {/* 로우 */}
        {healthMockData.map((item) => (
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
                onChange={() => {
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
              {item.date.replaceAll("-", ".")}
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
              {item.program === "PORTON_THERAPY"
                ? "포톤테라피"
                : item.program === "VIBE_THERAPY"
                ? "바이브테라피"
                : "바이브핏"}
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
              {item.trainer}
            </span>

            <div
              style={{
                minWidth: 110,
                maxWidth: 110,
              }}
            >
              <span
                style={{
                  minWidth: 85,
                  maxWidth: 85,
                  padding: "3px 9px",
                  borderRadius: 4,
                  backgroundColor:
                    item.status === "management" ? "#C7FFC2" : "#FFF9C2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 300,
                  color: item.status === "management" ? "#1DB459" : "#FF9000",
                }}
              >
                {item.status === "management" ? "운동관리" : "운동처방"}
              </span>
            </div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#16151C",
              }}
            >
              {item.notes}
            </span>
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
              alert("운동기록-수정 기능을 구현하세요");
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
