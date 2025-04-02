import styles from "@/styles/userDashboard.module.css";
import Image from "next/image";
import { useState } from "react";

interface StickChartProps {
  title: string;
  data: {
    compareName: string; // [평균예약율, 평균출석률, 평균감량률, VIP 회원 수, 이용 회원 수]
    locationList: {
      location: string;
      value: number;
    }[];
  }[];
  maxHeight: number;
}

export default function StickChart({
  title,
  data,
  maxHeight,
}: StickChartProps) {
  const [selectIndex, setSelectIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (data[selectIndex].locationList.length === 0) {
    return (
      <div className={styles.graphWrapper}>
        <span className={styles.stickChartTitle}>{title}</span>
        <span style={{ fontSize: 40, fontWeight: 700 }}>데이터 없음</span>
      </div>
    );
  }

  const sortedData = data[selectIndex].locationList.sort(
    (a, b) => b.value - a.value
  );

  const maxValue = sortedData[0].value;

  const useList = data[selectIndex].locationList.map((value) => {
    // 실제 픽셀 높이 계산 (선택적)
    const pixelHeight = (value.value / maxValue) * maxHeight;

    return {
      value: value.value,
      locationName: value.location.split(" "),
      pixelHeight: Math.round(pixelHeight) + "px",
    };
  });

  return (
    <div className={styles.graphWrapper}>
      <span className={styles.stickChartTitle}>{title}</span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={styles.stickChartDropdown}
        >
          <span className={styles.stickChartDropdownText}>
            {data[selectIndex].compareName}
          </span>
          <Image src="/images/chevron-down.svg" alt="" width={24} height={24} />
          {open && (
            <div className={styles.stickChartDropdownOpen}>
              {data.map((item, i) => {
                return (
                  <div
                    className={styles.stickChartDropdownOpenItem}
                    onClick={() => {
                      setSelectIndex(i);
                      setOpen(false);
                    }}
                    key={item.compareName}
                  >
                    <span
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#21272A",
                      }}
                    >
                      {item.compareName}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={styles.stickChartWrapper}>
        {useList.map((item, i) => {
          console.log(item.pixelHeight);
          return (
            <div key={i} className={styles.stickChartRowWrapper}>
              <div className={styles.stickChartAbsoluteItem}>
                <span>{item.value}</span>
              </div>
              <div
                className={styles.stickChart}
                style={{ height: item.pixelHeight }}
              />

              <span className={styles.stickChartBottomText}>
                {item.locationName[0]}
              </span>
              <span className={styles.stickChartBottomText}>
                {item.locationName[1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
