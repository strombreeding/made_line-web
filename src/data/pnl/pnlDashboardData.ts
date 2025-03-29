import { PnlDashboardData } from "../../types/pnl";

export const pnlDashboardData: PnlDashboardData = {
  programSales: [
    { name: "바이브테라피", value: 15000000, color: "#72BAFB" },
    { name: "바이브핏", value: 12000000, color: "#A5D1FF" },
    { name: "포톤테라피", value: 8000000, color: "#D0E8FF" },
  ],
  purchase: [
    { name: "마케팅비", value: 15000000, color: "#E0DFFE" },
    { name: "인건비", value: 12000000, color: "#C2BCFB" },
    { name: "운영비", value: 8000000, color: "#958FFC" },
  ],
  firstItems: [
    {
      number: 11930000,
      percent: 10,
      title: "매출",
      subTitle: "회원권+상품 매출",
    },
    {
      number: 3000000,
      percent: 10,
      title: "영업이익",
      subTitle: "매출 - 비용",
    },
  ],
  secondItems: [
    { number: 11930000, percent: 10, title: "회원권 매출", subTitle: "" },
    { number: 11930000, percent: 10, title: "회원권 사용금액", subTitle: "" },
    {
      number: 3000000,
      percent: 10,
      title: "선수금",
      subTitle: "회원권 매출-회원권 사용금액",
    },
  ],
  tableList: [
    {
      type: "회원권",
      profit: 10000000,
      sales: 11930000,
      purchase: 11930000,
      refund: 3000000,
    },
    {
      type: "상품",
      profit: 10000000,
      sales: 11930000,
      purchase: 11930000,
      refund: 3000000,
    },
  ],
};
