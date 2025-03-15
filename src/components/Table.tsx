"use client";

import Image from "next/image";
import style from "../styles/Table.module.css";

interface ITableProps {
  name: string;
  location: string;
  memberships: string[];
  expiredMembership: string; // YYYY-MM-DD
  latestAttended: string; // YYYY-MM-DD
  type: string; // 등록회원 | 체험회원 | 종료회원
  level: string; // 신규 | VIP | 재등록
}

export default function Table({ data }: { data: ITableProps[] }) {
  const renderMemberships = (memberships: string[]) => {
    return memberships.length > 0 ? memberships.join(", ") : "-";
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case "등록회원":
        return "#EBFFEE";
      case "체험회원":
        return "#FFFBEB";
      case "종료회원":
        return "#FEE9E7";
      default:
        return "#EBFFEE";
    }
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffTime = Math.floor(
      (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffTime > 30) {
      return "+30일 경과";
    }
    return `${diffTime}일 전`;
  };

  console.log("들어옴?");

  return (
    <div
      style={{
        border: "1px solid #DDE1E6",
        borderRadius: 20,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          padding: "16px 10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 48,
          borderBottom: "1px solid #DDE1E6",
        }}
      >
        <div style={{ display: "flex", padding: "0px 12px" }}>
          <input type="checkbox" />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 140,
            padding: "0px 12px",
          }}
        >
          <span>회원명</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 140,
            padding: "0px 12px",
          }}
        >
          <span>지점</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 160,
            padding: "0px 12px",
          }}
        >
          <span>잔여회원권</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 160,
            padding: "0px 12px",
          }}
        >
          <span>회원권 만료</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 160,
            padding: "0px 12px",
          }}
        >
          <span>최근 출석일</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 160,
            padding: "0px 12px",
          }}
        >
          <span>회원종류</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
        <div
          style={{
            gap: 8,
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            width: 160,
            padding: "0px 12px",
          }}
        >
          <span>회원등급</span>
          <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
        </div>
      </div>
      {/* 데이터 */}
      {data.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              backgroundColor: "white",
              padding: "16px 10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderBottom: "1px solid #DDE1E6",
              borderBottomLeftRadius: data.length - 1 === i ? 20 : 0,
              borderBottomRightRadius: data.length - 1 === i ? 20 : 0,
            }}
          >
            <div style={{ display: "flex", padding: "0px 12px" }}>
              <input type="checkbox" />
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 140,
                maxWidth: 140,
                padding: "0px 12px",
                justifyContent: "flex-start",
              }}
            >
              <div className={style.loginUserInfoImgWrap}>
                <Image
                  src={"/images/skeleton-user.svg"}
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: "140%",
                }}
              >
                {item.name}
              </span>
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 140,
                maxWidth: 140,
                padding: "0px 12px",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                  lineHeight: "140%",
                }}
              >
                {item.location}
              </span>
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 160,
                maxWidth: 160,
                padding: "0px 12px",
              }}
            >
              <span>{renderMemberships(item.memberships)}</span>
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 160,
                maxWidth: 160,
                padding: "0px 12px",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                  lineHeight: "140%",
                }}
              >
                {formatDate(item.expiredMembership)}
              </span>
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 160,
                maxWidth: 160,
                padding: "0px 12px",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                  lineHeight: "140%",
                }}
              >
                {formatDate(item.latestAttended)}
              </span>
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 160,
                maxWidth: 160,
                padding: "0px 12px",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#303030",
                  lineHeight: "140%",
                  padding: "1px 10px",
                  borderRadius: 10,
                  backgroundColor: getStatusColor(item.type),
                }}
              >
                {item.type}
              </span>
            </div>
            <div
              style={{
                gap: 8,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                minWidth: 160,
                maxWidth: 160,
                padding: "0px 12px",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "##303030",
                  lineHeight: "140%",
                  padding: "1px 10px",
                  borderRadius: 10,
                  backgroundColor: getStatusColor(item.level),
                }}
              >
                {item.level}
              </span>
            </div>
          </div>
        );
      })}
    </div>
    // <table border="1" style={{ width: "100%", textAlign: "center" }}>
    //   <thead>
    //     <tr>
    //       <th>회원명</th>
    //       <th>지점</th>
    //       <th>잔여회원권</th>
    //       <th>회원권 만료</th>
    //       <th>최근 출석일</th>
    //       <th>회원종류</th>
    //       <th>회원등급</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((item, index) => (
    //       <tr key={index}>
    //         <td>{item.name}</td>
    //         <td>{item.location}</td>
    //         <td>{renderMemberships(item.memberships)}</td>
    //         <td>{formatDate(item.expiredMembership)}</td>
    //         <td>{formatDate(item.latestAttended)}</td>
    //         <td style={{ color: getStatusColor(item.type) }}>{item.type}</td>
    //         <td>{item.level}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
}
