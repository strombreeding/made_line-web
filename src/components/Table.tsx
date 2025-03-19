"use client";

import Image from "next/image";
import styles from "../styles/Table.module.css";
import { useGlobalStore } from "../store/globalStore";
import { useUserStore } from "../store/userStore";
import { useEffect, useState } from "react";

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
  const location = useGlobalStore((state) => state.selectLocation);
  const { filters, specialOrder } = useUserStore((state) => state);
  const [obj, setObj] = useState({
    totalPage: new Array(10).fill(0).map((_, i) => i + 1),
    currentPage: 1,
  });

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

  useEffect(() => {
    console.log("필터가 변경됩니다.");
  }, [location, filters, obj.currentPage]);

  return (
    <div>
      <div
        onClick={() => {
          alert(`
        ${location}
        ${specialOrder}
        ${JSON.stringify(filters, null, 2)}
      `);
        }}
      >
        필터
      </div>

      <div className={styles.tableWrapper}>
        {/* 헤더 */}
        <div className={styles.tableHeader}>
          <div style={{ display: "flex", padding: "0px 12px" }}>
            <input type="checkbox" />
          </div>
          <div className={styles.tableHeaderColumn140}>
            <span>회원명</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn140}>
            <span>지점</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>잔여회원권</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>회원권 만료</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>최근 출석일</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>회원종류</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
          <div className={styles.tableHeaderColumn160}>
            <span>회원등급</span>
            <Image src="/images/arrow-down.svg" alt="" width={16} height={16} />
          </div>
        </div>
        {/* 데이터 */}
        {data.map((item, i) => {
          return (
            <div
              className={styles.tableBodyWrapper}
              key={i}
              style={{
                borderBottomLeftRadius: data.length - 1 === i ? 20 : 0,
                borderBottomRightRadius: data.length - 1 === i ? 20 : 0,
              }}
            >
              <div style={{ display: "flex", padding: "0px 12px" }}>
                <input type="checkbox" />
              </div>
              <div className={styles.tableBodyColumn140}>
                <div className={styles.loginUserInfoImgWrap}>
                  <Image
                    src={"/images/skeleton-user.svg"}
                    alt=""
                    width={32}
                    height={32}
                  />
                </div>
                <span className={styles.tableBodyColumnText1}>{item.name}</span>
              </div>
              <div className={styles.tableBodyColumn140}>
                <span className={styles.tableBodyColumnText2}>
                  {item.location}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span>{renderMemberships(item.memberships)}</span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {formatDate(item.expiredMembership)}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span className={styles.tableBodyColumnText2}>
                  {formatDate(item.latestAttended)}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span
                  className={styles.tableBodyColumnBadge1}
                  style={{
                    backgroundColor: getStatusColor(item.level),
                  }}
                >
                  {item.type}
                </span>
              </div>
              <div className={styles.tableBodyColumn160}>
                <span
                  className={styles.tableBodyColumnBadge1}
                  style={{
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
      <div
        style={{
          paddingTop: 24,
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
          onClick={() => {
            setObj((prev) => ({
              ...prev,
              currentPage: 1,
            }));
          }}
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
          {obj.totalPage.map((index) => {
            return (
              <div
                key={index}
                style={{
                  padding: "12px 16px",
                  borderRadius: 30,
                  backgroundColor:
                    index === obj.currentPage ? "#E3E3E3" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setObj((prev) => ({ ...prev, currentPage: index }));
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
            setObj((prev) => ({
              ...prev,
              currentPage: prev.totalPage.length,
            }));
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
