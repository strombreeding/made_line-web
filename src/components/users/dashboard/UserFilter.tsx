"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../../../styles/userDashboard.module.css";
import { IUserDashboardData } from "../../../types/users";
import { userDashboardData } from "../../../data/users/userDashboard.mock";
import { useGlobalStore } from "../../../store/globalStore";
import {
  formatDate,
  getPreviousDate,
  getPreviousMonth,
} from "../../../app/main/users/utils";

const dateFormat = (date: string) => {
  return date.replaceAll("-", ".");
};

export default function UserFilter({
  setDashboard,
  setReady,
}: {
  setDashboard: Dispatch<SetStateAction<IUserDashboardData>>;
  setReady: Dispatch<SetStateAction<boolean>>;
}) {
  const emptyList = ["1일", "1주", "1달"];
  const location = useGlobalStore((state) => state.selectLocation);
  const [selectCard, setSelectCard] = useState(1);
  const [startDate, setStartDate] = useState(getPreviousDate(new Date(), 7));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [startDisplayDate, setStartDisplayDate] = useState(
    dateFormat(getPreviousDate(new Date(), 7))
  );
  const [endDisplayDate, setEndDisplayDate] = useState(
    dateFormat(formatDate(new Date()))
  );

  const clickCardAction = (i: number) => () => {
    const newDate = new Date();
    setSelectCard(i);
    if (i === 0) {
      setStartDate(getPreviousDate(newDate, 1));
      setEndDate(formatDate(newDate));
      setStartDisplayDate(dateFormat(getPreviousDate(newDate, 1)));
      setEndDisplayDate(dateFormat(formatDate(newDate)));
    }
    if (i === 1) {
      setStartDate(getPreviousDate(newDate, 7));
      setEndDate(formatDate(newDate));
      setStartDisplayDate(dateFormat(getPreviousDate(newDate, 7)));
      setEndDisplayDate(dateFormat(formatDate(newDate)));
    }
    if (i === 2) {
      setStartDate(getPreviousMonth(newDate));
      setEndDate(formatDate(newDate));
      setStartDisplayDate(dateFormat(getPreviousMonth(newDate)));
      setEndDisplayDate(dateFormat(formatDate(newDate)));
    }
  };

  const changeDisplayDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<string>>,
    setDisplayState: Dispatch<SetStateAction<string>>,
    setCard: Dispatch<SetStateAction<number>>
  ) => {
    let value = e.target.value;

    // 1. 숫자와 단일 마침표만 허용하고 연속된 마침표 제거
    value = value.replace(/\.{2,}/g, "."); // 연속된 마침표를 하나로
    value = value.replace(/[^\d.]/g, "");

    // 최대 2개의 마침표만 허용
    const dots = value.match(/\./g)?.length || 0;
    if (dots > 2) {
      value = value.slice(0, value.lastIndexOf("."));
    }

    // 4. YYYY.MM.DD 형식 체크 및 제한
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // 자동으로 . 추가
    if (value.length === 4 && !value.includes(".")) {
      value = value + ".";
    } else if (value.length === 7 && value.split(".").length === 2) {
      value = value + ".";
    }

    // 5. 두 가지 형식으로 저장
    setDisplayState(value);

    // YYYY.MM.DD 형식이 완성된 경우에만 setStartDate 호출
    if (value.length === 10 && value.split(".").length === 3) {
      const dateFormatted = value.replace(/\./g, "-");
      setState(dateFormatted);
      setCard(-1);
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
      const res = userDashboardData;
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
          type="text"
          placeholder="YYYY.MM.DD"
          value={startDisplayDate}
          className={styles.filterCalendarCardInput}
          onChange={(e) =>
            changeDisplayDate(
              e,
              setStartDate,
              setStartDisplayDate,
              setSelectCard
            )
          }
        />
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
            setStartDisplayDate(dateFormat(value));
          }}
        />
      </div>
      <div className={styles.filterCalendarCard}>
        <input
          type="text"
          placeholder="YYYY.MM.DD"
          value={endDisplayDate}
          className={styles.filterCalendarCardInput}
          onChange={(e) =>
            changeDisplayDate(e, setEndDate, setEndDisplayDate, setSelectCard)
          }
        />
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
            setEndDisplayDate(dateFormat(value));
          }}
        />
      </div>
    </div>
  );
}
