import { IUserDashboardData } from "../../types/users";

export const userDashboardData: IUserDashboardData = {
  totalMemberCharts: [
    { name: "이용회원", value: 200, color: "#5CC3B5" },
    { name: "종료회원", value: 100, color: "#8ED6CB" },
    { name: "체험회원", value: 20, color: "#D2EFEB" },
  ],
  totalUsedMemberCharts: [
    { name: "신규 회원", value: 100, color: "#FFCFE0" },
    { name: "재등록 회원", value: 200, color: "#FEA6C1" },
    { name: "VIP 회원", value: 10, color: "#FF74A4" },
  ],
  firstItems: [
    { number: 5000, title: "감량율 평균 미달" },
    { number: 5000, title: "2주 미방문" },
    { number: 5000, title: "장기 미방문" },
  ],
  secondItems: [
    { number: 5000, title: "회원권 종료 임박" },
    { number: 5000, title: "최근 회원권 종료" },
    { number: 5000, title: "VIP 회원" },
  ],
  leaveRateCharts: [
    {
      title: "이탈율",
      value: 10,
    },
    {
      title: "유지율",
      value: 20,
    },
  ],
  locationRateCharts: [
    {
      compareName: "평균예약율",
      locationList: [
        {
          location: "의정부 가능점",
          value: 300,
        },
        {
          location: "남양주 다산점",
          value: 200,
        },
        {
          location: "파주 운정점",
          value: 150,
        },
        {
          location: "양주 옥정점",
          value: 100,
        },
      ],
    },
    {
      compareName: "평균출석률",
      locationList: [
        {
          location: "의정부 가능점",
          value: 5,
        },
        {
          location: "남양주 다산점",
          value: 4,
        },
        {
          location: "파주 운정점",
          value: 3,
        },
        {
          location: "양주 옥정점",
          value: 2,
        },
      ],
    },
    {
      compareName: "평균감량률",
      locationList: [
        {
          location: "의정부 가능점",
          value: 1,
        },
        {
          location: "남양주 다산점",
          value: 2,
        },
        {
          location: "파주 운정점",
          value: 3,
        },
        {
          location: "양주 옥정점",
          value: 4,
        },
      ],
    },
    {
      compareName: "VIP 회원 수",
      locationList: [
        {
          location: "의정부 가능점",
          value: 2,
        },
        {
          location: "남양주 다산점",
          value: 4,
        },
        {
          location: "파주 운정점",
          value: 7,
        },
        {
          location: "양주 옥정점",
          value: 8,
        },
      ],
    },
    {
      compareName: "이용 회원 수",
      locationList: [
        {
          location: "의정부 가능점",
          value: 10,
        },
        {
          location: "남양주 다산점",
          value: 23,
        },
        {
          location: "파주 운정점",
          value: 15,
        },
        {
          location: "양주 옥정점",
          value: 6,
        },
      ],
    },
  ],
};
