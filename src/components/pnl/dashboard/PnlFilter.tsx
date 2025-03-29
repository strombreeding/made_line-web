"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../../../styles/userDashboard.module.css";

import { useGlobalStore } from "../../../store/globalStore";
import {
  formatDate,
  getPreviousDate,
  getPreviousMonth,
} from "../../../app/main/users/utils";
import { PnlDashboardData } from "../../../types/pnl";
import { pnlDashboardData } from "../../../data/pnl/pnlDashboardData";

export default function PnlTableFilter({
  setDashboard,
  setReady,
}: {
  setDashboard: Dispatch<SetStateAction<PnlDashboardData>>;
  setReady: Dispatch<SetStateAction<boolean>>;
}) {
  const emptyList = ["1일", "1주", "1달"];
  const location = useGlobalStore((state) => state.selectLocation);
  const [selectCard, setSelectCard] = useState(1);
  const [startDate, setStartDate] = useState(getPreviousDate(new Date(), 7));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

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
      console.log("대시보드 데이터 변경");
      const reqParams = {
        location,
        startRangeDate,
        endRangeDate,
      };
      const queryString = new URLSearchParams(reqParams).toString();
      console.log(queryString);
      const res = pnlDashboardData;
      setDashboard(res);
      setReady(true);
    },
    [location, setDashboard, setReady]
  );

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      req(startDate, endDate);
    }
  }, [startDate, endDate, req]);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterDateCard}>
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
      <div className={styles.filterCalendarCard}>
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
      <div className={styles.filterCalendarCard}>
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
    </div>
  );
}
