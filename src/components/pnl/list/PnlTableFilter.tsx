"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import styles from "../../../styles/userDashboard.module.css";

import { useGlobalStore } from "../../../store/globalStore";
import {
  formatDate,
  getPreviousDate,
  getPreviousMonth,
} from "../../../app/main/users/utils";
import { IPnlTableData } from "../../../types/pnl";
import Image from "next/image";
import EmptyArea from "../../EmptyArea";

export default function PnlTableFilter({
  setDashboard,
  setReady,
}: {
  setDashboard: (list: IPnlTableData[]) => void;
  setReady: Dispatch<SetStateAction<boolean>>;
}) {
  const emptyList = ["1일", "1주", "1달"];
  const location = useGlobalStore((state) => state.selectLocation);
  const [selectCard, setSelectCard] = useState(1);
  const [startDate, setStartDate] = useState(getPreviousDate(new Date(), 7));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [search, setSearch] = useState("");

  const clickCardAction = (i: number) => () => {
    const newDate = new Date();
    setSelectCard(i);
    if (i === 0) {
      setStartDate(getPreviousDate(newDate, 1));
      setEndDate(formatDate(newDate));
    }
    if (i === 1) {
      setStartDate(getPreviousDate(newDate, 7));
      setEndDate(formatDate(newDate));
    }
    if (i === 2) {
      setStartDate(getPreviousMonth(newDate));
      setEndDate(formatDate(newDate));
    }
  };

  const req = useCallback(
    async (startRangeDate: string, endRangeDate: string) => {
      setReady(false);
      console.log("리스트 데이터 변경");
      const reqParams = {
        location,
        startRangeDate,
        endRangeDate,
      };
      const queryString = new URLSearchParams(reqParams).toString();
      console.log(queryString);
      const res = await fetch(`/api/pnl/profit?${queryString}`);
      const data = await res.json();
      setDashboard(data);
      setReady(true);
    },
    [location, setDashboard, setReady]
  );

  return (
    <div
      className={styles.filterWrapper}
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className={styles.filterDateCard}
        style={{ backgroundColor: "white" }}
      >
        {emptyList.map((item, i) => {
          return (
            <div
              key={item}
              className={styles.filterCard}
              onClick={clickCardAction(i)}
              style={{
                backgroundColor: i === selectCard ? "#F5F5F5" : "white",
                border:
                  i === selectCard
                    ? "1px solid var(--Border-Default-Default, #D9D9D9)"
                    : "",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#697077",
                  minWidth: 27,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={styles.filterCalendarCard}
        style={{ backgroundColor: "white" }}
      >
        <input
          style={{
            border: "none",
            outline: "none",
          }}
          type="date"
          value={startDate}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setSelectCard(-1);
            setStartDate(value);
          }}
        />
      </div>
      <div
        className={styles.filterCalendarCard}
        style={{ backgroundColor: "white" }}
      >
        <input
          style={{
            outline: "none",
            border: "none",
          }}
          type="date"
          value={endDate}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setSelectCard(-1);
            setEndDate(value);
          }}
        />
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
            req(startDate, endDate);
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
  );
}
