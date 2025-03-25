"use client";

import Image from "next/image";
import styles from "../../../styles/Table.module.css";
import { useGlobalStore } from "../../../store/globalStore";
import { useUserStore } from "../../../store/userStore";
import { useEffect, useState } from "react";
import { IUserListProps } from "../../../types";

export default function UserTable() {
  const {
    findUserList,
    setFindUserList,
    setPageInfo,
    pageInfo,
    setSelectedUserId,
  } = useUserStore((state) => state);
  const { selectLocation, setSelectedTab } = useGlobalStore((state) => state);

  const [selectedUsers, setSelectedUsers] = useState([] as string[]);
  const [selectToggle, setSelectToggle] = useState(false);

  // 필터 추가시 req 할때 함께 보낼것
  // const location = useGlobalStore((state) => state.selectLocation);
  // const { filters, specialOrder } = useUserStore((state) => state);

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
    if (diffTime * -1 > 30) {
      return "+30일 경과";
    }
    return `${diffTime * -1}일 전`;
  };

  const formatDateLatest = (date: string) => {
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

  // 새로고침 막기 변수
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };

  const req = async (locationFilter = false) => {
    const res = await fetch("/api/users/profile");
    const data = await res.json();
    if (locationFilter) {
      if (selectLocation === "전체지점") {
        setFindUserList(data);
      } else {
        const newList = data.filter(
          (user: IUserListProps) => user.location === selectLocation
        );
        setFindUserList(newList);
      }
    } else {
      setFindUserList(data);
    }
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  useEffect(() => {
    req(true);
  }, [selectLocation]);

  const preventGoBack = () => {
    history.pushState(null, "", window.location.href);
    alert("종료하기를 눌러주세요 :D");
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", preventGoBack);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  useEffect(() => {
    req();
  }, []);

  return (
    <div>
      <div className={styles.tableWrapper}>
        {/* 헤더 */}
        <div className={styles.tableHeader}>
          <div style={{ display: "flex", padding: "0px 12px" }}>
            <input
              type="checkbox"
              checked={selectToggle}
              onChange={() => {
                if (selectToggle) {
                  const copy = [...selectedUsers];
                  const removedNowUserIds = copy.filter((id) => {
                    const exitsId = findUserList.find((user) => user.id === id);
                    return !exitsId;
                  });
                  setSelectedUsers(removedNowUserIds);
                } else {
                  const setList = new Set(findUserList.map((user) => user.id));
                  const newList = Array.from(setList);
                  setSelectedUsers(newList);
                }
                setSelectToggle(!selectToggle);
              }}
            />
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
        {findUserList.length === 0 && (
          <div
            className={styles.tableBodyWrapper}
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 40,
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                }}
              >
                다른 이름으로 검색해보시겠어요?
              </span>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#121619",
                }}
              >
                일치하는 회원 정보가 없습니다.
              </span>
            </div>
          </div>
        )}
        {/* 데이터 */}
        {findUserList.map((item, i) => {
          return (
            <div
              className={styles.tableBodyWrapper}
              key={i}
              style={{
                borderBottomLeftRadius: findUserList.length - 1 === i ? 20 : 0,
                borderBottomRightRadius: findUserList.length - 1 === i ? 20 : 0,
              }}
            >
              <div style={{ display: "flex", padding: "0px 12px" }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(item.id)}
                  onChange={() => {
                    const copyIds = [...selectedUsers];
                    const exist = copyIds.includes(item.id);
                    if (exist) {
                      const idx = copyIds.findIndex((id) => id === item.id);
                      copyIds.splice(idx, 1);
                    } else {
                      copyIds.push(item.id);
                    }
                    setSelectedUsers(copyIds);
                  }}
                />
              </div>
              <div
                onClick={() => {
                  setSelectedUserId(item.id);
                  setSelectedTab("회원상세정보");
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div className={styles.tableBodyColumn140}>
                  <div className={styles.loginUserInfoImgWrap}>
                    <Image
                      src={"/images/skeleton-user.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className={styles.tableBodyColumnText1}>
                    {item.name}
                  </span>
                </div>
                <div className={styles.tableBodyColumn140}>
                  <span className={styles.tableBodyColumnText2}>
                    {item.location}
                  </span>
                </div>
                <div className={styles.tableBodyColumn160}>
                  <span>{renderMemberships(item.membership.memberships)}</span>
                </div>
                <div className={styles.tableBodyColumn160}>
                  <span className={styles.tableBodyColumnText2}>
                    {formatDate(item.membership.expirationDate)}
                  </span>
                </div>
                <div className={styles.tableBodyColumn160}>
                  <span className={styles.tableBodyColumnText2}>
                    {formatDateLatest(item.attendance.lastAttended)}
                  </span>
                </div>
                <div className={styles.tableBodyColumn160}>
                  <span
                    className={styles.tableBodyColumnBadge1}
                    style={{
                      backgroundColor: getStatusColor(item.membership.type),
                    }}
                  >
                    {item.membership.type}
                  </span>
                </div>
                <div className={styles.tableBodyColumn160}>
                  <span
                    className={styles.tableBodyColumnBadge1}
                    style={{
                      backgroundColor: getStatusColor(item.membership.level),
                    }}
                  >
                    {item.membership.level}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 페이지네이션 */}
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
          onClick={async () => {
            await req();

            setPageInfo({
              ...pageInfo,
              currentPage: 1,
            });
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
                onClick={async () => {
                  // 현재 페이지 + 필터기반 페이지 요청 후 set하기

                  await req();
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
          onClick={async () => {
            await req();
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

      {/* 버튼들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            borderRadius: 10,
            padding: "16px 12px",
            backgroundColor: "#900B09",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            alert("신규등록");
          }}
        >
          <Image src="/images/insert.svg" alt="" width={20} height={20} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              minWidth: 90,
              textAlign: "center",
            }}
          >
            신규 등록
          </span>
        </div>
        <div
          style={{
            borderRadius: 10,
            padding: "16px 12px",
            backgroundColor: "#900B09",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            alert("알림톡 발송");
          }}
        >
          <Image src="/images/send.svg" alt="" width={20} height={20} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              minWidth: 90,
              textAlign: "center",
            }}
          >
            알림톡 발송
          </span>
        </div>
      </div>
    </div>
  );
}
