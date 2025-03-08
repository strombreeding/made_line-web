'use client';

import React, { useEffect, useRef } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const itemList = [
  { name: '바이브테라피', value: 100 },
  { name: '바이브핏', value: 200 },
  { name: '포톤테라피테라피', value: 300 },
  { name: 'ㅋㅋ', value: 500 },
];

const getRandomBlue = () => {
  const r = Math.floor(Math.random() * 60 + 114); // 114~208 사이의 랜덤 값
  const g = Math.floor(Math.random() * 0 + 210); // 186~232 사이의 랜덤 값
  const b = Math.floor(Math.random() * 0 + 255); // 251~255 사이의 랜덤 값

  return `rgb(${r}, ${g}, ${b})`;
};

const total = itemList.reduce((acc, item) => acc + item.value, 0);
const data = itemList.map((item) => ({
  ...item,
  percentage: ((item.value / total) * 100).toFixed(1),
}));
const colors = itemList.map(() => getRandomBlue());

const RADIAN = Math.PI / 180;
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
  const radius = outerRadius * 1.1; // 라벨을 바깥쪽으로 이동
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <foreignObject x={x - 25} y={y - 21} width="48" height="48">
        <div
          style={{
            backgroundColor: '#ECEAF8',
            borderRadius: '100px',
            padding: '14px 7px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <text x={0} y={0} fill="white" textAnchor="middle" dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        </div>
      </foreignObject>
    </g>
  );
};

function DonutChart() {
  const refs = useRef<SVGElement | null>(null);

  useEffect(() => {
    if (refs.current) {
      console.log(refs.current.clientHeight, '힝구');
    }
  }, []);

  return (
    <div
      style={{ pointerEvents: 'none' }}
      className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white "
    >
      <h3 className="text-lg font-semibold">프로그램별 매출</h3>
      <PieChart width={350} height={400}>
        <Pie
          animationDuration={0}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          // innerRadius={70}
          outerRadius={100}
          dataKey="value"
          paddingAngle={1}
          labelLine={false}
          label={RenderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell ref={refs} key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        {/* <Legend /> */}
      </PieChart>
    </div>
  );
}

export default DonutChart;
