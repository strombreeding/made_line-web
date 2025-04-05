"use client";

import EmptyArea from "@/components/EmptyArea";
import React from "react";
import {
  // BarChart,
  Bar,
  // LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  ComposedChart,
} from "recharts";

const itemList = [
  { key: "1월", 매출: 48, 영업이익: 52, 선수금비율: 26 },
  { key: "2월", 매출: 60, 영업이익: 30, 선수금비율: 56 },
  { key: "3월", 매출: 120, 영업이익: 40, 선수금비율: 78 },
  { key: "4월", 매출: 70, 영업이익: 50, 선수금비율: 20 },
  { key: "5월", 매출: 20, 영업이익: 80, 선수금비율: 30 },
  { key: "6월", 매출: 30, 영업이익: 70, 선수금비율: 40 },
  { key: "7월", 매출: 40, 영업이익: 60, 선수금비율: 50 },
  { key: "8월", 매출: 50, 영업이익: 50, 선수금비율: 60 },
  { key: "9월", 매출: 60, 영업이익: 40, 선수금비율: 70 },
  { key: "10월", 매출: 70, 영업이익: 30, 선수금비율: 80 },
  { key: "11월", 매출: 80, 영업이익: 20, 선수금비율: 90 },
  { key: "12월", 매출: 90, 영업이익: 10, 선수금비율: 10 },
];

// ComposedChart를 사용하여 막대그래프와 꺾은선 그래프를 결합
const CombinedGraph = () => {
  // itemList에서 매출과 영업이익 중 가장 큰 값을 찾습니다.
  const maxValue = Math.max(
    ...itemList.map((item) => Math.max(item.매출, item.영업이익))
  );
  // 데이터 변환 (선수금 비율을 기반으로 꺾은선 그래프 높이를 계산)
  const processedData = itemList.map((item) => ({
    ...item,
    선수금높이: (item.매출 * item.선수금비율) / 100,
  }));

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flex: 2,
        alignItems: "center",
        flexDirection: "column",
        height: 447,
        // width: 500,
        // height: 447,
        padding: "22px 30px 40px 30px",
        boxShadow: "0px 0px 4px 0px #00000040",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 400, color: "#697077" }}>
          지난 1년
        </span>
        <span style={{ fontSize: 24, fontWeight: 700 }}>전체 매출 현황</span>
      </div>
      <ComposedChart
        // width={screenWidth * 0.3}
        height={280}
        width={430}
        // height={280}
        data={processedData}
        margin={{
          top: 50,
          left: -35,
        }}
      >
        <XAxis
          fontSize={10}
          tickLine={false}
          axisLine={false}
          stroke="#767676"
          dataKey="key"
          label={{ value: "", position: "bottom" }}
          interval={0}
        />
        <YAxis
          fontSize={10}
          tickLine={false}
          axisLine={false}
          stroke="#767676"
          domain={[0, maxValue]}
          allowDecimals={false}
          label={{ value: "", angle: -90, position: "left" }}
          interval={0}
          ticks={[0, maxValue / 2, maxValue]}
        />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar
          radius={[10, 10, 0, 0]}
          dataKey="매출"
          barSize={7}
          fill="#5CC3B5"
          name="매출"
        />
        {/* <div style={{ width: 100, height: 110, backgroundColor: 'purple' }} /> */}
        <Bar
          radius={[10, 10, 0, 0]}
          dataKey="영업이익"
          barSize={7}
          fill="#D2EFEB"
          name="영업이익"
        />
        {/* 선수금 높이를 사용하여 Line 그래프를 그림 */}
        <Line
          // type="monotone"
          dataKey="선수금높이"
          stroke="#958FFC"
          name="선수금비율"
          strokeWidth={2}
          dot={false}
        />
        <CartesianGrid stroke="#767676" vertical={false} strokeWidth={0.5} />
      </ComposedChart>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: 430,
          paddingTop: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#5CC3B5",
              borderRadius: 100,
            }}
          />
          <EmptyArea width={5} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#767676" }}>
            영업이익
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#D2EFEB",
              borderRadius: 100,
            }}
          />
          <EmptyArea width={5} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#767676" }}>
            매출
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#958FFC",
              borderRadius: 100,
            }}
          />
          <EmptyArea width={5} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#767676" }}>
            매출 대비 선수금 비율
          </span>
        </div>
      </div>
    </div>
  );
};

export default CombinedGraph;
