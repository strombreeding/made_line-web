"use client";

import Image from "next/image";
import EmptyArea from "./EmptyArea";
import { useGlobalStore } from "@/store/globalStore";
import { useState } from "react";
import style from "../styles/Header.module.css";
import { mockUsers } from "../data/users/user.mock";
import { useUserStore } from "../store/userStore";

export default function Header() {
  const {
    title,
    selectLocation,
    setSelectLocation,
    locations,
    currentTabs,
    selectedTab,
    setSelectedTab,
  } = useGlobalStore((state) => state);
  const { setFindUserList } = useUserStore((state) => state);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchAction = () => {
    if (title === "회원관리") {
      // 전체회원정보 API를 search값으로 검색한 값을 set해준다.
      // page도 받아와야할듯 하다.
      const res = mockUsers.filter((user) => user.name === search);
      setFindUserList(res);
    }
  };

  return (
    <div className={style.wrapper}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "start" }}
      >
        <span className={style.title}>{title}</span>
        <EmptyArea width={20} />
        <div
          className={style.locationSelect}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className={style.locationSelectText}>{selectLocation}</span>
          <EmptyArea width={8} />
          <Image
            src={isOpen ? "/images/chevron-up.svg" : "/images/chevron-down.svg"}
            alt=""
            width={24}
            height={24}
          />
          {isOpen && (
            <div className={style.locationSelectList}>
              {locations.map((location, i) => {
                return (
                  <div
                    style={{
                      padding: "13px 16px",
                      borderTop:
                        i === 0
                          ? "none"
                          : "1px solid var(--Border-Default-Default, #D9D9D9)",
                      borderBottom:
                        "1px solid var(--Border-Default-Default, #D9D9D9)",
                    }}
                    key={i}
                    onClick={() => setSelectLocation(location)}
                  >
                    <span
                      className={style.locationSelectListText}
                      style={{ fontWeight: i === 0 ? 700 : 400 }}
                    >
                      {location}
                    </span>
                  </div>
                );
              })}
              <div
                style={{
                  padding: "13px 16px",
                  borderTop: "1px solid var(--Border-Default-Default, #D9D9D9)",
                }}
                onClick={() => alert("지점추가 함수")}
              >
                <span
                  className={style.locationSelectListText}
                  style={{ fontWeight: 700 }}
                >
                  + 지점추가
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <EmptyArea height={24} />

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
          {currentTabs.map((tab, i) => {
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "1px solid #C1C7CD",
            borderRadius: 25,
            padding: "13px 16px",
            backgroundColor: "#FFFFFF",
            cursor: "pointer",
            marginBottom: -4,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => alert(search)}
          >
            <Image src="/images/search.svg" alt="" width={24} height={24} />
          </div>
          <EmptyArea width={8} />
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              searchAction();
            }}
          >
            <input
              type="text"
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "#697077",
                width: 114,
                maxWidth: 114,
                border: "none",
                outline: "none",
              }}
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
