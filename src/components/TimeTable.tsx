"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/TimeTable.module.css";

export default function TimeTable() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [savedSchedules, setSavedSchedules] = useState<
    {
      title: string;
      cells: string[];
    }[]
  >([]);
  const [dragMode, setDragMode] = useState<string | null>(null); // 'select' 또는 'deselect' 모드

  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const hours = [];

  // 9시부터 23시까지 30분 단위로 시간 생성
  for (let hour = 9; hour <= 23; hour++) {
    hours.push(`${hour}:00`);
    hours.push(`${hour}:30`);
  }

  // 휴무 시간 확인 함수
  const isClosedTime = (day: string, time: string) => {
    // 화요일 전체가 휴무
    if (day === "수") {
      return true;
    }

    // 13~14시는 휴무
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 13 && hour < 14) {
      return true;
    }

    return false;
  };

  const handleMouseDown = (day: string, time: string) => {
    // 휴무 시간이면 아무 동작도 하지 않음
    if (isClosedTime(day, time)) {
      return;
    }

    setIsMouseDown(true);
    const cellId = `${day}-${time}`;

    // 클릭한 셀이 이미 선택되어 있는지 확인
    if (selectedCells.includes(cellId)) {
      // 이미 선택된 셀이면 선택 해제 모드로 설정
      setDragMode("deselect");
      setSelectedCells(selectedCells.filter((id) => id !== cellId));
    } else {
      // 선택되지 않은 셀이면 선택 모드로 설정
      setDragMode("select");
      setSelectedCells([...selectedCells, cellId]);
    }
  };

  const handleMouseOver = (day: string, time: string) => {
    // 휴무 시간이면 아무 동작도 하지 않음
    if (isClosedTime(day, time)) {
      return;
    }

    if (isMouseDown) {
      const cellId = `${day}-${time}`;
      const isSelected = selectedCells.includes(cellId);

      if (dragMode === "select" && !isSelected) {
        // 선택 모드이고 아직 선택되지 않은 셀이면 선택
        setSelectedCells([...selectedCells, cellId]);
      } else if (dragMode === "deselect" && isSelected) {
        // 선택 해제 모드이고 이미 선택된 셀이면 선택 해제
        setSelectedCells(selectedCells.filter((id) => id !== cellId));
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // 드래그 모드 초기화 (다음 드래그를 위해)
    setDragMode(null);
  };

  const saveSelection = () => {
    if (selectedCells.length > 0) {
      const title = prompt("일정 제목을 입력하세요:");
      if (title) {
        setSavedSchedules([
          ...savedSchedules,
          { title, cells: [...selectedCells] },
        ]);
        setSelectedCells([]);
      }
    }
  };

  const clearSelection = () => {
    setSelectedCells([]);
  };

  const getCellSchedule = (day: string, time: string) => {
    const cellId = `${day}-${time}`;
    return savedSchedules.find((schedule) => schedule.cells.includes(cellId));
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const formatTimeLabel = (time: string) => {
    // 시간 레이블 포맷팅 (예: "9:00" -> "9시", "9:30" -> "9시 30분")
    const [hour, minute] = time.split(":");
    return minute === "00" ? `${hour}시` : `${hour}:${minute}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.timetable}>
          <thead>
            <tr>
              <th></th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((time) => (
              <tr key={time}>
                <td className={styles.timeCell}>{formatTimeLabel(time)}</td>
                {days.map((day) => {
                  const cellId = `${day}-${time}`;
                  const isSelected = selectedCells.includes(cellId);
                  const schedule = getCellSchedule(day, time);
                  const isClosed = isClosedTime(day, time);

                  return (
                    <td
                      key={cellId}
                      className={`
                        ${styles.cell} 
                        ${isSelected ? styles.selected : ""}
                        ${schedule ? styles.scheduled : ""}
                        ${time.endsWith(":30") ? styles.halfHour : ""}
                        ${isClosed ? styles.closed : ""}
                      `}
                      onMouseDown={() => handleMouseDown(day, time)}
                      onMouseOver={() => handleMouseOver(day, time)}
                      title={
                        isClosed ? "휴무 시간" : schedule ? schedule.title : ""
                      }
                      style={
                        isClosed
                          ? {
                              backgroundColor: "#f0f0f0",
                              color: "#aaa",
                              cursor: "not-allowed",
                            }
                          : schedule
                          ? { backgroundColor: "#4CAF50", color: "white" }
                          : {}
                      }
                    >
                      {isClosed ? "휴무" : schedule && schedule.title}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.controls}>
        <button onClick={saveSelection} disabled={selectedCells.length === 0}>
          선택 저장
        </button>
        <button onClick={clearSelection} disabled={selectedCells.length === 0}>
          선택 취소
        </button>
      </div>

      <div className={styles.scheduleList}>
        <h3>저장된 일정</h3>
        {savedSchedules.length === 0 ? (
          <p>저장된 일정이 없습니다.</p>
        ) : (
          <ul>
            {savedSchedules.map((schedule, index) => (
              <li key={index}>
                {schedule.title} - {schedule.cells.length}개 시간대 선택됨
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
