import { create } from "zustand";
import type { IPageInfoProps, IUserProps } from "../types";
import { IResUserProps, type IUserListFilterProps } from "../types/users";

export const specialOrders = [
  "감량율 평균미달",
  "2주 미방문",
  "장기 미방문",
  "회원권 종료 임박",
  "최근 회원권 종료",
  "VIP 회원",
];

interface UserStore {
  loggedUserInfo: IUserProps;
  specialOrder: number;
  filters: IUserListFilterProps;
  findUserList: IResUserProps[];
  pageInfo: IPageInfoProps;
  selectedUserId: number | string;
  setSelectedUserId: (id: number | string) => void;
  setLoggedUserInfo: (info: Partial<IUserProps>) => void;
  setFilters: (filter: Partial<IUserListFilterProps>) => void;
  setSpecialOredr: (index: number) => void;
  setFindUserList: (list: IResUserProps[]) => void;
  setPageInfo: (info: IPageInfoProps) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUserId: "-1",
  setSelectedUserId: (id: number | string) => set({ selectedUserId: id }),
  loggedUserInfo: {
    name: "김메라",
    contact: {
      phone: "010-1234-5678",
      email: "test@test.com",
    },
    birthdate: "1990-01-01",
    gender: "남자",
    location: "서울특별시 강남구",
    account: {
      id: "1",
      role: "최고관리자",
    },
    membership: {
      type: "등록회원",
      level: "신규",
      registeredAt: "2025-01-01",
      lastReRegisteredAt: "2025-01-01",
      expirationDate: "2025-03-19",
    },
    stats: {
      currentWeight: 95,
      goalWeight: 78,
      height: 0,
      exerciseGoal: "",
      averageExerciseTime: "",
      sleepQuality: "",
      particulars: "심장 박동기 착용, OO 자세할 때 주의 요망",
      menstrualCycle: {
        averageCycleWeeks: 0,
        currentFlowStandard: "",
        premenstrualSymptoms: "",
        activityRestrictionDuringPeriod: false,
      },
    },
    job: "",
    attendance: {
      monthlyCount: 0,
      totalCount: 0,
    },
  },
  filters: {
    name: "DESC",
    locations: "DESC",
    expirationDate: "DESC",
    lastReRegisteredAt: "DESC",
    membershipType: ["등록회원", "종료회원", "체험회원"],
    memberships: ["포톤테라피", "바이브핏"],
    membershipLevel: ["신규", "재등록", "VIP"],
  },
  specialOrder: -1,
  findUserList: [],
  pageInfo: {
    totalPage: new Array(10).fill(0).map((_, i) => i + 1), // 나중에 지우자.
    currentPage: 1,
  },
  setLoggedUserInfo: (info) => set((prev) => ({ ...prev, ...info })),
  setFilters: (filter) => set((prev) => ({ ...prev, ...filter })),
  setSpecialOredr: (index) => set({ specialOrder: index }),
  setFindUserList: (list) => set({ findUserList: list }),
  setPageInfo: (info) => set(() => ({ pageInfo: info })),
}));
