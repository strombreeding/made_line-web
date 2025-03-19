import { create } from "zustand";
import { IUserProps } from "../types";
import { type IUserListFilterProps } from "../types/users";

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
  setLoggedUserInfo: (info: Partial<IUserProps>) => void;
  setFilters: (filter: Partial<IUserListFilterProps>) => void;
  setSpecialOredr: (index: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  loggedUserInfo: {
    name: "",
    contact: {
      phone: "",
      email: "",
    },
    birthdate: "",
    gender: "",
    location: "",
    account: {
      id: "",
      role: "",
    },
    membership: {
      type: "",
      level: "",
      registeredAt: "",
      lastReRegisteredAt: "",
      expirationDate: "",
    },
    stats: {
      currentWeight: 0,
      goalWeight: 0,
      height: 0,
      exerciseGoal: "",
      averageExerciseTime: "",
      sleepQuality: "",
      particulars: "",
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
  setLoggedUserInfo: (info) => set((prev) => ({ ...prev, ...info })),
  setFilters: (filter) => set((prev) => ({ ...prev, ...filter })),
  setSpecialOredr: (index) => set({ specialOrder: index }),
}));
