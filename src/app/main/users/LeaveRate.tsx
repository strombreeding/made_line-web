"use client";

import styles from "../../../styles/userDashboard.module.css";
import { RateChart } from "../../../types/users";

export default function LeaveRate({
  leaveRateCharts,
}: {
  leaveRateCharts: RateChart[];
}) {
  const maxValue = leaveRateCharts.sort((a, b) => b.value - a.value)[0].value;

  const useList = leaveRateCharts.map((value) => {
    // 실제 픽셀 높이 계산 (선택적)
    const pixelHeight = (value.value / maxValue) * 90;

    return {
      title: value.title,
      value: value.value,
      pixelHeight: Math.round(pixelHeight) + "px",
    };
  });

  return (
    <div className={styles.leaveRateWrapper}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "#697077",
            marginBottom: 5,
          }}
        >
          {useList[0].title}
        </span>
        <span
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#21272A",
            marginBottom: 20,
          }}
        >
          {useList[0].value}%
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            height: "100%",
          }}
        >
          {useList.map((item, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 137,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                key={i}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    boxShadow: "2px 2px 3px 0px #00000040",
                    backgroundColor: "#FECE8C",
                    borderRadius: 5,
                    height: item.pixelHeight, // 최대가 90 px
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      backgroundColor: "#ECEAF8",
                      padding: "14px 7px",
                      borderRadius: 100,
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: "100%",
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: "100%",
                    marginTop: 8,
                    color: "#767676",
                  }}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
