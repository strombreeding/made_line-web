"use client";
import React, { useEffect, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "@/styles/DonutChart.module.css";

// 도넛그래프의 라벨만들기
const RenderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
}) => {
  const RADIAN = Math.PI / 180;

  const radius = outerRadius * 1; // 라벨을 바깥쪽으로 이동
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <foreignObject x={x - 25} y={y - 21} width="48" height="48">
        <div
          style={{
            backgroundColor: "#ECEAF8",
            borderRadius: "100px",
            padding: "14px 7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </div>
      </foreignObject>
    </g>
  );
};

// 도넛차트
function DonutChart({
  title,
  itemList,
  isDonut = true,
}: {
  title: string;
  itemList: { name: string; value: number; color: string }[];
  isDonut?: boolean;
}) {
  const refs = useRef<SVGElement | null>(null);

  const total = itemList.reduce((acc, item) => acc + item.value, 0);
  const data = itemList.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));
  const colors = itemList.map((item) => item.color);

  const people = itemList.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    if (refs.current) {
      console.log(refs.current.clientHeight, "힝구");
    }
  }, []);

  return (
    <div className={styles.itemFrame}>
      <span className={styles.title}>{title}</span>
      <span className={styles.content}>
        {people < 1000 ? people : `${(people / 1000).toFixed(1)}k`}명
      </span>
      <PieChart
        style={{ marginTop: -10, marginBottom: -15 }}
        width={300}
        height={280}
      >
        <Pie
          animationDuration={300}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={isDonut ? 0 : 60} // 중간 빈공간
          // innerRadius={70}
          outerRadius={100}
          dataKey="value"
          // paddingAngle={0}
          labelLine={false}
          label={RenderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell ref={refs} key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        {/* <Legend /> */}
      </PieChart>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {itemList.map((item, i) => {
          return (
            <div key={item.name + i.toString()} className={styles.itemWrapper}>
              <div className={styles.colorAndText}>
                <div
                  className={styles.radiusColor}
                  style={{ backgroundColor: item.color }}
                />
                <span className={styles.itemName}>{item.name}</span>
              </div>
              <span className={styles.itemValue}>
                {item.value.toLocaleString()}명
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DonutChart;
